import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import FlexBetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import StatBox from '../../components/StatBox';
import { HouseRounded, PeopleOutlineRounded } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [data, setData] = useState();

    const navigate = useNavigate();

    const theme = useTheme();

    const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");

    const getData = useCallback(() => {
          Axios.get(`http://localhost:5000/api/v1/admin/dashboard`)
          .then(response => {
              if (response.status !== 200) return;
              console.log(response.data);
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

    const cols2 = [
        {
            field: "house_no",
            headerName: "House Stand No",
            flex: 0.6,
        },
        {
            field: "alias_no",
            headerName: "Alias No",
            flex: 0.6,
        }
    ]

    useEffect(() => {
        getData();
    }, [getData])

    return (
      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </FlexBetween>
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="160px"
          gap="20px"
          sx={{
            "& > div": { gridColumn: isNonMediumScreen ? undefined : "span 12"}
          }}
        >
          {/* ROW 1 */}
          <StatBox
            title="Employees"
            value={data && data.num_emp_bids}
            denominator={data && data.num_employees}
            description={"employees have selected a house stand."}
            icon={ <PeopleOutlineRounded /> }
          />
          <StatBox
            title="House Stands"
            value={data && data.num_h_bids}
            denominator={data && data.num_houses}
            description={"house stands taken."}
            icon={ <HouseRounded /> }
          />
          {/* ROW 2 */}
          <Box
            mb="1rem"
            gridColumn="span 8"
            gridRow="span 2"
            sx={{
                '& .css-t89xny-MuiDataGrid-columnHeaderTitle': {
                    fontWeight: '600'
                },
            }}
            >
                <FlexBetween sx={{mb: "0.5rem", mt: "0.5rem"}}>
                  <Typography 
                  variant='body2' 
                  sx={{color: "#646464"}}
                  >
                    Employees that have selected houses stands
                  </Typography>
                  <Button 
                  color='text' variant='text'
                  onClick={() => navigate(`/admin/employees`)}
                  sx={{color: theme.palette.primary.main, fontWeight: "600", fontFamily: theme.typography.fontFamily}}
                  >
                    View Employees
                  </Button>
                </FlexBetween>
                
                <DataGrid
                loading={!data}
                getRowId={(row) => row.company_no}
                rows={(data && data.bids) || []}
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
            <Box
              mb="1rem"
              gridColumn="span 4"
              gridRow="span 2"
              sx={{
                  '& .css-t89xny-MuiDataGrid-columnHeaderTitle': {
                      fontWeight: '600'
                  },
              }}
              >
                  <FlexBetween sx={{ mb: "0.5rem", mt: "0.5rem" }}>
                    <Typography 
                    variant='body2' 
                    sx={{color: "#646464"}}
                    >
                      House stands remaining
                    </Typography>
                    <Button 
                  color='text' variant='text'
                  onClick={() => navigate(`/admin/houses`)}
                  sx={{color: theme.palette.primary.main, fontWeight: "600", fontFamily: theme.typography.fontFamily}}
                  >
                    View Houses
                  </Button>
                  </FlexBetween>
                  
                  <DataGrid
                  loading={!data}
                  getRowId={(row) => row.house_no}
                  rows={(data && data.houses_left) || []}
                  columns={cols2}
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
      </Box>
    )
}

export default Dashboard;