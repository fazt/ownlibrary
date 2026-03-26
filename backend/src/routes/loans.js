import express from 'express';
import Loan from '../models/Loan.js';
import Book from '../models/Book.js';
import Article from '../models/Article.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get user's active loans
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user is requesting their own loans or is admin
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    
    const loans = await Loan.find({ user: userId })
      .populate('user', 'name email')
      .populate({
        path: 'item',
        model: (doc) => doc.itemType === 'book' ? 'Book' : 'Article',
      });
    
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all loans (admin/librarian only)
router.get('/', authMiddleware, roleMiddleware(['admin', 'librarian']), async (req, res) => {
  try {
    const { status, skip = 0, limit = 10 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    const loans = await Loan.find(query)
      .populate('user', 'name email')
      .populate({
        path: 'item',
        model: (doc) => doc.itemType === 'book' ? 'Book' : 'Article',
      })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    
    const total = await Loan.countDocuments(query);
    
    res.json({ loans, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create loan (borrow item)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { itemType, itemId, dueDate } = req.body;
    
    if (!itemType || !itemId || !dueDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Check if item exists and has available copies
    const ItemModel = itemType === 'book' ? Book : Article;
    const item = await ItemModel.findById(itemId);
    
    if (!item) {
      return res.status(404).json({ message: `${itemType} not found` });
    }
    
    if (item.availableCopies <= 0) {
      return res.status(400).json({ message: 'No copies available' });
    }
    
    // Create loan
    const loan = new Loan({
      user: req.user.id,
      itemType,
      item: itemId,
      dueDate,
    });
    
    // Decrease available copies
    await ItemModel.findByIdAndUpdate(itemId, {
      $inc: { availableCopies: -1 },
    });
    
    await loan.save();
    await loan.populate('user', 'name email');
    
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Return item
router.put('/:id/return', authMiddleware, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    
    // Check permissions
    if (req.user.id !== loan.user.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    
    // Update loan
    loan.returnDate = Date.now();
    loan.status = 'returned';
    
    // Increase available copies
    const ItemModel = loan.itemType === 'book' ? Book : Article;
    await ItemModel.findByIdAndUpdate(loan.item, {
      $inc: { availableCopies: 1 },
    });
    
    await loan.save();
    
    res.json({ message: 'Item returned successfully', loan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
