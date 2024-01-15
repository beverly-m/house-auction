import React from 'react';
import { MenuRounded } from '@mui/icons-material';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';

const AdminNavbar = ({
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
  return (
    <AppBar 
        sx={{
            position: "static",
            background: "none",
            boxShadow: "none",
        }}
    >
        <Toolbar sx={{ justifyContent: "space-between"}}>
            <IconButton color='text' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <MenuRounded /> 
            </IconButton>
            <Button color='text' variant='outlined' onClick={() => console.log("logout")}>Log Out</Button>
        </Toolbar>
    </AppBar>
  )
}

export default AdminNavbar;