import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { log } from "node:console";
import toast from "react-hot-toast";
const initialState:userState={
    token:localStorage.getItem("token")
}
export const login= createAsyncThunk('user/Login' , async (values:{email:string , password:string})=>{
    const options = {
        url: `https://linked-posts.routemisr.com/users/signin`,
        method:"post", 
        data:values,
    }
    let {data} =await axios.request(options)
    console.log(data);
    return data;
    
})

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers : function(builder){
        builder.addCase(login.fulfilled, (state , action)=> {
            toast.success("welcom back")
            state.token=action.payload.token
            localStorage.setItem("token",action.payload.token)
            console.log("hhhh");
            
        });
        
        builder.addCase(login.rejected, (state , action)=> {
            toast.error("Incorrect email or password")
             console.log("Login error:", action.error);
            
        });
    },
})


export const userReducer= userSlice.reducer