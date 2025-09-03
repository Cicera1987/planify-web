import { Package } from "@/app/services/packagesService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PackageState {
  currentPackage: Package | null;
  list: Package[];
}

const initialState: PackageState = {
  currentPackage: null,
  list: [],
};

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setCurrentPackage: (state, action: PayloadAction<Package | null>) => {
      state.currentPackage = action.payload;
    },
    setPackageList: (state, action: PayloadAction<Package[]>) => {
      state.list = action.payload;
    },
    clearPackages: (state) => {
      state.currentPackage = null;
      state.list = [];
    },
  },
});

export const { setCurrentPackage, setPackageList, clearPackages } =
  packagesSlice.actions;
export default packagesSlice.reducer;
