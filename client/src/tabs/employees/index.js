import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import CustomToolbar from '../../components/CustomToolbar';

const Employees = () => {

    const [data, setData] = useState();
    const PORT = process.env.REACT_APP_PORT || 'localhost:'+5000;

    const getData = useCallback(() => {
        Axios.get(`http://${PORT}/api/v1/admin/employees`).then(response => {
            if (response.status !== 200) return;
            setData(response.data);
        })
        ;
    }, []);

    const cols = [
        {
            field: "company_no",
            headerName: "Company No",
            flex: 0.75,
        },
        {
            field: "first_name",
            headerName: "First Name",
            flex: 0.75,
        },
        {
            field: "surname",
            headerName: "Surname",
            flex: 0.75,
        },
        {
            field: "house_no",
            headerName: "House Stand No",
            flex: 0.6,
        },
        {
            field: "house_alias_no",
            headerName: "Alias No",
            flex: 0.6,
        }
    ]

    useEffect(() => {
        getData();
    }, [getData])

    return (
        <Box m='1.5rem 2.5rem'>
            <Header title="EMPLOYEES" subtitle="List of all employees and the house stands they selected."></Header>
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
                getRowId={(row) => row.company_no}
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

export default Employees;