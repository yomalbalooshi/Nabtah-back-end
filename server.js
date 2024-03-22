var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
require('dotenv').config()
require('./config/database')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const produceRouter = require('./routes/produce')
const orderRouter = require('./routes/order')
const orderItemRouter = require('./routes/orderItem')
const serviceRouter = require('./routes/service')
const toolRouter = require('./routes/tool')
const plantRouter = require('./routes/plant')
const packageRouter = require('./routes/package')
const vendorRouter = require('./routes/vendor')
const customerRouter = require('./routes/customer')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/customer', customerRouter)
app.use('/users', usersRouter)
app.use('/produce', produceRouter)
app.use('/order', orderRouter)
app.use('/orderItem', orderItemRouter)
app.use('/service', serviceRouter)
app.use('/tool', toolRouter)
app.use('/plant', plantRouter)
app.use('/package', packageRouter)
app.use('/vendor', vendorRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
