const db = require('../models');

// create main model
const Bookmark = db.bookmarks;

const addBookmark = async (book) => {
  let bookmarkObject = {
    bookId: book.bookId,
    title: book.title || '',
    description: book.description || '',
    imageLinks: book.imageLinks ? book.imageLinks : '',
  };
  //check bookmark is allready exist
  let chekcBook = await Bookmark.findOne({
    where: { bookId: book.id },
  }).then((result) => {
    return result;
  });
  // prevent double add
  if (chekcBook) return 'Book is  exist';
  const bookmark = await Bookmark.create(bookmarkObject);
  return bookmark;
};

const getAllBookmarks = async () => {
  let bookmarks = await Bookmark.findAll({});

  let resp = {
    items: bookmarks || [],
    totalItems: bookmarks.length,
  };

  for (let item of bookmarks) {
    item.dataValues['bookmarked'] = true;
  }

  return resp;
};

const deleteBookmark = async (book) => {
  try {
    await Bookmark.destroy({
      where: { bookId: book.bookId },
    });
    return `${book.bookId} item deleted`;
  } catch (err) {
    return err;
  }
};
module.exports = { addBookmark, getAllBookmarks, deleteBookmark };
