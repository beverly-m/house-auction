import React from 'react';
import { Box, Icon, Typography, useTheme } from '@mui/material';
import FlexBetween from './FlexBetween';

const StatBox = ({title, icon, value, denominator, description}) => {

    const theme = useTheme();

  return (
    <Box
     gridColumn="span 6"
     gridRow="span 1"
     display="flex"
     flexDirection="column"
     justifyContent="space-between"
     p="1.25rem 1rem"
     flex="1 1 100%"
     borderRadius="0.55rem"
     border="1px solid #d42f13"
    >
        <FlexBetween sx={{color: "#c4c4c4"}}>
            <Typography variant='body1' sx={{color: theme.palette.text.main, fontWeight: "600"}}>
                {title}
            </Typography>
            {icon}
        </FlexBetween>
        
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "baseline"}}>
            <Typography
            variant='h2'
            fontWeight="600"
            sx={{color: theme.palette.text.main}}
            >
            {value}
            </Typography>
            <Typography
              variant='h6'
              fontStyle='italic'
              sx={{color: "#646464"}}
            >
                / {denominator}
            </Typography>
        </Box>
        <Typography sx={{color: "#646464"}}>
                {description}
        </Typography>
    </Box>
  )
}

export default StatBox;