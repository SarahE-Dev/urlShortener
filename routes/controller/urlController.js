const mongoose = require('mongoose');
const littleid = require('littleid')

const URL = require('../user/model/Url');

function isUrlValid(str) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );
    return pattern.test(str);
   }


async function makeShortURL(req, res){
    const url = req.body.url_input
    const short = littleid()
    if(!isUrlValid(url)){
        res.status(401).json({
            "error": "invalid URL"
        })
    }else{
        try {
            let foundOne = await URL.findOne({original_url: url})
            if(foundOne){
                res.json({
                    "original_url": foundOne.original_url,
                    "short_url": foundOne.short_url
                    
                })
            }else{
                let newURL = new URL({
                    original_url: url,
                    short_url: short
                })
                await newURL.save()
                res.json({"original_url": newURL.original_url, "short_url": newURL.short_url})
            }
        } catch (error) {
            res.status(500).json({"message": "error", "error": error})
        }
    }
}

async function findShortURL(req, res){
    try {
        const foundShort = await URL.findOne({
            short_url: req.params.short_url
        })
        if(foundShort){
            res.redirect(foundShort.original_url)
        }else{
            res.status(404).json('No URL found')
        }
    } catch (error) {
        res.status(500).json({"message": 'error', "error": error})
    }
}

module.exports = {makeShortURL, findShortURL}