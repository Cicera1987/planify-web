import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../components/assets/icons";
import * as contactApi from "../services/contactService";
import { AlertRef } from "../components/modals/alert";

import { AppDispatch, RootState } from "../store/store";

import { useInfiniteScroll } from "./useInfiniteScroll";

export function useContact(contactId?: number) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const alertRef = useRef<AlertRef>(null);
  const isEditMode = Boolean(contactId);

  const { openPopupId, imageState } = useSelector(
    (state: RootState) => state.scheduling,
  );

  const [isLoadingContactId, setIsLoadingContactId] = useState(false);
  const [contactDataId, setContactDataId] = useState<contactApi.Contact | null>(
    null,
  );
  const { search } = useSelector((state: RootState) => state.contacts);
  const [localFile, setLocalFile] = useState < File | null > (null);

  const {
    data: contacts,
    isFetching,
    hasMore,
    observerTarget,
    reset
  } = useInfiniteScroll <contactApi.Contact>({
    fetchFn: useCallback(
      async (page: number) => {
        if (search.trim()) {
          const response = await contactApi.searchContacts(search, page);
          return response.content;
        }
        const response = await contactApi.getContacts(page);
        return response.content;
      },
      [search]
    ),
    });
  
  useEffect(() => {
    reset()
  }, [search, reset])
  
  useEffect(() => {
    if (!isEditMode) {
      dispatch({
        type: "scheduling/setImageState",
        payload: {
          image: "",
          file: null,
          provider: "CLOUDINARY",
          providerUserId: "",
        },
      })
      setLocalFile(null)
      setContactDataId(null)
    }
  }, [isEditMode, dispatch])

  useEffect(() => {
    if (isEditMode && contactId) {
      setIsLoadingContactId(true);
      contactApi
        .getContactById(contactId)
        .then((contact) => {
          setContactDataId(contact);
          dispatch({
            type: "scheduling/setImageState",
            payload: {
              image: contact.imageUrl || "",
              file: null,
              provider: "CLOUDINARY",
              providerUserId: "",
            },
          });
        })
        .finally(() => setIsLoadingContactId(false));
    }
  }, [isEditMode, contactId, dispatch]);


  const handleSelect = useCallback(
    (action: string, contact: contactApi.Contact) => {
      if (action === "edit") router.push(`/contact/${contact.id}/edit`);
      else if (action === "schedule")
        router.push(`/contact/${contact.id}/schedule`);
      else if (action === "delete") handleDelete(contact.id);
    },[router],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!alertRef.current)
        return toast.error("Erro ao abrir modal de confirmação");

      alertRef.current.open({
        title: "Tem certeza que deseja inativar este contato?",
        icon: <Icon.AlertCircle />,
        confirmText: "Inativar",
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await contactApi.deleteContact(id);
            toast.success("Contato inativado com sucesso");
            reset()
          } catch {
            toast.error("Erro ao inativar contato");
          }
        },
      });
    },
    [dispatch]
  );


  const handleSave = useCallback(
    async (data: contactApi.ContactFormInputs) => {
      try {
        const formData = new FormData();
        const name = data.name.slice(0, 255);
        const email = data.email?.slice(0, 255);
        const observation = data.observation?.slice(0, 255);
        const gender = data.gender?.toUpperCase().slice(0, 10);

        formData.append("name", name);
        formData.append("phone", data.phone.replace(/\D/g, ""));
        if (email) formData.append("email", email);
        if (observation) formData.append("observation", observation);
        if (gender) formData.append("gender", gender);

        if (localFile) {
          formData.append("file", localFile);
        } else if (imageState.image) {
          formData.append("imageUrl", imageState.image);
        } else {
          formData.append("imageUrl", "");
        }

        const packageIds = data.packageIds || [];
        packageIds.forEach((id) => formData.append("packageIds", String(id)));

        if (isEditMode && contactId) {
          await contactApi.updateContact(contactId, formData);
          toast.success("Contato atualizado com sucesso");
        } else {
          await contactApi.createContact(formData);
          toast.success("Contato criado com sucesso");
        }

        router.push("/clients");
        
      } catch {
        toast.error(
          isEditMode ? "Erro ao atualizar contato" : "Erro ao criar contato"
        );
      }
    },
    [isEditMode, contactId, router, imageState, dispatch, localFile]
  );


  const handleLocalImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch({
        type: "scheduling/setImageState",
        payload: {
          image: reader.result as string,
          provider: "CLOUDINARY",
          providerUserId: "",
        },
      });
    };
    setLocalFile(file);
    reader.readAsDataURL(file);
  };


  const defaultValues = useMemo(() => {
    if (isEditMode && contactDataId) {
      return {
        name: contactDataId.name || "",
        phone: contactDataId.phone || "",
        email: contactDataId.email || "",
        observation: contactDataId.observation || "",
        gender: contactDataId.gender || "",
        imageUrl: contactDataId.imageUrl || "",
        packageIds: contactDataId.packageIds || [],
      };
    }
    return {};
  }, [isEditMode, contactDataId]);

  const handleTogglePopup = (id: number) => {
    dispatch({
      type: "scheduling/setOpenPopupId",
      payload: openPopupId === id ? null : id,
    });
  };

  const itemsContacts = [
    { value: "edit", label: "Editar contato", icon: <Icon.EditUser /> },
    {
      value: "schedule",
      label: "Agendar atendimento",
      icon: <Icon.Calendar />,
    },
    {
      value: "delete",
      label: "Inativar Contato",
      icon: <Icon.InactivateUser />,
    },
  ];
  
  return {
    handleSave,
    handleLocalImageChange,
    isLoading: isFetching || isLoadingContactId,
    isEditMode,
    defaultValues,
    contacts,
    handleTogglePopup,
    handleSelect,
    items: itemsContacts,
    handleDelete,
    alertRef,
    contactDataId,
    observerTarget,
    hasMore,
  };
}
