import { Box, CardHeader, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Comment } from '@/types/posts.types'
import pic from "../../../public/user.png"
import { useAPPSelector } from '@/hooks/store.hook'



export default function Comments({commentInfo}:{commentInfo:Comment}) {


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
             width={30} height={30} alt="User profile"/>
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
