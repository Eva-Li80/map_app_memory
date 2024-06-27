
"use client";


import { User } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  selectedUser: User | null
  users: User[]
};

const initialState: UserState = {
  selectedUser: null,
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    selectUser(state, action: PayloadAction<User | null>){
      state.selectedUser = action.payload
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    } 
    
  },
});

export const { setUser, selectUser, clearSelectedUser} = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
