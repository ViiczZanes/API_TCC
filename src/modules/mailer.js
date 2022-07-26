const path = require('path'),
      nodemailer = require('nodemailer'),
      hbs = require('nodemailer-express-handlebars');
      mailConfig = require('../config/mail')



const transport = nodemailer.createTransport(mailConfig);


transport.use('compile', hbs({
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./src/resources/mail/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/resources/mail/'),
      extName: '.handlebars'
}));



module.exports = transport;