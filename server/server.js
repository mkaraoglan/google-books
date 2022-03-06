const express = require('express');
const cors = require('cors');

const app = express();

var corOptions = {
  origin: 'https://localhost:3000',
};

// middleware
app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// testing api

app.get('/api', (req, res) => {
  res.json({ message: 'Hello Fullstack Developer' });
});

// port

const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});
