'use client'

import Loading from '@/components/Loading/Loading'
import PostCard from '@/components/PostCard/PostCard'
import { useAPPDispatch, useAPPSelector } from '@/hooks/store.hook'
import { getPostDetails } from '@/store/feature/posts.slice'
import { checkAuth } from '@/store/feature/user.slice'
import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { use, useEffect } from 'react'


export default function Page({params}:{params: Promise<{postId: string}>}) {
    const {postId} = use(params)
  const dispatch = useAPPDispatch();
  const router = useRouter();

  const { isUserChecked, token } = useAPPSelector((store) => store.userReducer);
  const { PostDetails } = useAPPSelector((store) => store.postsReducer);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);


  useEffect(() => {
    if (isUserChecked && token) {
      dispatch(getPostDetails(postId));
    } else if (isUserChecked && !token) {
      router.push("/Login");
    }
  }, [isUserChecked, token]);

  if (!isUserChecked) return <Loading />;

  return (
    <Box sx={{ bgcolor: "white" }}>
      <Grid container spacing={2} sx={{ bgcolor: "white" }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%", mx: "auto", p: 1, bgcolor: "white" }}>
          {PostDetails ? <PostCard postInfo={PostDetails} showComment={true} /> : <Loading />}
        </Grid>
      </Grid>
    </Box>
  );
}