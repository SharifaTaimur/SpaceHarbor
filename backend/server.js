const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');
const sessionRoutes = require('./routes/ProjectRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectDB();

// app.use('/api', sessionRoutes);
// app.use('/api/admin', require('./routes/ProjectRoutes'));
// app.use('/api/player', require('./routes/ProjectRoutes'));

// require routes
app.use(require('./routes/ProjectRoutes'));

// app listen
app.listen(port, () => {
  console.log(`express server is running on port: ${port}`);
});

//serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }

// app.use(errorHandler);

// app.listen(port, () => console.log(`server started on post ${port}`));

// module.exports = app;
