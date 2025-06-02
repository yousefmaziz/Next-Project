'use client'
import Form from "@/components/Form/Form";
import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import { useAPPDispatch, useAPPSelector } from "@/hooks/store.hook";
import { getPosts  } from "@/store/feature/posts.slice";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkAuth } from '../store/feature/user.slice';
import Hint from "@/components/Hint/Hint";
export default function Home() {

  const {posts} =useAPPSelector((store)=>store.postsReducer)
  const {isUserChecked} = useAPPSelector((store) => store.userReducer);
  const {token} = useAPPSelector((store) => store.userReducer);


  const dispatch= useAPPDispatch()
  const router =useRouter()

useEffect(() => {
  dispatch(checkAuth())
    .unwrap()
    .then(({ token }) => {
      if (token) {
        dispatch(getPosts());
      } else {
        setTimeout(()=>{
                        router.push("/Login")
                    },1000)
      }
    })
    .catch(() => {
      setTimeout(()=>{
                        router.push("/Login")
                    },1000)
    });
}, []);



  if (isUserChecked && !token) {
    return <Hint />;
  }



  
  return (
    <>
    <Box sx={{bgcolor:"white"}}>
  <Grid container spacing={1} sx={{bgcolor:'white'}}>
  <Grid size={{ xs: 12, md: 3 }} sx={{bgcolor:'white'}}></Grid>
  <Grid size={{ xs: 12, md: 6 }} sx={{p:1, bgcolor:'white'}}>

    <Form />
  
    
    {posts ? (
      posts.map((post) => <PostCard key={post._id} postInfo={post} />)
    ) : (
      <Loading/>
    )
    }
  </Grid>
  <Grid size={{ xs: 12, md: 3 }}></Grid>
</Grid>

</Box>
</>
  );
}
