const express = require('express');
const dotenv = require('dotenv').config();
// console.log(process.env);
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');
const sessionRoutes = require('./routes/ProjectRoutes');

// require('dotenv').config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', sessionRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on post ${port}`));

module.exports = app;
