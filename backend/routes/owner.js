const express = require('express');
const { User, Store, Rating } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// GET: ratings for the store owned by this user
router.get('/ratings', auth(['OWNER']), async (req, res) => {
  const store = await Store.findOne({
    where: { ownerId: req.user.id },
    include: [{ model: Rating, include: [User] }],
  });

  if (!store) return res.status(404).json({ message: 'Store not found for this owner' });

  const ratings = store.Ratings.map(r => ({
    userName: r.User.name,
    userEmail: r.User.email,
    rating: r.rating,
  }));

  const average = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : 'N/A';

  res.json({ storeName: store.name, averageRating: average, ratings });
});

module.exports = router;
