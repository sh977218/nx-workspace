import { Box, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { User } from '@shared-models/shared-models';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export function Login() {
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
    const username = users[selectedIndex].username;
    const password = users[selectedIndex].password;
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const { jwt } = await response.json();
    localStorage.setItem('jwt', jwt);
    setTimeout(() => window.location.href = redirectUrl || 'http://localhost:4200');
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
