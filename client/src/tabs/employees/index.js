import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';

const Employees = () => {

    const [data, setData] = useState();

    const getData = useCallback(() => {
        Axios.get(`http://localhost:5000/api/v1/admin/employees`).then(response => {
            if (response.status !== 200) return;
            console.log(response.data)
            setData(response.data);

        })
        ;
    }, []);

    useEffect(() => {
        getData();
    }, [getData])

    return (
        <div>Employees {JSON.stringify(data)}</div>
    )
}

export default Employees;