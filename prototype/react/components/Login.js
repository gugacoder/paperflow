import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Alert, InputAdornment, CircularProgress, Grid } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockOutlined from '@mui/icons-material/LockOutlined';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      setError(error.message);
    },
    onCompleted: (data) => {
      if (data && data.login && data.login.token) {
        localStorage.setItem('token', data.login.token);
        alert('Login successful!');
        setError('');
      } else {
        setError('Invalid response from server');
      }
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loading) {
      try {
        await login({ variables: { username, password } });
      } catch (err) {
        // Error is handled in onError callback
      }
    }
  };

  return (
    <Container maxWidth={false} sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
    }}>
      <Box
        sx={{
          width: '900px',
          height: '500px',
          display: 'flex',
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
            <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
              LOGIN
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              Olá! Bemvindo ao PaperFlow.
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', maxWidth: '400px' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <Box component="img" src="https://picsum.photos/400/300" alt="PaperFlow" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
