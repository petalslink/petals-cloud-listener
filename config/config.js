
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      from: 'hello@petalslink.org',
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    port: process.env.PORT || 3000,
    host: process.env.HOSTNAME || 'localhost',
    db: 'mongodb://localhost/petalscloudlistener_dev',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Petals Cloud'
    }
  },
  test: {
    port: process.env.PORT || 3000,
    host: process.env.HOSTNAME || 'localhost',
    db: 'mongodb://localhost/petalscloudlistener_test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Petals Cloud.test'
    }
  },
  production: {
    // TODO
  }
}
