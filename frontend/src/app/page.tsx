"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
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

  const handleEditNote = (id: string) => {
    const noteToEdit = notes.find((note) => note._id === id);
    if (noteToEdit) {
      setEditingNote(noteToEdit);
      setIsDialogOpen(true);
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
        fetchCategories();
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
      fetchCategories();
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
    <div className="w-full min-h-full p-12">
      <h2 className="mb-6 text-2xl font-bold font-sans uppercase">My Notes</h2>
      <div className="mb-8 w-full">
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
      </div>
      <NoteList
        notes={filteredNotes}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
        onToggleArchive={handleToggleArchive}
      />
      <Dialog fullWidth maxWidth="md" open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle className="mb-0 text-2xl font-bold font-sans uppercase">Edit Note</DialogTitle>
        <div className="p-5 pt-2">
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
        </div>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
