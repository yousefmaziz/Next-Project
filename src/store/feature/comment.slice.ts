// commentSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { commentState } from "@/types/comment.type";

const initialState: commentState = {
  addcomment: null,
  commentContent: "", // 🆕 نحتفظ بمحتوى التعليق هنا
};
export const addComments = createAsyncThunk(
  "comment/addComments",
  async (commentData: { postId: string; content: string }, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.userReducer.token;

      const options = {
        url: `https://linked-posts.routemisr.com/comments`,
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        data: {
          post: commentData.postId,      // ✅ الحقل المطلوب من API
          content: commentData.content,
        },
      };

      const { data } = await axios.request(options);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);


const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentContent: (state, action: PayloadAction<string>) => {
      state.commentContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addComments.fulfilled, (state, action) => {
      state.addcomment = action.payload;
      toast.success("Comment added successfully ✅");
    });

    builder.addCase(addComments.rejected, (state, action) => {
      toast.error("Failed to add comment ❌");
      console.error("Error adding comment:", action.payload);
    });
  },
});

export const { setCommentContent } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
