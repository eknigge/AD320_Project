'use strict';

const express = require('express');
const LOCAL_PORT = 8000;
const vendorMenu = require('./routes/vendorMenu');
const vendorMain = require('./routes/vendorMain');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log('Server is running...');

app.use('/vendor/menu', vendorMenu);
app.use('/vendor', vendorMain);

const PORT = process.env.PORT || LOCAL_PORT;
app.listen(PORT);
