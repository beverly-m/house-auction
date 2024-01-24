import React, { useContext, useState } from 'react';
import { MenuRounded } from '@mui/icons-material';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar, Typography } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../accountContext';

const AdminNavbar = ({
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState();
    const { setUser } = useContext(AccountContext);
    const navigate = useNavigate();
    const PORT = process.env.REACT_APP_PORT || 'localhost:'+5000;

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleLogOut = () => {
        try {
            Axios.get(`http://${PORT}/api/v1/admin/logout`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }).then(response => {
                if (!response || response.status !== 200) {
                    setError("An error occurred. Try again.")
                    return;
                } 
                else {
                    handleClose();
                    setUser({loggedIn: null, email: null, role: null});
                    navigate("/admin");
                }
            })
        } catch (error) {
        }
    }

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
                <Button color='text' variant='outlined' onClick={handleClickOpen}>
                    Log Out
                </Button>
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle fontWeight={700}>Log Out</DialogTitle>
                    <DialogContent>
                        {error ? <Typography sx={{ color: "red", mb: "1rem" }}>Hi {error}</Typography> : <></>}
                        <DialogContentText sx={{ color: "#16161d" }}>
                            Are you sure you want to log out?
                        </DialogContentText>
                        <DialogActions sx={{mt: "2rem", display: "flex", gap: "2rem"}}>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant='contained' onClick={handleLogOut} autoFocus>
                                Log Out
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </Toolbar>
        </AppBar>
    )
}

export default AdminNavbar;