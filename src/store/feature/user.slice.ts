import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import toast from "react-hot-toast";
const initialState: userState = {
  token: null,
  user: null,
  isUserChecked: false,
};

export const signup= createAsyncThunk('user/Signup' , async (values:{name:string, email:string , password:string, rePassword:string,dateOfBirth:Date,gender:string})=>{
    const options = {
        url: `https://linked-posts.routemisr.com/users/signup`,
        method:"post", 
        data:values,
    }
    const {data} =await axios.request(options)
    console.log(data);
    return data;
    
})
export const login= createAsyncThunk('user/Login' , async (values:{email:string , password:string})=>{
    const options = {
        url: `https://linked-posts.routemisr.com/users/signin`,
        method:"post", 
        data:values,
    }
    const {data} =await axios.request(options)
    console.log(data);
    return data;
    
})

export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (token && user) {
    return { token, user: JSON.parse(user) };
  }
  return { token: null, user: null };
});


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: function (builder) {
      builder.addCase(login.fulfilled, (state, action) => {
      toast.success('Welcome back');
      state.token = action.payload.token;
      const { email, password } = action.meta.arg;
      localStorage.setItem("email", email);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("password", password); 
      state.user = null;
      localStorage.setItem("user", JSON.stringify(null));
      state.isUserChecked = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      toast.error('Incorrect email or password');
      console.log('Login error:', action.error);
      state.isUserChecked = true;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isUserChecked = true;
    });
  },
});


export const userReducer= userSlice.reducer