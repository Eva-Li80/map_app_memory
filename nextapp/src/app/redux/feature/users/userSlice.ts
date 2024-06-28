
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
    } ,
    removeUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  }
});

export const { setUser, selectUser, clearSelectedUser, removeUser, addUser, updateUser} = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
