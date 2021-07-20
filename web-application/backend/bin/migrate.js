// bin/migrate.js

var db = require('../config/database.js');
db.sequelize.sync();
