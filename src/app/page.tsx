'use client'
import Form from "@/components/Form/Form";
import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import { useAPPDispatch, useAPPSelector } from "@/hooks/store.hook";
import { getPosts, posts } from "@/store/feature/posts.slice";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect } from "react";
export default function Home() {

  let {posts} =useAPPSelector((store)=>store.postsReducer)

  const dispatch= useAPPDispatch()


  useEffect(()=>{
    dispatch(getPosts())
  },[])
  
  return (
<>
    <Box>
      <Grid container>
    <Grid size={3}></Grid>
    <Grid size={6} sx={{p:2}}>
      <Form></Form>
      {posts ? 
      posts.map((post)=> <PostCard key={post._id} postInfo={post}/>)
    : <Loading/>}
          
    </Grid>
    <Grid size={3}></Grid>
  
</Grid>
    </Box>
</>
  );
}
