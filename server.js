const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res) {
  res.send('Welcome To Our Hotel ');
})


const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuRoutes');


app.use('/person', personRoutes);
app.use('/menuItem', MenuItemRoutes);

app.listen(PORT, () => {
    console.log ('Listening on port 3000');
})