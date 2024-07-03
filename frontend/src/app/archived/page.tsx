'use client';

import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import NoteList from '../../components/NoteList';
import api from '../../utils/api';
import { useAuth } from '../../utils/auth';

interface Note {
  _id: string;
  title: string;
  content: string;
  isArchived: boolean;
  categories: string[];
}

export default function Archived() {
  useAuth();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  const fetchArchivedNotes = async () => {
    try {
      const response = await api.get('/notes/archived');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching archived notes:', error);
    }
  };

  const handleToggleArchive = async (id: string) => {
    try {
      await api.put(`/notes/${id}`, { isArchived: false });
      fetchArchivedNotes();
    } catch (error) {
      console.error('Error unarchiving note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchArchivedNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Archived Notes
      </Typography>
      <NoteList
        notes={notes}
        onEdit={() => {}} // This will not be used for archived notes
        onDelete={handleDeleteNote}
        onToggleArchive={handleToggleArchive}
      />
    </>
  );
}