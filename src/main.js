require('dotenv').config();
const config = require('./config');
const mlb = require('./leagues/mlb');
const nba = require('./leagues/nba');
const nfl = require('./leagues/nfl');

const LEAGUES = { mlb, nba, nfl };

(async function run() {
  console.log('Running appropriate emails.');
  Object.keys(LEAGUES).forEach((league) => {
    if (config.send_email[league] === 'true') {
      LEAGUES[league].sendEmail();
    }
  });
})();
