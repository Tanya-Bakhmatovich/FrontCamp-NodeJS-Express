const express = require('express');
const router = express.Router();
const logger = require('./logger');

router.use((req, resp, next) => {
    logger.info(`path: ${req.url}; date: ${(new Date().toLocaleString())}`);
    next();
});

router.get('/blogs', (req, resp) => {
    console.log('Reading blogs');
    resp.end();
});

router.get('/blogs/id', (req, resp) => {
    console.log('Reading blog with id = ' + req.params.id);
    resp.end();
});

router.post('/blogs', (req, resp) => {
    console.log('Creating new blog');
    resp.end();
});

router.put('/blogs/id', (req, resp) => {
    console.log('Updating blog with id = ' + req.params.id);
    resp.end();
});

router.delete('/blogs/id', (req, resp) => {
    console.log('Deleting blog with id ' + req.params.id);
    resp.end();
});

module.exports = router;
