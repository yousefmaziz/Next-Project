'use client'
import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import {useFormik} from "formik"
import { login } from '@/store/feature/user.slice'
import { useAPPDispatch } from '@/hooks/store.hook'
import { useRouter } from 'next/navigation'


export default function Page() {
    const dispatch = useAPPDispatch()
    const router =useRouter()

    const formik= useFormik ({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit: (values, { resetForm })=>{
            dispatch(login(values)).then((response)=>{
                console.log({response});
                if(response.payload.message == "success"){
                    resetForm()
                    setTimeout(()=>{
                        router.push("/")
                    },1000)

                }
            })
        }
    })


return ( 
    <>
    <Box sx={{width:"100%" ,mx:"auto",p:2 ,bgcolor:"white"}}>
            <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}></Grid>
            <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{p:5 , my:5}}>
    <form 
    onSubmit={formik.handleSubmit}
        style={{display:"flex", flexDirection:"column", gap:"15px"}} >
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
        <Button type='submit' variant="contained">login</Button>
    </form>
        </Paper>
</Grid>
        </Grid>
    </Box>
    </>
  )
}
