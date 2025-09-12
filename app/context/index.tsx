"use client";

import {
  createContext,
  useContext,
  useReducer,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

type ImageState = {
  image: string | null;
  file: File | null;
  provider: "CLOUDINARY" | "GOOGLE" | "WHATSAPP" | null;
  providerUserId: string | null;
};

type ImageAction =
  | { type: "SET_IMAGE"; payload: string | null }
  | { type: "SET_FILE"; payload: File | null }
  | { type: "SET_PROVIDER"; payload: ImageState["provider"] }
  | { type: "SET_PROVIDER_USER_ID"; payload: string | null }
  | { type: "SET_ALL"; payload: Partial<ImageState> };

function imageReducer(state: ImageState, action: ImageAction): ImageState {
  switch (action.type) {
    case "SET_IMAGE":
      return { ...state, image: action.payload };
    case "SET_FILE":
      return { ...state, file: action.payload };
    case "SET_PROVIDER":
      return { ...state, provider: action.payload };
    case "SET_PROVIDER_USER_ID":
      return { ...state, providerUserId: action.payload };
    case "SET_ALL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

type SchedulingContextType = {
  search: string;
  setSearch: (value: string) => void;
  openPopupId: number | null;
  setOpenPopupId: Dispatch<SetStateAction<number | null>>;
  mounted: boolean;
  setMounted: (value: boolean) => void;
  token: string | null;
  setToken: (value: string | null) => void;
  imageState: ImageState;
  setImageData: (data: Partial<ImageState>) => void;
};

const SchedulingContext = createContext<SchedulingContextType | undefined>(
  undefined,
);

export function SchedulingProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [openPopupId, setOpenPopupId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [imageState, dispatch] = useReducer(imageReducer, {
    image: null,
    file: null,
    provider: null,
    providerUserId: null,
  });

  const setImageData = (data: Partial<ImageState>) => {
    dispatch({ type: "SET_ALL", payload: data });
  };

  return (
    <SchedulingContext.Provider
      value={{
        search,
        setSearch,
        openPopupId,
        setOpenPopupId,
        mounted,
        setMounted,
        token,
        setToken,
        imageState,
        setImageData,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  );
}

export function useSchedulingContext() {
  const context = useContext(SchedulingContext);
  return (
    context ?? {
      search: "",
      setSearch: () => {},
      openPopupId: null,
      setOpenPopupId: () => {},
      mounted: false,
      setMounted: () => {},
      token: null,
      setToken: () => {},
      imageState: {
        image: null,
        file: null,
        provider: null,
        providerUserId: null,
      },
      setImageData: () => {},
    }
  );
}
