import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import styles from './AddUser.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const AddUser: React.FC = () => {
  const [nameValue, setNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const sendDataToApi = (name: string, email: string) => {
    fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

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
          <div className={styles.inputs}>
            <div className={styles.textField}>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Name'
                variant='outlined'
                required
                error={!isNameValid}
                onChange={(e) => {
                  setNameValue(e.target.value);
                  setIsNameValid(e.target.value.length > 0);
                }}
                helperText={isNameValid ? '' : 'Please fill the name'}
              />
            </div>
            <div className={styles.textField}>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Email'
                variant='outlined'
                required
                error={!isEmailValid}
                onChange={(e) => {
                  setEmailValue(e.target.value);
                  const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                  setIsEmailValid(re.test(e.target.value));
                }}
                helperText={isEmailValid ? '' : 'Please enter a valid email address'}
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <div className={styles.cancelButton}>
              <NavLink to='/'>
                <Button variant='contained' color='error'>
                  Cancel
                </Button>
              </NavLink>
            </div>
            <div>
              <Button
                variant='contained'
                color='success'
                disabled={!(isNameValid && isEmailValid)}
                onClick={() => sendDataToApi(nameValue, emailValue)}
              >
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser;
