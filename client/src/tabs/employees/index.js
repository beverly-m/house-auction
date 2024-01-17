import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Axios from 'axios';
import CustomToolbar from '../../components/CustomToolbar';

const Employees = () => {

    const [data, setData] = useState();

    const getData = useCallback(() => {
        Axios.get(`http://localhost:5000/api/v1/admin/employees`).then(response => {
            if (response.status !== 200) return;
            setData(response.data);
        })
        ;
    }, []);

    const cols = [
        {
            field: "company_no",
            headerName: "Company number",
            flex: 0.75,
        },
        {
            field: "first_name",
            headerName: "First name",
            flex: 0.75,
        },
        {
            field: "surname",
            headerName: "Surname",
            flex: 0.75,
        },
        {
            field: "house_alias_no",
            headerName: "Number selected",
            flex: 0.6,
        },
        {
            field: "house_no",
            headerName: "House stand no",
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
                height="70vh"
                width="95%"
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