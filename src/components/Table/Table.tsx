import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Users, UsersWithExtraProperties } from '../../types/Types';
import styles from './Table.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [currentlyEditingId, setCurrentlyEditingId] = useState<number | null>(null);
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
    row: Users,
  ) => {
    const { value } = e.target;
    setUsers(
      users.map((user) => {
        if (user.id === currentlyEditingId) {
          return { ...row, [name]: value };
        } else {
          return {
            ...user,
          };
        }
      }),
    );
  };
  const deleteUser = (rowId: number) => {
    setUsers(users.filter((user) => user.id !== rowId));
  };
  const finishEditing = () => {
    setCurrentlyEditingId(null);
  };
  const fetchUserData = () => {
    fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(
          data.map((user: UsersWithExtraProperties) => {
            const { address, company, phone, website, ...rest } = user;
            return { ...rest, city: address.city };
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      });
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
            {users.map((row) => {
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
                        deleteUser(row.id);
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
