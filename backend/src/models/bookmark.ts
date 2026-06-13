import { model, Schema } from 'mongoose';

// schema
export interface IBookmark extends Document {
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  createdAt: string;
  lastVisited: string;
}

const bookmarkSchema = new Schema<IBookmark>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  favicon: { type: String, required: false, default: '' },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  pinned: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  visitCount: { type: Number, required: false, default: null },
  createdAt: { type: String },
  lastVisited: { type: String, default: null },
});

// model from schema
export const Bookmark = model<IBookmark>('Bookmark', bookmarkSchema);
