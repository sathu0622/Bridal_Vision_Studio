const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes');
const UserRouter = require('./routes/UserRouter')
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(
    cors({
      origin: 'http://localhost:3000', 
      credentials: true, 
    })
  );

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use product routes
app.use('/api/products', productRoutes);

// Review routes
app.use("/api", reviewRoutes);

app.use('/auth', UserRouter);
app.use(cookieParser());

app.post('/api/update-skin-tone-gender', (req, res) => {
    const { skin_tone, gender } = req.body;

    console.log('Received skin tone:', skin_tone);
    console.log('Received gender:', gender);

    // You can now store this data in a database or use it as needed
    res.json({ message: 'Data received successfully' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
