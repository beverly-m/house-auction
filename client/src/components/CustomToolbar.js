import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react';

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
        <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default CustomToolbar;