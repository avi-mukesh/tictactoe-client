// blog.logrocket.com/handling-user-authentication-redux-toolkit/
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:3001";

// 2 arguments: string action type and callback function
export const registerUser = createAsyncThunk(
  "auth/register",

  // first argument - arg - is the single value passed into the dispatch method when teh action is called
  // second argument - thunkAPI - is an objecting containing parameters usually passed to a Redux thunk function
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${backendURL}/auth/register`,
        { username, email, password },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log(
        `trying to log in with username: ${username}, password: ${password}`
      );

      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        { username, password },
        config
      );
      console.log("data returned from logging in", data);

      const userInfo = {
        ...jwtDecode(data.accessToken),
        accessToken: data.accessToken,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      return userInfo;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
