import { Box, Button, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { User } from '@shared-models/shared-models';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('http://localhost:3000/users');
      const users = await res.json();
      setUsers(users);
    };
    getUsers();
  }, []);

  const onSignIn = async () => {
    const redirectUrl = searchParams.get('redirectUrl');
    const _username = email || users[selectedIndex].email;
    const _password = password || users[selectedIndex].password;
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: _username,
        password: _password
      })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    window.location.href = 'http://localhost:4200';
  };

  return (
    <>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        display={'flex'}
        flexDirection={'column'}
        noValidate
        autoComplete="off"
      >
        <List>
          {users.map((user: User, i: number) => (
            <ListItemButton
              key={user.id}
              selected={selectedIndex === i}
              onClick={(event) => handleListItemClick(event, i)}
            >
              {user.username}
            </ListItemButton>
          ))}
        </List>
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
      </Box>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <Button variant="contained" onClick={onSignIn}>
          Sign In
        </Button>
        <Button variant="outlined">Cancel</Button>
      </Box>
    </>
  );
};

export default Login;
