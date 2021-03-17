const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// routes
const indexRouter = require('./routes/index');
const vendorMenu = require('./routes/vendorMenu');
const vendorMain = require('./routes/vendorMain');
const vendorOrders = require('./routes/vendorOrders');
const customerRouter = require('./routes/customerMenu');
const customerMap = require('./routes/customerMap');
const adminCarts = require('./routes/adminCarts');
const adminUsers = require('./routes/adminUsers');
const adminLogs = require('./routes/adminLogs');
const adminMenu = require('./routes/adminMenu');

const app = express();

//CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customer/map', customerMap);
app.use('/customer', customerRouter);
app.use('/vendor/orders', vendorOrders);
app.use('/vendor/orders/complete/5', vendorOrders);
app.use('/vendor/menu', vendorMenu);
app.use('/vendor', vendorMain);
app.use('/admin/carts', adminCarts);
app.use('/admin/users', adminUsers);
app.use('/admin/logs', adminLogs);
app.use('/admin/menu', adminMenu);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
