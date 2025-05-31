'use client'
import { Box, Button, Paper, TextField } from '@mui/material'
import { lime } from '@mui/material/colors'
import React from 'react'
import {useFormik} from "formik"
import { login } from '@/store/feature/user.slice'

import { RootType } from '@/store/store'
import { useAPPDispatch, useAPPSelector } from '@/hooks/store.hook'
import { log } from 'node:console'
import { useRouter } from 'next/navigation'


export default function page() {
    const dispatch = useAPPDispatch()
    const router =useRouter()

    // useAPPSelector((store)=>store.userReducer)

    const formik= useFormik ({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit: (values)=>{
            dispatch(login(values)).then((response)=>{
                console.log({response});
                if(response.payload.message == "success"){
                    setTimeout(()=>{
                        router.push("/")
                    },1000)

                }
            })
        }
    })


  return ( 
    <>
    <Box sx={{width:"600px" ,mx:"auto",p:2}}>
        <Paper elevation={3} sx={{p:5 , mt:5}}>
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
    </Box>
    </>
  )
}
