import express, { Request, Response } from 'express';
import { Bookmark } from '../models/bookmark';
import { log } from 'console';

const router = express.Router();

// Add new bookmark
router.post('/add', async (req: Request, res: Response) => {
  try {
    const {
      title,
      url,
      favicon,
      description,
      tags,
      pinned,
      isArchived,
      visitCount,
      createdAt,
      lastVisited,
    } = req.body;

    const newBookmark = new Bookmark({
      title,
      url,
      favicon,
      description,
      tags,
      pinned,
      isArchived,
      visitCount,
      createdAt,
      lastVisited,
    });
    await newBookmark.save();

    res.status(201).json(newBookmark);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// get && getByTitle
router.get('/', async (req: Request, res: Response) => {
  try {
    const { title, tags, archive } = req.query;

    const query: any = {};

    if (title && typeof title === 'string') {
      query.title = title;
    }

    let tagsNormalized: string[] = [];
    if (tags && typeof tags === 'string') {
      tagsNormalized = tags.split(/[\s+]+/).filter((tag) => tag.trim() !== '');
    }

    if (tagsNormalized.length > 0) {
      query.tags = { $all: tagsNormalized };
    }

    if (archive) {
      query.isArchived = archive;
    }
    const bookmarks = await Bookmark.find(query);

    res.status(200).json(bookmarks);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// getById
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookmark = await Bookmark.findOne({ _id: id });
    res.status(200).json(bookmark);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

//find and update
router.post('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(req.query);
    const $set: any = {};
    const {
      title,
      url,
      favicon,
      description,
      tags,
      pinned,
      isArchived,
      visitCount,
      lastVisited,
    } = req.body;
    if (title) {
      $set.title = title;
    }
    if (url) {
      $set.url = url;
    }
    if (favicon) {
      $set.favicon = favicon;
    }
    if (description) {
      $set.description = description;
    }
    if (tags) {
      $set.tags = tags;
    }
    if (pinned) {
      $set.pinned = pinned;
    }
    if (isArchived) {
      $set.isArchived = isArchived;
    }
    if (visitCount) {
      $set.visitCount = visitCount;
    }
    if (lastVisited) {
      $set.lastVisited = lastVisited;
    }
    console.log('test ic ');

    const bookmark = await Bookmark.updateOne({ _id: id }, $set);
    res.status(200).json(bookmark);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

router.post('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('id', id);

    const archivedBookmarks = await Bookmark.deleteOne({ _id: id });
    console.log('archivedBookmarks', archivedBookmarks);

    res.status(200).json(archivedBookmarks);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

export default router;
