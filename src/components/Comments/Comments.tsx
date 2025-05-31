import { Box, CardHeader, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useRef } from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Comment } from '@/types/posts.types'
import pic from "../../../public/user.png"
import { log } from 'console'
import { useAPPSelector } from '@/hooks/store.hook'
import axios from 'axios'


export default function Comments({commentInfo}:{commentInfo:Comment}) {


let {token} = useAPPSelector((store)=>store.userReducer)

let {postId} = useAPPSelector((store)=>store.postsReducer)


// async function createComment(){

    



//     const options={
//         url:`https://linked-posts.routemisr.com/comments`,
//         method:"POST",
//         headers:{
//             token
//         },
//           data: {
//     postId: postId,
//     content: content
//   }
//     }

//     const {data} =await axios.request(options)
//     console.log(data);
    
    
// }



function handelImage(path:string){
    if(path.includes("undefined")) return pic

    else return path
}


  return (
    <>


        <Box sx={{bgcolor:"#f1f1f1f1" , px:3 , py:2 , borderRadius:"8px" ,my:2 }}>
          <CardHeader
        avatar={
          <Image src={handelImage(commentInfo.commentCreator.photo)}
             width={30} height={30}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon/>
          </IconButton>
        }
        title={commentInfo.commentCreator.name}
        subheader={commentInfo.createdAt}
      />
            <Typography component={"p"}>
                {commentInfo.content}
            </Typography>
        </Box>

    
    </>
  )
}
