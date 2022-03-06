const bookmarkController = require('../controllers/bookmarkController');

const router = require('express').Router();

router.post('/addBookmark', bookmarkController.addBookmark);

router.get('/allBookmarks', bookmarkController.getAllBookmarks);

router.get('/:id', bookmarkController.getBookmark);

router.put('/:id', bookmarkController.updateBookmark);

router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;
