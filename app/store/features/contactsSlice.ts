import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as contactApi from "@/app/services/contactService";
import { Contact } from "@/app/services/contactService";
interface ContactState {
  currentContact: Contact | null;
  list: Contact[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  totalElements: number;
  search: string;
  openPopupId?: number | null;
}

const initialState: ContactState = {
  currentContact: null,
  list: [],
  isLoading: false,
  hasMore: true,
  page: 0,
  totalElements: 0,
  search: "",
  openPopupId: null,
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async ({ page, search }: { page: number; search?: string }) => {
    if (search && search.trim()) {
      return await contactApi.searchContacts(search, page, 30);
    }
    return await contactApi.getContacts(page, 30);
  },
);

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
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setOpenPopupId: (state, action: PayloadAction<number | null>) => {
      state.openPopupId = action.payload;
    },
    clearContacts: (state) => {
      state.currentContact = null;
      state.list = [];
      state.page = 0;
      state.hasMore = true;
      state.totalElements = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        const { content, pageNumber, totalPages, totalElements } =
          action.payload;

        const existingIds = new Set(state.list.map((contact) => contact.id));
        const filteredContent = content.filter((c) => !existingIds.has(c.id));

        if (state.page === 0) {
          state.list = filteredContent;
        } else {
          state.list = [...state.list, ...filteredContent];
        }

        state.totalElements = totalElements;
        state.hasMore = pageNumber < totalPages - 1;
        state.page = pageNumber;
        state.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCurrentContact, setContactList, setSearch, clearContacts } =
  contactsSlice.actions;
export default contactsSlice.reducer;
