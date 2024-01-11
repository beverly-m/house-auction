import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material';
import {
    ChevronLeftRounded,
    DashboardCustomizeRounded,
    PeopleOutlineRounded,
    GiteRounded,
    LogoutRounded,
    ChevronRightRounded
} from '@mui/icons-material';

const navItems = [
    {
        text: "Dashboard",
        icon: DashboardCustomizeRounded,
    },
    {
        text: "Employees",
        icon: PeopleOutlineRounded,
    },
    {
        text: "Houses",
        icon: GiteRounded,
    },
    {
        text: "Log Out",
        icon: LogoutRounded,
    }
]

const Sidebar = (
    isNonMobile,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen
) => {

    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer 
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant='h4' fontWeight="bold">PPC ZIMBABWE</Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeftRounded />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({text, icon}) => {
                                const lcText = text.toLowerCase();
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton 
                                            onClick={() => {
                                                navigate(`/admin/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor: active === lcText ? "#989898" : "transparent",
                                                color: active === lcText ? "#16161d" : "#777777"
                                            }}
                                        >
                                            <ListItemIcon 
                                            sx={{ 
                                                ml: "2rem",
                                                color: active === lcText ? "#16161d" : "#555555"
                                            }}    
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />    
                                        </ListItemButton>
                                        {active === lcText && <ChevronRightRounded sx={{ml: "auto"}} /> }
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}

        </Box>
    )
}

export default Sidebar;