import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import Axios from 'axios';
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import {
    DashboardCustomizeRounded,
    PeopleOutlineRounded,
    GiteRounded,
    LogoutRounded,
    ChevronRightRounded,
    MenuRounded,
    AdminPanelSettingsRounded
} from '@mui/icons-material';
import { AccountContext } from '../accountContext';

const navItems = [
    {
        text: "Dashboard",
        icon: <DashboardCustomizeRounded />,
    },
    {
        text: "Employees",
        icon: <PeopleOutlineRounded />,
    },
    {
        text: "Houses",
        icon: <GiteRounded />,
    },
    {
        text: "Management",
        icon: <AdminPanelSettingsRounded />,
    },
    {
        text: "Log Out",
        icon: <LogoutRounded />,
    },
]

const Sidebar = ({
    isNonMobile,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const [active, setActive] = useState("");
    const navigate = useNavigate();

    const {user, setUser} = useContext(AccountContext);

    const [open, setOpen] = useState(false);
    const [error, setError] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleLogOut = () => {
        try {
            Axios.get('http://localhost:5000/api/v1/admin/logout', {
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
                    setUser({loggedIn: null, email: null, role: null});
                    navigate("/admin");
                }
            })
        } catch (error) {
        }
    }

    useEffect(() => {
        setActive(navItems[0].text.toLowerCase());
    }, [setActive]);


    return (
        <Box component="nav">
            
            {isSidebarOpen && (
                <Drawer 
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            color: "#16161d",
                            backgroundColor: "#16161d",
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color="white">
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant='h6' fontFamily="Machine Regular">PPC ZIMBABWE</Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton sx={{color: 'white'}} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <MenuRounded />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                const lcText = text.toLowerCase();

                                if (lcText !== "management" || (lcText === "management" && user.role === "admin") ) {}

                                return lcText !== "management" || (lcText === "management" && user.role === "admin") ? (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton onClick={async () => { 
                                            setActive(lcText);
                                            if (lcText === "log out") {
                                                handleClickOpen();
                                            } else {
                                                navigate(`/admin/${lcText}`);
                                            }
                                            
                                            }}
                                            sx={{
                                                backgroundColor: active === lcText ? "#d42f13" : "transparent",
                                                color: active === lcText
                                                ? "#ffffff" : 
                                                "#ffffff",
                                                ":hover": {
                                                    backgroundColor: "#d42f13"
                                                }
                                            }}
                                        >
                                            <ListItemIcon 
                                            sx={{
                                                ml: "2rem",
                                                color: active === lcText 
                                                ? "#ffffff" : 
                                                "#ffffff"
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightRounded sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                )
                                :
                                (
                                <></>
                                )
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
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
        </Box>
    )
}

export default Sidebar;