import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "@/enums/User";
import { retrieveUserFromLocalStorage } from "@/lib/auth/utils";

let user: User | null = retrieveUserFromLocalStorage();

export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
};

interface initialStateProps {
  user: User | null;
}

const initialState: initialStateProps = {
  user: user,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      console.log(state.user);
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
