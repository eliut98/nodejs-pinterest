const { Router } = require('express');
const router = Router();
const path = require('path');

const Image = require('../models/Image'); 

const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('home', { images });
    // res.json(images);
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.get('/image/:id', (req, res) => {
    res.send('Image');
});

router.post('/upload', async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename.replace(path.extname(req.file.filename), "");
    image.extname = path.extname(req.file.filename);
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    imagemin([`${req.file.destination}/${req.file.filename}`], `${req.file.destination}`, {
        use: [
            imageminWebp({quality: 50})
        ]
    }).then(() => {
        console.log('Images optimized');
    });
    await image.save();
    res.redirect('/');
});

router.delete('/image/:id', (req, res) => {
    res.send('Deleted');
});

module.exports = router;