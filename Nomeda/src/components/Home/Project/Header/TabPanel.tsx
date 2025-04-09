import React from 'react';
import { Box } from '@mui/material';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ height: 'calc(100% - 160px)', overflow: 'auto', width:'90vw'}}
    >
      {value === index && <Box sx={{ height: '100%', overflow: 'hidden' }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;