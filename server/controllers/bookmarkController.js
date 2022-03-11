const db = require('../models');

// create main model
const Bookmark = db.bookmarks;

const addBookmark = async (req, res) => {
  let bookInfo = req.body.book;
  let bookmarkObject = {
    bookId: bookInfo.bookId,
    title: bookInfo.title || '',
    description: bookInfo.description || '',
    imageLinks: bookInfo.imageLinks ? bookInfo.imageLinks : '',
  };
  //check bookmark is allready exist
  let book = await Bookmark.findOne({
    where: { bookId: req.body.book.id },
  }).then((result) => {
    return result;
  });
  // prevent double add
  if (book == null) {
    const bookmark = await Bookmark.create(bookmarkObject);
    res.status(200).send(bookmark);
  } else {
    res.status(200).send('Allready added');
  }
};

const getAllBookmarks = async (req, res) => {
  let bookmarks = await Bookmark.findAll({});

  let resp = {
    items: bookmarks || [],
    totalItems: bookmarks.length,
  };

  for (let item of bookmarks) {
    item.dataValues['bookmarked'] = true;
  }

  res.status(200).send(resp);
};

const getBookmark = async (req, res) => {
  let bookId = req.body.bookId;
  let bookmark = await Bookmark.findAll({
    where: { bookId: bookId },
  });
  if (!bookmark.length) {
    res.status(404).send();
  } else {
    res.status(200).send(bookmark);
  }
};

const updateBookmark = async (req, res) => {
  let id = req.params.id;

  const bookmark = await Bookmark.update(req.body, { where: { id: id } });

  res.status(200).send(bookmark);
};

const deleteBookmark = async (req, res) => {
  await Bookmark.destroy({
    where: { bookId: req.body.bookId },
  });

  res.status(200).send('bookmark deleted');
};

module.exports = {
  addBookmark,
  getAllBookmarks,
  getBookmark,
  updateBookmark,
  deleteBookmark,
};
