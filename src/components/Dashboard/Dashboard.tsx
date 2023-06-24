import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <div className={styles.dashboard}>
        <Typography variant='h3' gutterBottom>
          Dashboard
        </Typography>
      </div>
    </Box>
  );
};

export default Dashboard;
