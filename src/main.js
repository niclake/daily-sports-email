require('dotenv').config();
const config = require('./config');
const mlb = require('./leagues/mlb');
const nba = require('./leagues/nba');
const nfl = require('./leagues/nfl');

const LEAGUES = { mlb, nba, nfl };

(async function run() {
  try {
    console.log('Running appropriate emails.');
    await Promise.all(
      Object.keys(LEAGUES).map(async (league) => {
        if (config.send_email[league] === 'true') {
          try {
            await LEAGUES[league].sendEmail();
          } catch (err) {
            console.error(`Error sending email for ${league}:`, err);
          }
        }
      })
    );
  } catch (err) {
    console.error('Unexpected error in main run:', err);
  }
})();
