'use client';

import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import NoteList from "../../components/NoteList";
import api from '../../utils/api';
import { useAuth } from "../../utils/auth";

interface Note {
  _id: string;
  title: string;
  content: string;
  categories: string[];
  isArchived: boolean;
}

export default function ArchivedNotes() {
  useAuth();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  const fetchArchivedNotes = async () => {
    try {
      const response = await api.get("/notes/archived");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching archived notes:", error);
    }
  };

  const handleUnarchiveNote = async (id: string) => {
    try {
      await api.put(`/notes/${id}`, { isArchived: false });
      fetchArchivedNotes();
    } catch (error) {
      console.error("Error unarchiving note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchArchivedNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="w-full min-h-full p-12">
      <h2 className="mb-6 text-2xl font-bold font-sans uppercase">
        Archived Notes
      </h2>
      <NoteList
        notes={notes}
        onEdit={() => {}} // No editing for archived notes
        onDelete={handleDeleteNote}
        onToggleArchive={handleUnarchiveNote}
      />
    </div>
  );
}