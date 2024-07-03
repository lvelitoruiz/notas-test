import express from 'express';
import { createNote, getNotes, updateNote, deleteNote, getArchivedNotes, getNotesByCategory, getCategories } from '../controllers/noteController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createNote);
router.get('/', auth, getNotes);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);
router.get('/archived', auth, getArchivedNotes);
router.get('/category/:category', auth, getNotesByCategory);
router.get('/categories', auth, getCategories);

export default router;