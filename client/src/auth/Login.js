import { Box, Button, ButtonGroup, FormControl, FormHelperText, FormLabel, Input, Typography } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .required("Email required")
            .email("Invalid email address")
            .max(100, "Email too long."),
            password: Yup.string()
            .required("Password required")
            .min(6, "Password at least 6 characters")
        }),
        onSubmit: (values, actions) => {
            const vals = {...values}
            // alert(JSON.stringify(values, null, 2))
            actions.resetForm();
            Axios.post('http://localhost:5000/api/v1/admin', {vals})
            .catch(err => {
                return;
            })
            .then( response => {
                if (!response || response.status !== 200) {
                    return;
                }
                console.log(response.data);
            })
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
        <Box sx={{ 
            backgroundColor: "white", 
            borderRadius: "0.5rem", 
            width: "70%", 
            minWidth: "15rem", 
            maxWidth: "30rem",  
            margin: "3rem auto",
            padding: "3rem",
            display: "flex",
            gap: "1.5rem",
            flexDirection: "column",
            alignItems: "center"
            }}>
                
                <Typography variant='h4' fontFamily="Machine regular" color="#16161d" mb="1.5rem">Log In</Typography>
                <FormControl fullWidth>
                    <FormLabel>Email</FormLabel>
                    <Input 
                    name='email' 
                    placeholder='email@example.com' 
                    autoComplete='off' 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.email}
                    />
                    <FormHelperText>{formik.errors.email}</FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel>Password</FormLabel>
                    <Input 
                    name='password' 
                    type='password' 
                    autoComplete='off' 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.password}
                    />
                    <FormHelperText>{formik.errors.password}</FormHelperText>
                </FormControl>
                <ButtonGroup sx={{mt: "3rem", display: "flex", width: "100%"}}>
                    <Button fullWidth variant='contained' type='submit'>Log In</Button>
                    <Button fullWidth variant='text' onClick={() => {navigate("/admin/register")}}>Create Account</Button>
                </ButtonGroup>
                
        </Box>
        </form>
    )
}

export default Login;