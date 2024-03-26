const nodemailer = require('nodemailer')
const create = async (req, res) => {
  require('dotenv').config()
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }

  try {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })
    console.log('process.env.MAIL_USER', process.env.MAIL_USER)
    console.log('process.env.MAIL_PASS', process.env.MAIL_PASS)
    transporter.verify((error, success) => {
      if (error) {
        console.log('error----------', error)
      } else {
        console.log('All works fine!')
      }
    })
    const messageString =
      'From: ' +
      req.body.name +
      ' Email: ' +
      req.body.email +
      ' Message: ' +
      req.body.message
    var mail = {
      from: req.body.email,
      to: 'nabtahcomp@gmail.com',
      subject: `Nabtah Contact Request from ${req.body.name}`,
      html: messageString
    }

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  } catch (err) {
    res.send(`error calling create ${err}`)
  }
}

module.exports = {
  create
}
