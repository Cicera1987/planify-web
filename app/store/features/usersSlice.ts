import { User } from "@/app/services/usersService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: User | null;
  list: User[];
}

const initialState: UserState = {
  currentUser: null,
  list: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setUserList: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
    clearUsers: (state) => {
      state.currentUser = null;
      state.list = [];
    },
  },
});

export const { setCurrentUser, setUserList, clearUsers } = userSlice.actions;
export default userSlice.reducer;
