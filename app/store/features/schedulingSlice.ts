import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/app/services/api";
import { Scheduling, SchedulingStatus } from "@/app/services/schedulingService";

interface SchedulingState {
  search: string;
  openPopupId: number | null;
  token: string | null;
  imageState: {
    image: string | null;
    file: File | null;
    provider: "CLOUDINARY" | "GOOGLE" | "WHATSAPP" | null;
    providerUserId: string | null;
  };
  userId: number | null;
  mounted: boolean;
  schedulings: Scheduling[];
  isLoading: boolean;
}

const initialState: SchedulingState = {
  search: "",
  openPopupId: null,
  token: null,
  imageState: { image: null, file: null, provider: null, providerUserId: null },
  userId: null,
  mounted: false,
  schedulings: [],
  isLoading: false,
};

export const fetchSchedulings = createAsyncThunk(
  "scheduling/fetchSchedulings",
  async (search: string) => {
    const res = await api.get<Scheduling[]>(
      `/scheduling/search?name=${encodeURIComponent(search)}`,
    );
    return res.data;
  },
);

export const updateSchedulingStatus = createAsyncThunk(
  "scheduling/updateStatus",
  async ({ id, newStatus }: { id: number; newStatus: SchedulingStatus }) => {
    const params = new URLSearchParams({ newStatus });
    const res = await api.put<Scheduling>(
      `/scheduling/${id}/status`,
      params.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    return res.data;
  },
);

const schedulingSlice = createSlice({
  name: "scheduling",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOpenPopupId: (state, action: PayloadAction<number | null>) => {
      state.openPopupId = action.payload;
    },
    setImageState: (
      state,
      action: PayloadAction<Partial<SchedulingState["imageState"]>>,
    ) => {
      state.imageState = { ...state.imageState, ...action.payload };
    },
    setUserId: (state, action: PayloadAction<number | null>) => {
      state.userId = action.payload;
    },
    setMounted: (state, action: PayloadAction<boolean>) => {
      state.mounted = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearScheduling: (state) => {
      state.schedulings = [];
      state.openPopupId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedulings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSchedulings.fulfilled, (state, action) => {
        state.schedulings = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSchedulings.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSchedulingStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.schedulings = state.schedulings.map((scheduling) =>
          scheduling.id === updated.id ? updated : scheduling,
        );
      });
  },
});

export const {
  setSearch,
  setOpenPopupId,
  setImageState,
  setUserId,
  setMounted,
  setToken,
  setIsLoading,
  clearScheduling,
} = schedulingSlice.actions;

export default schedulingSlice.reducer;
