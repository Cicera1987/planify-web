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

import {
  fetchContacts,
  clearContacts,
} from "@/app/store/features/contactsSlice";
import { AppDispatch, RootState } from "../store/store";
import { usePagination } from "./usePagination";


export function useContact(contactId?: number) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const alertRef = useRef<AlertRef>(null);
  const isEditMode = Boolean(contactId);

  const { search, openPopupId, imageState } = useSelector(
    (state: RootState) => state.scheduling,
  );
  const { list: contacts, isLoading: isLoadingRedux } = useSelector(
    (state: RootState) => state.contacts,
  );

  const [isLoadingContactId, setIsLoadingContactId] = useState(false);
  const [contactDataId, setContactDataId] = useState<contactApi.Contact | null>(
    null,
  );

  const [localFile, setLocalFile] = useState < File | null > (null);

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

  const { observerTarget, currentPage, loadMore, hasMore, reset, setHasMore } =
    usePagination();

  const fetchAndSetHasMore = useCallback(
    async (page: number) => {
      const action = await dispatch(fetchContacts({ page, search }));
      if (fetchContacts.fulfilled.match(action)) {
        setHasMore(action.payload.content.length > 0);
      }
    },
    [dispatch, search, setHasMore],
  );

  useEffect(() => {
    fetchAndSetHasMore(currentPage);
  }, [currentPage, fetchAndSetHasMore]);

  useEffect(() => {
    dispatch(clearContacts());
    reset();
    fetchAndSetHasMore(0);
  }, [search, dispatch, reset, fetchAndSetHasMore]);

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
            dispatch(clearContacts());
            reset();
            fetchAndSetHasMore(0);
            toast.success("Contato inativado com sucesso");
          } catch {
            toast.error("Erro ao inativar contato");
          }
        },
      });
    },
    [dispatch, reset, fetchAndSetHasMore],
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

        dispatch({
          type: "scheduling/setImageState",
          payload: {
            image: "",
            provider: "CLOUDINARY",
            providerUserId: "",
          },
        });

        dispatch(clearContacts());
        reset();
        fetchAndSetHasMore(0);
        setLocalFile(null);
      } catch {
        toast.error(
          isEditMode ? "Erro ao atualizar contato" : "Erro ao criar contato"
        );
      }
    },
    [
      isEditMode,
      contactId,
      router,
      imageState,
      dispatch,
      reset,
      fetchAndSetHasMore,
      localFile,
    ]
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
    isLoading: isLoadingRedux || isLoadingContactId,
    isEditMode,
    defaultValues,
    contacts,
    handleTogglePopup,
    handleSelect,
    items: itemsContacts,
    observerTarget,
    handleDelete,
    alertRef,
    contactDataId,
    loadMore,
    hasMore,
  };
}
