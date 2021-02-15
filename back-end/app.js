'use strict';

const express = require('express');
const LOCAL_PORT = 8000;
const vendorMenu = require('./routes/vendorMenu');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/vendor/menu', vendorMenu);

const PORT = process.env.PORT || LOCAL_PORT;
app.listen(PORT);
