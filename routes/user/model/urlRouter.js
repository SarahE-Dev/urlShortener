const express = require('express');
const router = express();
const {findShortURL, makeShortURL} = require('../../controller/urlController')

router.post('/shorturl', makeShortURL)

router.get('/shorturl/:short_url?', findShortURL)



module.exports = router