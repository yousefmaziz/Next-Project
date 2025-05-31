import {configureStore} from "@reduxjs/toolkit"; 
import { userReducer } from "./feature/user.slice";
import { postsReducer } from "./feature/posts.slice";
import { commentReducer } from "./feature/comment.slice";



export const store = configureStore({
    reducer:{
        userReducer,
        postsReducer,
        commentReducer
    }
})


type appStore = typeof store

export type RootType =ReturnType<appStore["getState"]>

export type appDispatch = appStore["dispatch"]
