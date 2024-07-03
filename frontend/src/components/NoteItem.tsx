'use client';

import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';

interface NoteItemProps {
  id: string;
  title: string;
  content: string;
  categories: string[];
  isArchived: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ 
  id, 
  title, 
  content, 
  categories,
  isArchived,
  onEdit, 
  onDelete, 
  onToggleArchive 
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">{content}</Typography>
        <Box mt={1} mb={2} display="flex" flexWrap="wrap" gap={0.5}>
          {categories.map((category, index) => (
            <Chip key={index} label={category} size="small" />
          ))}
        </Box>
        <Box>
          {!isArchived && (
            <Button onClick={() => onEdit(id)} color="primary">Edit</Button>
          )}
          <Button onClick={() => onDelete(id)} color="secondary">Delete</Button>
          <Button 
            onClick={() => onToggleArchive(id)} 
            color="secondary"
          >
            {isArchived ? 'Unarchive' : 'Archive'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteItem;