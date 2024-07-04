"use client";

import React from "react";
import { Box, Chip } from "@mui/material";
import { useUser } from "@/contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faBoxOpen,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

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
  onToggleArchive,
}) => {
  const { user } = useUser();

  console.log("the user info: ", user);

  return (
    <div className="border border-gray-300 rounded-2xl p-5 shadow-md">
      <h5 className="mb-1 font-semibold text-xl capitalize">{title}</h5>
      <div className="w-10 h-10 cursor-pointer rounded-full overflow-hidden mb-2 border-4 border-white transition-all duration-500 hover:transition-all hover:duration-500 hover:border-blue-400">
        <img
          src={user?.profilePicture}
          alt={user?.username}
          className="object-cover"
        />
      </div>
      <p className="font-lato text-[16px] text-gray-600 mb-4">{content}</p>
      <Box mt={1} mb={2} display="flex" flexWrap="wrap" gap={0.5}>
        {categories.map((category, index) => (
          <Chip key={index} label={category} size="small" />
        ))}
      </Box>
      <div className="flex gap-1">
        {!isArchived && (
          <button
            onClick={() => onEdit(id)}
            className="flex h-8 w-8 rounded-full overflow-hidden bg-gray-700 items-center justify-center transition-all duration-300 hover:bg-blue-500"
          >
            <FontAwesomeIcon className="text-white text-xs" icon={faPen} />
          </button>
        )}
        <button
          onClick={() => onDelete(id)}
          className="flex h-8 w-8 rounded-full overflow-hidden bg-gray-700 items-center justify-center transition-all duration-300 hover:bg-blue-500"
        >
          <FontAwesomeIcon className="text-white text-xs" icon={faTrashCan} />
        </button>
        <button
          onClick={() => onToggleArchive(id)}
          className="flex h-8 w-8 rounded-full overflow-hidden bg-gray-700 items-center justify-center transition-all duration-300 hover:bg-blue-500"
        >
          {isArchived ? (
            <FontAwesomeIcon className="text-white text-xs" icon={faBoxOpen} />
          ) : (
            <FontAwesomeIcon className="text-white text-xs" icon={faBoxArchive} />
          )}
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
