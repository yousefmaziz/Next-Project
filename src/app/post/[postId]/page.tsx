'use client'

import Loading from '@/components/Loading/Loading'
import PostCard from '@/components/PostCard/PostCard'
import { useAPPDispatch, useAPPSelector } from '@/hooks/store.hook'
import { getPostDetails } from '@/store/feature/posts.slice'
import { Box } from '@mui/material'
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
    <Box sx={{width:"60%" , mx:"auto"}}>
      {PostDetails ? <PostCard postInfo={PostDetails} showComment={true}/> : <Loading/>}
    </Box>
    
    
    </>
  )
}
