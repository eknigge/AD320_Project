'use strict';

const express = require('express');
const LOCAL_PORT = 8000;
const vendorMenu = require('./routes/vendorMenu');
const cors = require('cors');

const app = express();
app.use(cors());
<<<<<<< HEAD
=======
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log('Server is running...');
>>>>>>> 2a5a459d62d116cef4ef0fdca72b39b5e3a55e84

app.use('/vendor/menu', vendorMenu);

const PORT = process.env.PORT || LOCAL_PORT;
app.listen(PORT);
