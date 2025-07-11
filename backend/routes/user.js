const express = require('express');
const { Store, Rating, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();


router.get('/stores', auth(['USER']), async (req, res) => {
  const stores = await Store.findAll({
    include: [{ model: Rating }],
  });

  const result = stores.map(store => {
    const ratings = store.Ratings || [];
    const average = ratings.length
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
      : 'N/A';

    const userRating = ratings.find(r => r.UserId === req.user.id)?.rating || null;

    return {
      id: store.id,
      name: store.name,
      address: store.address,
      averageRating: average,
      userRating,
    };
  });

  res.json(result);
});


router.post('/rate', auth(['USER']), async (req, res) => {
  const { storeId, rating } = req.body;
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be 1 to 5' });
  }

  const [existing] = await Rating.findAll({ where: { StoreId: storeId, UserId: req.user.id } });

  if (existing) {
    existing.rating = rating;
    await existing.save();
    return res.json({ message: 'Rating updated' });
  }

  await Rating.create({ StoreId: storeId, UserId: req.user.id, rating });
  res.json({ message: 'Rating submitted' });
});

module.exports = router;
