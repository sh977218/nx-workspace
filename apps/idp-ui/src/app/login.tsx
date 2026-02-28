import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useParams, useSearchParams } from 'react-router';

export function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const params = useParams();
  const [searchParams] = useSearchParams();

  const onSignIn = () => {
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('params: ', params);
    console.log('searchParams: ', searchParams);
    console.log('redirect: ', searchParams.get('redirect'));
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
        <Button variant="contained" onClick={onSignIn}>Sign In</Button>
        <Button variant="outlined">Cancel</Button>
      </Box>
    </>
  );
};

export default Login;
