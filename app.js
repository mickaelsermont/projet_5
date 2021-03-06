const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const cameraRoutes = require('./routes/camera');
const teddyRoutes = require('./routes/teddy');
const furnitureRoutes = require('./routes/furniture');

const app = express();

mongoose.connect(
  'mongodb+srv://will:nAcmfCoHGDgzrCHG@cluster0-pme76.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());

app.use('/api/cameras', cameraRoutes);
app.use('/api/teddies', teddyRoutes);
app.use('/api/furniture', furnitureRoutes);

// For static files (css, js)
app.use("/static", express.static('./public/static/'));

// Add routes for to display html files
app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/products/',function(req,res) {
  res.sendFile(path.join(__dirname + '/public/product.html'));
});

app.get('/panier',function(req,res) {
  res.sendFile(path.join(__dirname + '/public/shoppingCart.html'));
});

app.get('/confirmation',function(req,res) {
  res.sendFile(path.join(__dirname + '/public/successOrder.html'));
});

module.exports = app;