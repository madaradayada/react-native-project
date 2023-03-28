import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      let user = await auth.currentUser;

      await user.updateProfile({ displayName: name });
      user = await auth.currentUser;
      const payload = {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
      };
      return payload;
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);

      const payload = {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
      };
      return payload;
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async () => {
  try {
    await auth.signOut();
  } catch (e) {
    console.log(e.message);
  }
});

export const refreshUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      const payload = {
        user: { name: user.displayName, email: user.email, userId: user.uid },
        isLoggedIn: true,
      };

      dispatch(authSlice.actions.refreshUser(payload));
    }
  });
};