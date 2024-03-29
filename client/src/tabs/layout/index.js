import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminNavBar from '../../components/AdminNavbar';
import Sidebar from '../../components/Sidebar';

const Layout = () => {

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" pb="2rem" className="admin-container" >
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth={248}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1} >
                <AdminNavBar 
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout