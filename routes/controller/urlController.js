const mongoose = require('mongoose');
const littleid = require('littleid')


const URL = require('../user/model/Url')

const validUrl = require('valid-url');


async function makeShortURL(req, res){
    const url = req.body.url_input
    const short = littleid()
    if(!validUrl.isWebUri(url)){
        res.status(401).json({
            "error": "invalid URL"
        })
    }else{
        try {
            let foundOne = await URL.findOne({originalUrl: url})
            if(foundOne){
                res.json({
                    "original_url": foundOne.originalUrl,
                    "short_url": foundOne.shortUrl
                })
            }else{
                foundOne = new URL({
                    originalUrl: url,
                    shortUrl: short
                })
                await foundOne.save()
                res.json({"original_url": foundOne.originalUrl, "short_url": foundOne.shortUrl})
            }
        } catch (error) {
            res.status(500).json({"message": "error", "error": error})
        }
    }
}

async function findShortURL(req, res){
    try {
        const foundShort = await URL.findOne({
            shortUrl: req.params.short_url
        })
        if(foundShort){
            res.redirect(foundShort.originalUrl)
        }else{
            res.status(404).json('No URL found')
        }
    } catch (error) {
        res.status(500).json({"message": 'error', "error": error})
    }
}

module.exports = {makeShortURL, findShortURL}