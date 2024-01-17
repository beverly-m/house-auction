import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';

const Header = ({ title, subtitle }) => {

  const theme = useTheme();

  return (
    <Box>
        <Typography 
        variant='h4'
        sx={{ mb: '5px', color: theme.palette.text.main, fontFamily: "Machine regular" }}
        >
            {title}
        </Typography>
        <Typography 
        variant='body1'
        sx={{ color: "#646464" }}
        >
            {subtitle}
        </Typography>
    </Box>
  )
}

export default Header;