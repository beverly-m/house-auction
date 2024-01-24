import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Typography } from '@mui/material';
import Axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from '../../components/CustomToolbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AccountContext } from '../../accountContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Admin = () => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const {user} = useContext(AccountContext);
    const navigate = useNavigate();
    const PORT = process.env.REACT_APP_PORT || 'localhost:'+5000;

    const getData = useCallback(() => {
        Axios.get(`https://${PORT}/api/v1/admin/management`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }).then(response => {
            if (response.status !== 200) return;
            setData(response.data.users);
        });
    }, []);

    const cols = [
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "user_role",
            headerName: "Role",
            flex: 0.75,
        },
    ]

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
            actions.resetForm();

            try {
                Axios
                .post(`https://${PORT}/api/v1/admin/management/add`, {vals}, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }) 
                .then(response => {
                    if (!response || response.status !== 200) {
                        setError("An error occurred. Try again.")
                        return;
                    } else if (response.data.status) {
                        setError(response.data.status);
                        return;
                    }
                    else {
                        navigate("/admin/dashboard");
                    }
                    
                }).catch((error) => {
                    if (error.response.data) {
                        setError(error.response.data.status)
                    } else {
                        setError("An error occurred. Try again.")
                    }
                }) 
            } catch (error) {
                setError("An error occurred. Try again.")
            }
            
        }
    });

    useEffect(() => {
        getData();
    }, [getData])

    return user.role === "admin" ? (
        <Box m='1.5rem 2.5rem'>
            <Header title="MANAGEMENT" subtitle="Manage all users with access to the dashboard. Users added here will only have viewer access."></Header>
            <Box
                mt="32px"
                width="95%"
                sx={{
                    '& .css-t89xny-MuiDataGrid-columnHeaderTitle': {
                        fontWeight: '600'
                    },
                }}
            >
                
                <form onSubmit={formik.handleSubmit}>
                <Box sx={{ 
                    width: "100%", 
                    minWidth: "15rem",   
                    margin: "0 auto",
                    padding: "0 0 3rem 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3rem",
                    
                    }}>
                        <Typography variant='h6' fontFamily="Machine regular" color="#16161d">Add new user</Typography>
                        { error ? 
                        <Typography variant='body1' color="red">{error}</Typography> : 
                        <></>}
                        <Box sx={{
                            display: "flex",
                            gap: "1.5rem",
                            alignItems: "center",
                            width: "100%"
                        }}>
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
                        </Box>
                        <Button sx={{width: "50%"}} variant='contained' type='submit'>Add User</Button>
                        
                </Box>
                </form>
                <DataGrid
                slots={{toolbar: CustomToolbar}}
                loading={!data}
                getRowId={(row) => row.email}
                autoHeight
                rows={data || []}
                columns={cols}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
                }}
                pageSizeOptions={[5]}
                />
            </Box>
        </Box>
    )
    :
    (
        <Navigate to="/admin/dashboard"/>
    )
}

export default Admin;