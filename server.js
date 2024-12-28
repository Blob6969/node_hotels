const express = require('express');
const app = express();
const db = require('./db');

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

app.listen(3000, () => {
    console.log ('Listening on port 3000');
})