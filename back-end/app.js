'use strict';

const express = require('express');
const LOCAL_PORT = 3000;
const vendorMenu = require('./routes/vendorMenu');

const app = express();

app.use('/vendor/menu', vendorMenu);

const PORT = process.env.PORT || LOCAL_PORT;
app.listen(PORT);
