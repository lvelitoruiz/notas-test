import { Request, Response } from "express";
import Note, { INote } from "../models/Note";

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content, categories } = req.body;
    const userId = req.user!.id;

    const note = new Note({
      title,
      content,
      categories,
      userId,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const notes = await Note.find({ userId, isArchived: false });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, isArchived, categories } = req.body;
    const userId = req.user!.id;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      { title, content, isArchived, categories },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const note = await Note.findOneAndDelete({ _id: id, userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getArchivedNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const notes = await Note.find({ userId, isArchived: true });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotesByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const userId = req.user!.id;

    const notes = await Note.find({ userId, categories: category });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    // Obtener todas las categorías únicas de las notas del usuario
    const categories = await Note.distinct("categories", { userId });

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};
