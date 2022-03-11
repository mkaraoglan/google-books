const bookmarkController = require('../controllers/bookmarkController');

const router = require('express').Router();

router.post('/addBookmark', bookmarkController.addBookmark);

router.get('/allBookmarks', bookmarkController.getAllBookmarks);

router.get('/', bookmarkController.getBookmark);

router.put('/', bookmarkController.updateBookmark);

router.delete('/', bookmarkController.deleteBookmark);

module.exports = router;
