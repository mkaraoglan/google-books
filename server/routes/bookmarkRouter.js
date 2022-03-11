const bookmarkController = require('../controllers/bookmarkController');

const router = require('express').Router();

router.post('/addBookmark', bookmarkController.addBookmark);

router.get('/allBookmarks', bookmarkController.getAllBookmarks);

router.delete('/', bookmarkController.deleteBookmark);

module.exports = router;
