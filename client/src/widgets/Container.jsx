import React from 'react';
import { Box } from '@mui/material';

const Container = ({children, sx, className}) => {
    return (
        <Box className={`flex rounded-[22px] flex-col items-center justify-center shadow-lg bg-[#101418] shadow-[#64c7ee] ${className}`}
             sx={{
                 ...sx,
             }}
        >
            {children}
        </Box>
    );
};

export default Container;