import React from 'react';
import { UserProvider } from '../contexts/UserContext';
import AppContent from './AppContent';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <AppContent>{children}</AppContent>
        </UserProvider>
      </body>
    </html>
  );
}