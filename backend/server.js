// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const productRoutes = require('./routes/productRoutes');
// const UserRouter = require('./routes/UserRouter')

// dotenv.config();

// const app = express();

// // app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));
// app.use(
//     cors({
//       origin: 'http://localhost:3000', 
//       credentials: true, 
//     })
//   );

// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Use product routes
// app.use('/api/products', productRoutes);

// app.use('/auth', UserRouter);
// app.use(cookieParser());

// app.post('/api/update-skin-tone-gender', (req, res) => {
//     const { skin_tone, gender } = req.body;

//     console.log('Received skin tone:', skin_tone);
//     console.log('Received gender:', gender);

//     // You can now store this data in a database or use it as needed
//     res.json({ message: 'Data received successfully' });
// });

// // Serve frontend in production
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
//     });
// }

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes');
const UserRouter = require('./routes/UserRouter');
const cartRoutes = require("./routes/cart");
const stripe = require("stripe")("sk_test_51Q5kUrKs4ldJ96PWugUoFocTH2VUxhzRBKsdeyB1i34xf8YiWddYbUjNM3a7lgmaBE97CxkPE9RUQ3VJL0ycCj9e001GGNWVLG");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();
const {v4:uuidv4} =require("uuid");
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

app.use(express.json()); // To parse JSON bodies
app.use("/api/cart", cartRoutes); // Use cart routes
app.use("/api", reviewRoutes);
app.post("/payment", (req, res) => {
    const{product,token}=req.body;
    const transactionkey = uuidv4();
    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then((customer) => {
        stripe.charges.create({
            amount:product.price,
            currency:"LKR",
            customer:customer.id,
            receipt_email:token.email,
            description:product.name,

        }).then((result)=>{
            res.json(result);
                })
    })
    .catch((err)=>
    console.log(err));
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});