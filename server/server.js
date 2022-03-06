const express = require('express');
const cors = require('cors');

const app = express();

var corOptions = {
  origin: 'https://localhost:8081',
};

// middleware
app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers
const bookmarkRouter = require('./routes/bookmarkRouter.js');
const userRouter = require('./routes/userRouter');

app.use('/api/bookmarks', bookmarkRouter);
app.use('/api/users', userRouter);

// testing api

app.get('/', (req, res) => {
  res.json({ message: 'Hello Fullstack Developer' });
});

// port

const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});
