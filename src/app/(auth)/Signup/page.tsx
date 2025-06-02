'use client'
import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import {useFormik} from "formik"
import { signup } from '@/store/feature/user.slice'
import { useAPPDispatch } from '@/hooks/store.hook'
import { useRouter } from 'next/navigation'


export default function Page() {
      const dispatch = useAPPDispatch()
        const router =useRouter()


const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth:new Date (""),
    gender: ""
  },
  onSubmit: (values, { resetForm }) => {
    dispatch(signup(values)).then((response) => {
      console.log({ response });

      if (response.payload.message === "success") {
        resetForm();

        setTimeout(() => {
          router.push("/Login");
        }, 1000);
      }
    });
  }
});


  return (
  <>
    <Box sx={{width:"100%" ,mx:"auto",p:2 ,bgcolor:"white"}}>
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}></Grid>
      <Grid size={{ xs: 12, md: 6 }}>
                <Paper elevation={3} sx={{p:5 , mt:5}}>
    <form 
    onSubmit={formik.handleSubmit}
        style={{display:"flex", flexDirection:"column", gap:"15px"}} >
        <TextField variant='standard' label="name" type='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        name='name'
        /> 
        <TextField variant='standard' label="email" type='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        name='email'
        > 
        </TextField>
        <TextField variant='standard' label="password" type='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        name='password'
        > 
        </TextField>
        <TextField variant='standard' label="rePassword" type='password'
        value={formik.values.rePassword}
        onChange={formik.handleChange}
        name='rePassword'
        > 
        </TextField>
        <TextField variant='standard' label="" type='date'
        value={formik.values.dateOfBirth}
        onChange={formik.handleChange}
        name='dateOfBirth'
        > 
        </TextField>
        <TextField variant='standard' label="gender" type='gender'
        value={formik.values.gender}
        onChange={formik.handleChange}
        name='gender'
        > 
        </TextField>
        <Button type='submit' variant="contained">sign up</Button>
    </form>
        </Paper>
      </Grid>
    </Grid>
    </Box>
    </>
  )
}
