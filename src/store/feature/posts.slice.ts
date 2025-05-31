import { postsState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


import toast from "react-hot-toast";


const initialState:postsState={
    posts:null,
    getPostDetails:null
}


export const getPosts= createAsyncThunk('posts/getPosts' , async (_,{getState})=>{
    const state:any =getState()
    const token =state.userReducer.token

    console.log({token});
    

    const options = {
        url: `https://linked-posts.routemisr.com/posts?limit=50`,
        method:"GET", 
        headers:{
            token
        },
        
    }
    const {data} =await axios.request(options)
    console.log(data);
    return data.posts;
    
})



export const getPostDetails= createAsyncThunk('posts/getPostDetails' , async (id:string ,{getState})=>{
    const state:any =getState()
    const token =state.userReducer.token
    
    console.log({token});
    console.log("Post ID: ", id);

    const options = {
        url: `https://linked-posts.routemisr.com/posts/${id}`,
        method:"GET", 
        headers:{
            token
        },
        
    }
    const {data} =await axios.request(options)
    console.log(data.post);
    return data.post;
    
})





const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{},
        extraReducers : function(builder){
        builder.addCase(getPosts.fulfilled, (state , action)=> {
            state.posts=action.payload
            console.log({state , action});
            
        });
        
        builder.addCase(getPosts.rejected, (state , action)=> {
            toast.error("Incorrect email or password")
            console.log("no posts:", action.error);
            
        });


        builder.addCase(getPostDetails.fulfilled, (state , action)=> {
            state.PostDetails=action.payload
            console.log({state , action});
            
        });
        
        builder.addCase(getPostDetails.rejected, (state , action)=> {
            toast.error("Incorrect email or password")
            console.log("no posts:", action.error);
            
        });

    },
})


export const postsReducer=postSlice.reducer