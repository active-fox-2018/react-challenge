var express = require('express');
var router = express.Router();

const { createManga } = require('../controllers/manga')

/* GET users listing. */
router.post('/', createManga);

module.exports = router;
