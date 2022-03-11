const axios = require('axios');
const PAGE_SIZE = 9;
const db = require('../models');

// create main model
const Bookmark = db.bookmarks;

const bookSearch = async (req, res) => {
  let keywords = req.body.keywords;
  let author = req.body.author;
  let title = req.body.title;
  let startIndex = req.body.startIndex;

  let googleApi = `https://www.googleapis.com/books/v1/volumes?startIndex=${startIndex}&maxResults=${PAGE_SIZE}&q=`;

  let queryApi =
    googleApi + `"${keywords}"+intitle:"${title}"+inauthor:"${author}"`;

  const response = await axios.get(queryApi);

  let resp = {
    items: [],
    totalItems: response.data.totalItems,
  };
  let items = response.data.items ? response.data.items : [];

  for (let item of items) {
    let bookmark = await Bookmark.findAll({
      where: { bookId: item.id },
    });
    item['bookId'] = item.id;
    item['bookmarked'] = !!bookmark.length;
    item['description'] = item.volumeInfo.description || '';
    item['title'] = item.volumeInfo.title || '';
    item['imageLinks'] = item.volumeInfo.imageLinks
      ? item.volumeInfo.imageLinks['thumbnail']
      : '';
  }
  resp.items = items;

  res.status(200).send(resp);
};

module.exports = {
  bookSearch,
};
