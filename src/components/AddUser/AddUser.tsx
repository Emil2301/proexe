import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './AddUser.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const AddUser: React.FC = () => {
  return (
    <div className={styles.addUser}>
      <Card sx={{ width: '90vw' }} variant='outlined'>
        <CardContent>
          <div className={styles.titleAndButton}>
            <div className={styles.usersListText}>
              <Typography variant='h4' gutterBottom>
                Form
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser;
