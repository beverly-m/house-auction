import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import CustomToolbar from '../../components/CustomToolbar';

const Houses = () => {

    const [data, setData] = useState();
    const PORT = process.env.REACT_APP_PORT || 'localhost:'+5000;

    const getData = useCallback(() => {
        Axios.get(`https://${PORT}/api/v1/admin/houses`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
        .then(response => {
            if (response.status !== 200) return;
            setData(response.data);
        })
        ;
    }, []);

    const cols = [
        {
            field: "house_no",
            headerName: "House Stand No",
            flex: 0.75,
        },
        {
            field: "alias_no",
            headerName: "Alias No",
            flex: 0.6,
        },
        {
            field: "company_no",
            headerName: "Employee Company No",
            flex: 0.75,
        },
        {
            field: "first_name",
            headerName: "First Name",
            flex: 0.6,
        },
        {
            field: "surname",
            headerName: "Surname",
            flex: 0.6,
        }
    ]

    useEffect(() => {
        getData();
    }, [getData])

    return (
        <Box m='1.5rem 2.5rem'>
            <Header title="HOUSES" subtitle="List of all houses and the employees that selected them"></Header>
            <Box
                mt="32px"
                height="100vh"
                width="95%"
                sx={{
                    '& .css-t89xny-MuiDataGrid-columnHeaderTitle': {
                        fontWeight: '600'
                    },
                }}
            >
                <DataGrid
                slots={{toolbar: CustomToolbar}}
                loading={!data}
                getRowId={(row) => row.house_no}
                rows={data || []}
                columns={cols}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 25,
                    },
                },
                }}
                />
            </Box>
        </Box>
    )
}

export default Houses;