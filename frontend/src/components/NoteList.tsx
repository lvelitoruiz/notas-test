"use client";

import React from "react";
import { Grid } from "@mui/material";
import NoteItem from "./NoteItem";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface Note {
  _id: string;
  title: string;
  content: string;
  categories: string[];
  isArchived: boolean;
}

interface NoteListProps {
  notes: Note[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  onEdit,
  onDelete,
  onToggleArchive,
}) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="16px">
        {notes.map((note) => (
            <NoteItem
              id={note._id}
              title={note.title}
              content={note.content}
              categories={note.categories}
              isArchived={note.isArchived}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleArchive={onToggleArchive}
            />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default NoteList;
