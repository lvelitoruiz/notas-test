import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  isArchived: boolean;
  categories: string[];
  userId: mongoose.Types.ObjectId;
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isArchived: { type: Boolean, default: false },
  categories: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<INote>('Note', NoteSchema);