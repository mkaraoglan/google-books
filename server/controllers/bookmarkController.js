const bookmarkService = require('../services/bookmarkService');

const addBookmark = async (req, res) => {
  let bookInfo = req.body.book;

  const response = await bookmarkService.addBookmark(bookInfo);
  res.status(201).send(response);
};

const getAllBookmarks = async (req, res) => {
  const resp = await bookmarkService.getAllBookmarks();
  res.status(200).send(resp);
};

const deleteBookmark = async (req, res) => {
  const resp = await bookmarkService.deleteBookmark(req.body);
  res.status(200).send(resp);
};

module.exports = {
  addBookmark,
  getAllBookmarks,
  deleteBookmark,
};
