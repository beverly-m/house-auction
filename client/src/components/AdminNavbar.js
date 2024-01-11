import React from 'react';
import { MenuRounded } from '@mui/icons-material';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';

const AdminNavbar = () => {
  return (
    <AppBar 
        sx={{
            position: "static",
            background: "none",
            boxShadow: "none"
        }}
    >
        <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton color='secondary' onClick={() => console.log("open/close navbar")}>
                <MenuRounded /> 
            </IconButton>
            <Button color='secondary' variant='outlined' onClick={() => console.log("logout")}>Log Out</Button>
        </Toolbar>
    </AppBar>
  )
}

export default AdminNavbar;