import React from 'react';
import { Typography, Box } from '@mui/material';

const Header = ({ title, subtitle }) => {
  return (
    <Box>
        <Typography 
        variant='h2'
        color='text'
        sx={{ mb: '5px' }}
        >
            {title}
        </Typography>
        <Typography 
        variant='h5'
        color='text'
        >
            {subtitle}
        </Typography>
    </Box>
  )
}

export default Header;