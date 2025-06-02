import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", 
          alignItems: "center",    
          textAlign: "center",
          justifyContent: "center", 
          height: "50vh",        
          gap: 2,                  
        }}
      >

          <CircularProgress size={100} color="warning" />
      </Box>




    </>
  )
}
