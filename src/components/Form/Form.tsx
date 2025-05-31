import { Box, Button, TextField } from '@mui/material'
import React, { useRef } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAPPSelector } from '@/hooks/store.hook';
import axios from 'axios';

export default function Form() {
    const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
    });

const {token} = useAPPSelector((store)=>store.userReducer)

const heading=useRef(null)
const file=useRef(null)



async function createPost(){
    const content = heading.current?.value || "";
    const files = file.current?.files?.[0] 
    const mydata =new FormData()


    mydata.append("body" , content)
    if (files){
        mydata.append("image" , files)
    }
    const options={
        url:`https://linked-posts.routemisr.com/posts`,
        method:"POST",
        headers:{
            token
        },
        data:mydata
    }
    const {data} =await axios.request(options)
    console.log(data);
    
    
}


  return (
    <>
    
    <Box sx={{mx:"auto"}}>

    <TextField fullWidth multiline minRows={7} placeholder='What is on your mind' inputRef={heading}>

    </TextField>
    
    <Box sx={{display:'flex',justifyContent:'space-between' ,mt:2}}>
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        ref={file}
      />
    </Button>

        <Button onClick={createPost} variant="contained" endIcon={<SendIcon />}>Send</Button>
    </Box>

    </Box>
    
    </>
  )
}
