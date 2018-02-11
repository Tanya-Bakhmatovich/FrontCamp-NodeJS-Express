const Blog = require('./models/blogs');

const express = require('express');
const router = express.Router();
const logger = require('./logger');

router.use((req, resp, next) => {
    logger.info(`path: ${req.url}; date: ${(new Date().toLocaleString())}`);
    next();
});

router.get('/list', (req, resp, next) => {
    Blog.find((err, blogs) =>
      err ? next(err) : resp.json(blogs))
});

router.get('/:id', (req, resp, next) => {
  Blog.findOne({
    _id:req.params.id
  }, (err, blog) =>
      err ? next(err) : resp.json(blog))
});

router.post('/', (req, resp, next) => {
  Blog.create(req.body, (err, blogs) =>
  err ? next(err) : resp.send(blogs))
});

router.put('/:id', (req, resp, next) => {
  console.log(req);
  Blog.findOneAndUpdate({
    _id:req.params.id
  }, req.body, (err, blog) =>
  err ? next(err) : resp.send(blog))
});

router.delete('/:id', (req, resp, next) => {
  Blog.findOneAndRemove({
    _id:req.params.id
  }, (err, blog) =>
  err ? next(err) : resp.json(blog))
});

module.exports = router;
