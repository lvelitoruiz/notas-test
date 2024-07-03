import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { logout } from '../utils/auth';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Notes App
            </Typography>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/archived">Archived</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '2rem' }}>
          {children}
        </Container>
      </body>
    </html>
  );
}