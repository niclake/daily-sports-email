
import 'dotenv/config';
import config from './config.js';
import mlb from './leagues/mlb.js';
import nba from './leagues/nba.js';
import nfl from './leagues/nfl.js';

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
