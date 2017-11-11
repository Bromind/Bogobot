var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db/user.db', autoload: true });
db.persistence.setAutocompactionInterval(5000)

module.exports = db