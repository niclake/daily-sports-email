require('dotenv').config();
var config = require('./config');

(async function run() {
  console.log("Running appropriate emails.");
  var mlb = config.send_email.mlb === "true" ? require('./mlb') : '';
  var nba = config.send_email.nba === "true" ? require('./nba') : '';
})();