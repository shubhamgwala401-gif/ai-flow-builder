require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const aiRoutes = require('./routes/ai');
const saveRoutes = require('./routes/save');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error:', err));
// Routes
app.use('/api/ask-ai', aiRoutes);
app.use('/api/save', saveRoutes);

app.listen(process.env.PORT , () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
