const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const ownerRoutes = require('./routes/owner');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/owner', ownerRoutes);

app.use('/api/auth', authRoutes);
// Add more routes like /admin, /user, /owner here

const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
