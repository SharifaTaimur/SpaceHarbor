const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express);

// app.use('/api/users', require('./routes/userRoutes'));
app.listen(port, () => console.log(`server started on post ${port}`));
