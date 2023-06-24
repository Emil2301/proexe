import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './UsersList.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '../Table/Table';
import { NavLink } from 'react-router-dom';

const UsersList: React.FC = () => {
  return (
    <div className={styles.usersList}>
      <Card sx={{ width: '90vw' }} variant='outlined'>
        <CardContent>
          <div className={styles.titleAndButton}>
            <div className={styles.usersListText}>
              <Typography variant='h4' gutterBottom>
                User List
              </Typography>
            </div>
            <NavLink to='/add-user'>
              <Button variant='contained'>Add new</Button>
            </NavLink>
          </div>
          <Table />
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersList;
