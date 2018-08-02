const api = require('./routes/api.js')
const bodyParser = require('body-parser')

module.exports = app => {
  app.use(bodyParser.json())
  
  app.use('/api',api)
}
