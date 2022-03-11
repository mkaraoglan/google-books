const bookSearchService = require('../services/bookSearchService');

const bookSearch = async (req, res) => {
  const bookInfo = req.body;
  const resp = await bookSearchService.bookSearch(bookInfo);
  res.status(200).send(resp);
};

module.exports = {
  bookSearch,
};
