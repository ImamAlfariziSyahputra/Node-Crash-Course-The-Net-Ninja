const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Lazy finds eggs', snippet: 'lorem ipsum dolor sit amet consectetur'},
    {title: 'Gero finds stars', snippet: 'lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat thanos', snippet: 'lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a New Blog' });
})

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: '404 Not Found' });
})