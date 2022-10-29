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

// const session = express.session({
//   store: new Session({
//     url: 'localhost:5000',
//     maxAge:30000
//   }),
//   secret: 'superSecrete'
// });

// app.use(session);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', sessionRoutes);

app.use('/api/admin', require('./routes/ProjectRoutes'));
app.use('/api/player', require('./routes/ProjectRoutes'));


app.use(errorHandler);

app.listen(port, () => console.log(`server started on post ${port}`));

module.exports = app;
