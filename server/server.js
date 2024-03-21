const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/mongoDB.js');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
// const { environment } = require('./config');
const helmet = require('helmet');
const path = require('path');
dotenv.config();
require('express-async-errors');

const port = process.env.PORT || 5001;
const whitelist = ['http://localhost:5173', 'https://mern-auth.cthang.dev'];

connectDB();

const app = express();
// const isProduction = environment === 'production';
app.use(morgan('dev'));

app.use(cors({ origin: whitelist, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API Running');
});

if (process.env.NODE_ENV === 'production') {
  const dirname = path.resolve();
  app.use(express.static(path.join(dirname, 'client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, 'client', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('API running'));
}

// app.get('/api/csrf/restore', (req, res) => {
//   const csrfToken = req.csrfToken();
//   res.cookie('XSRF-TOKEN', csrfToken);
//   res.status(200).json({
//     'XSRF-Token': csrfToken,
//   });
// });

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
