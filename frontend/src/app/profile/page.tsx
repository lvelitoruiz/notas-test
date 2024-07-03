'use client';

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Avatar } from '@mui/material';
import { useUser } from '../../contexts/UserContext';

export default function Profile() {
  const { user, updateUser } = useUser();
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({ email, bio });
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
      // Show error message
    }
  };

  if (!user) return <Typography>Please log in to view your profile.</Typography>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Avatar
        src={user.profilePicture}
        alt={user.username}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        {user.username}'s Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2} width={300}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            rows={4}
          />
          <Typography>Notes created: {user.noteCount}</Typography>
          <Button type="submit" variant="contained" color="primary">
            Update Profile
          </Button>
        </Box>
      </form>
    </Box>
  );
}