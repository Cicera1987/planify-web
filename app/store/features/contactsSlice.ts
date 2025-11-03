import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "@/app/services/contactService";

interface ContactState {
  currentContact: Contact | null;
  isLoading: boolean;
  search: string;
  openPopupId?: number | null;
}

const initialState: ContactState = {
  currentContact: null,
  isLoading: false,
  search: "",
  openPopupId: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setCurrentContact: (state, action: PayloadAction<Contact | null>) => {
      state.currentContact = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOpenPopupId: (state, action: PayloadAction<number | null>) => {
      state.openPopupId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentContact, setSearch, setOpenPopupId, setLoading } =
  contactsSlice.actions;

export default contactsSlice.reducer;
