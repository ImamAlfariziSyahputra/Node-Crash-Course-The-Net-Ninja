const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://mamlzy:mamlzy1421@nodetuts.iivtu.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// View Engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('tiny'));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a New Blog' });
})

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: '404 Not Found' });
})