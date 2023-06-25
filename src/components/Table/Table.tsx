import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { User, UserWithExtraProperties } from '../../types/Types';
import styles from './Table.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { setFetchedUsers, deleteUser, editUser } from '../../redux/usersState';
import { AppDispatch } from '../../redux/store';
import { useLocation } from 'react-router-dom';

const UsersTable: React.FC = () => {
  const users = useSelector((state: { users: User[] }) => state.users);
  const { state } = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const [currentlyEditingId, setCurrentlyEditingId] = useState<number | null>(null);
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    keyName: string,
    row: User,
  ) => {
    const { value } = e.target;
    dispatch(editUser({ value, keyName, row, currentlyEditingId }));
    fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...row, [keyName]: value }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const deleteTheUser = (rowId: number) => {
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
  };
  const finishEditing = () => {
    setCurrentlyEditingId(null);
  };
  const fetchUserData = () => {
    if (state && state.userAdded) {
      window.history.replaceState({}, document.title);
    } else {
      fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(
            setFetchedUsers(
              data.map((user: UserWithExtraProperties) => {
                const { address, company, phone, website, ...rest } = user;
                return { ...rest, city: address.city };
              }),
            ),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className={styles.table}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Username</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>City</TableCell>
              <TableCell align='right'>Edit</TableCell>
              <TableCell align='right'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row: User) => {
              const currentlyEditing = row.id === currentlyEditingId;
              return (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell align='right'>
                    {currentlyEditing ? (
                      <TextField
                        size='small'
                        value={row.name}
                        onChange={(e) => onChange(e, 'name', row)}
                        key={`name-${row.id}`}
                      />
                    ) : (
                      row.name
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    {currentlyEditing ? (
                      <TextField
                        size='small'
                        value={row.username}
                        onChange={(e) => onChange(e, 'username', row)}
                      />
                    ) : (
                      row.username
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    {currentlyEditing ? (
                      <TextField
                        size='small'
                        value={row.email}
                        onChange={(e) => onChange(e, 'email', row)}
                      />
                    ) : (
                      row.email
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    {currentlyEditing ? (
                      <TextField
                        size='small'
                        value={row.city}
                        onChange={(e) => onChange(e, 'city', row)}
                      />
                    ) : (
                      row.city
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      variant='contained'
                      size='small'
                      style={{
                        backgroundColor: currentlyEditing ? 'blue' : 'orange',
                      }}
                      onClick={
                        currentlyEditing ? finishEditing : () => setCurrentlyEditingId(row.id)
                      }
                    >
                      {currentlyEditing ? 'Finish editing' : 'Edit'}
                    </Button>
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      variant='contained'
                      size='small'
                      style={{
                        backgroundColor: 'red',
                      }}
                      onClick={() => {
                        deleteTheUser(row.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersTable;
