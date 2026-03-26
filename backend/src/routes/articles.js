import express from 'express';
import Article from '../models/Article.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
  try {
    const { search, skip = 0, limit = 10 } = req.query;
    
    let query = { isActive: true };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { journal: { $regex: search, $options: 'i' } },
      ];
    }
    
    const articles = await Article.find(query)
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    
    const total = await Article.countDocuments(query);
    
    res.json({ articles, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create article (admin/librarian only)
router.post('/', authMiddleware, roleMiddleware(['admin', 'librarian']), async (req, res) => {
  try {
    const { title, author, journal, totalCopies, ...rest } = req.body;
    
    if (!title || !author || !journal) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const article = new Article({
      title,
      author,
      journal,
      totalCopies: totalCopies || 1,
      availableCopies: totalCopies || 1,
      ...rest,
    });
    
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update article (admin/librarian only)
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), async (req, res) => {
  try {
    const { totalCopies, availableCopies, ...updates } = req.body;
    
    const article = await Article.findByIdAndUpdate(req.params.id,
      { ...updates, totalCopies, availableCopies },
      { new: true, runValidators: true }
    );
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete article (admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
