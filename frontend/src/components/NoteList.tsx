'use client';

import React from 'react';
import { Grid } from '@mui/material';
import NoteItem from './NoteItem';

interface Note {
  _id: string;
  title: string;
  content: string;
  isArchived: boolean;
  categories: string[];
}

interface NoteListProps {
  notes: Note[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete, onToggleArchive }) => {
  return (
    <Grid container spacing={2}>
      {notes.map((note) => (
        <Grid item xs={12} sm={6} md={4} key={note._id}>
          <NoteItem
            id={note._id}
            title={note.title}
            content={note.content}
            categories={note.categories} // Añadido
            isArchived={note.isArchived}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleArchive={onToggleArchive}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default NoteList;