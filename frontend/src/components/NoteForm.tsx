'use client';

import React, { useState, useCallback } from 'react';
import { TextField, Button, Box, Chip, Autocomplete } from '@mui/material';

interface NoteFormProps {
  onSubmit: (title: string, content: string, categories: string[]) => void;
  initialTitle?: string;
  initialContent?: string;
  initialCategories?: string[];
  isEditMode?: boolean;
  categories: string[];
}

const NoteForm: React.FC<NoteFormProps> = ({ 
  onSubmit, 
  initialTitle = '', 
  initialContent = '', 
  initialCategories = [],
  isEditMode = false,
  categories
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [noteCategories, setNoteCategories] = useState<string[]>(initialCategories);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content, noteCategories);
    if (!isEditMode) {
      setTitle('');
      setContent('');
      setNoteCategories([]);
    }
  }, [title, content, noteCategories, isEditMode, onSubmit]);

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
          required
        />
        <Autocomplete
          multiple
          id="categories"
          options={categories}
          value={noteCategories}
          onChange={(event, newValue) => {
            setNoteCategories(newValue);
          }}
          freeSolo
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Categories"
              placeholder="Add categories"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          {isEditMode ? 'Update Note' : 'Save Note'}
        </Button>
      </Box>
    </form>
  );
};

export default NoteForm;