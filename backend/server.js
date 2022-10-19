const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
// const Session = require('connect-mongodb');

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

app.use('/api/admin', require('./routes/ProjectRoutes'));
app.use('/api/player', require('./routes/ProjectRoutes'));

//serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`server started on post ${port}`));

module.exports = app;
