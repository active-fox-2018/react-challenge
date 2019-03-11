var express = require('express');
var router = express.Router();

const { createUserManga, getAllUserManga, getOneManga, deleteUserManga } = require('../controllers/manga')
const { checkUniqueManga } = require('../middlewares/checkUniqueManga')
/* GET users listing. */
router.post('/', checkUniqueManga, createUserManga)
router.get('/', getAllUserManga)
router.get('/:id', getOneManga)
router.delete('/:id', deleteUserManga)

module.exports = router;
