'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useUser } from '../contexts/UserContext';
import Link from 'next/link';
import ProtectedRoute from './ProtectedRoute';
import { usePathname } from 'next/navigation';

const AppContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useUser();
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Notes App
          </Typography>
          {user && (
            <>
              <Link href="/" passHref>
                <Button color="inherit">Home</Button>
              </Link>
              <Link href="/archived" passHref>
                <Button color="inherit">Archived</Button>
              </Link>
              <Link href="/profile" passHref>
                <Button color="inherit">Profile</Button>
              </Link>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '2rem' }}>
        {isLoginPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
      </Container>
    </>
  );
};

export default AppContent;