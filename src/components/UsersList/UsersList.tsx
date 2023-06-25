import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import styles from './UsersList.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '../Table/Table';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { deleteUser } from '../../redux/usersState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<boolean>(false);
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);
  const openModalAndPassRowId = (rowId: number) => {
    setOpen(true);
    setRowToDelete(rowId);
  };
  const deleteTheUser = (rowId: number | null) => {
    dispatch(deleteUser(rowId));
    fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: rowId,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
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
          <Table openModalAndPassRowId={openModalAndPassRowId} />
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Delete
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                Do you really want to delete this user?
              </Typography>
              <div className={styles.buttons}>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: 'gray',
                    marginRight: '1vw',
                  }}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => deleteTheUser(rowToDelete)}
                >
                  Delete
                </Button>
              </div>
            </Box>
          </Modal>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersList;
