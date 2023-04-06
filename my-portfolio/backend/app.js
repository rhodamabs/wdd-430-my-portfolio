const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const projectRoutes = require('./routes/projects');

const app = express();

mongoose.connect('mongodb+srv://Rhoda:rhodamabs@cluster0.qf7stsd.mongodb.net/my-portfolio?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the Database')
  })
  .catch(()=> {
    console.log('Something went wrong down here!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/projects', projectRoutes);
module.exports = app;
