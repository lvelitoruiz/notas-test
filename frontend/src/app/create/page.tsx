'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import NoteForm from '../../components/NoteForm';
import { useRouter } from 'next/navigation';
import api, { getCategories } from '../../utils/api';
import { useAuth } from "../../utils/auth";

export default function CreateNote() {
  useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateNote = async (title: string, content: string, categories: string[]) => {
    try {
      await api.post("/notes", { title, content, categories });
      router.push('/');
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create Note
      </Typography>
      <NoteForm onSubmit={handleCreateNote} categories={categories} />
    </Box>
  );
}