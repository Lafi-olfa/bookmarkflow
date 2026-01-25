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
  favicon: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  pinned: { type: Boolean, required: true },
  isArchived: { type: Boolean, required: true },
  visitCount: { type: Number, required: true },
  createdAt: { type: String, required: true },
  lastVisited: { type: String, required: true },
});

// model from schema
export const Bookmark = model<IBookmark>('Bookmark', bookmarkSchema);
