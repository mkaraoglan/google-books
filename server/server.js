const express = require('express');
const cors = require('cors');
const { configs } = require('./config');

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
const bookSearchRouter = require('./routes/bookSearchRouter');

app.use('/api/bookmarks', bookmarkRouter);
app.use('/api/bookSearch', bookSearchRouter);

// testing api
app.get('/', (req, res) => {
  res.status(200).send('Welcome');
});

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});
