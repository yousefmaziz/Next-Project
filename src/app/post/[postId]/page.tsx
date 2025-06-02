'use client'

import Loading from '@/components/Loading/Loading'
import PostCard from '@/components/PostCard/PostCard'
import { useAPPDispatch, useAPPSelector } from '@/hooks/store.hook'
import { getPostDetails } from '@/store/feature/posts.slice'
import { Box, Grid } from '@mui/material'
import React, { use, useEffect } from 'react'


export default function Page({params}:{params: Promise<{postId: string}>}) {

    const {postId} = use(params)
    const dispatch = useAPPDispatch()

    useEffect(()=>{
       dispatch(getPostDetails(postId))
    },[])
    
const   {PostDetails}  = useAPPSelector((store)=>store.postsReducer)
  return (
    <>
    <Box sx={{bgcolor:"white"}}>
      <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }} sx={{width:"100%" , mx:"auto" ,p:1}}>
      {PostDetails ? <PostCard postInfo={PostDetails} showComment={true}/> : <Loading/>}
      </Grid>
      </Grid>
    </Box>
    
    
    </>
  )
}
