"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import api, { getCategories } from "../utils/api";
import { useAuth } from "../utils/auth";
import { SelectChangeEvent } from "@mui/material/Select";

interface Note {
  _id: string;
  title: string;
  content: string;
  categories: string[];
  isArchived: boolean;
}

export default function Home() {
  useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");

  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, []);

  const handleCreateNote = async (
    title: string,
    content: string,
    categories: string[]
  ) => {
    try {
      await api.post("/notes", { title, content, categories });
      fetchNotes();
      fetchCategories(); // Actualiza la lista de categorías
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleUpdateNote = async (
    title: string,
    content: string,
    categories: string[]
  ) => {
    if (editingNote) {
      try {
        await api.put(`/notes/${editingNote._id}`, {
          title,
          content,
          categories,
        });
        setIsDialogOpen(false);
        setEditingNote(null);
        fetchNotes();
        fetchCategories(); // Actualiza la lista de categorías
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  };

  const handleEditNote = (id: string) => {
    const noteToEdit = notes.find((note) => note._id === id);
    if (noteToEdit) {
      setEditingNote(noteToEdit);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleToggleArchive = async (id: string) => {
    try {
      const noteToToggle = notes.find((note) => note._id === id);
      if (noteToToggle) {
        await api.put(`/notes/${id}`, { isArchived: !noteToToggle.isArchived });
        fetchNotes();
      }
    } catch (error) {
      console.error("Error toggling archive status:", error);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterCategory(event.target.value as string);
  };

  const filteredNotes = useMemo(() => {
    return filterCategory
      ? notes.filter(
          (note) => note.categories.includes(filterCategory) && !note.isArchived
        )
      : notes.filter((note) => !note.isArchived);
  }, [notes, filterCategory]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Note
      </Typography>
      <NoteForm onSubmit={handleCreateNote} categories={categories} />
      <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
        My Notes
      </Typography>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id="category-filter-label">Filter by Category</InputLabel>
          <Select
            labelId="category-filter-label"
            value={filterCategory}
            onChange={handleFilterChange}
            label="Filter by Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <NoteList
        notes={filteredNotes}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
        onToggleArchive={handleToggleArchive}
      />
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          {editingNote && (
            <NoteForm
              onSubmit={handleUpdateNote}
              initialTitle={editingNote.title}
              initialContent={editingNote.content}
              initialCategories={editingNote.categories}
              categories={categories}
              isEditMode={true}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
