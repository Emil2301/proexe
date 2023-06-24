import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './Dashboard.module.css';
import UsersList from '../UsersList/UsersList';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <div className={styles.dashboard}>
        <Typography variant='h3' gutterBottom>
          Dashboard
        </Typography>
      </div>
      <UsersList />
    </Box>
  );
};

export default Dashboard;
