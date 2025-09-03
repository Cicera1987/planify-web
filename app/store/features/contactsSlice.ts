import { Contact } from "@/app/services/contactService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactState {
  currentContact: Contact | null;
  list: Contact[];
}

const initialState: ContactState = {
  currentContact: null,
  list: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setCurrentContact: (state, action: PayloadAction<Contact | null>) => {
      state.currentContact = action.payload;
    },
    setContactList: (state, action: PayloadAction<Contact[]>) => {
      state.list = action.payload;
    },
    clearContacts: (state) => {
      state.currentContact = null;
      state.list = [];
    },
  },
});

export const { setCurrentContact, setContactList, clearContacts } =
  contactsSlice.actions;
export default contactsSlice.reducer;
