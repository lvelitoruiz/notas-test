"use client";

import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import NoteForm from "../../components/NoteForm";
import { useRouter } from "next/navigation";
import api, { getCategories } from "../../utils/api";
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
      console.error("Error fetching categories:", error);
    }
  };

  const handleCreateNote = async (
    title: string,
    content: string,
    categories: string[]
  ) => {
    try {
      await api.post("/notes", { title, content, categories });
      router.push("/");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="p-10 flex items-center">
      <div className="w-full">
        <h2 className="text-2xl font-bold font-sans uppercase mb-6">
          Create Note
        </h2>
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-12 pr-0 md:col-span-6 overflow-hidden md:pr-8">
            <NoteForm onSubmit={handleCreateNote} categories={categories} />
          </div>
          <div className="hidden md:block col-span-12 pr-0 md:col-span-6 overflow-hidden md:pr-8">
            <img
              src="/images/fondito.webp"
              className="w-full h-full object-cover block"
              alt="fondo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
