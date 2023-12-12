const express = require('express');
const router = express();
const {findShortURL, makeShortURL} = require('../../controller/urlController')

router.post('/new', makeShortURL)

router.get('/:short_url', findShortURL)



module.exports = router