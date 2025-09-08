import 'dotenv/config';
import tools from '../utils/tools.js';
import styling from '../utils/styling.js';
import naming from '../utils/naming.js';
import mailer from '../utils/mailer.js';
import fetch from 'node-fetch';

async function fetchNBAData() {
  let sportsDataKey = process.env.SPORTS_DATA_KEY;

  const [scheduleRequest, standingsRequest] = await Promise.all([
    fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/GamesByDateFinal/${tools.theDate()}?key=${sportsDataKey}`
    ),
    fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/Standings/${tools.theDate(
        false,
        false,
        'nba'
      )}?key=${sportsDataKey}`
    ),
  ]);

  const scheduleData = await scheduleRequest.json();
  const standingsData = await standingsRequest.json();

  return { scheduleData, standingsData };
}

function buildTeamClasses(standings) {
  let teamClasses = {};
  for (const team of standings) {
    const teamName = `${team.City} ${team.Name}`;
    teamClasses[teamName] =
      tools.teamConfig('nba', teamName) == 'true'
        ? tools.teamClass(team.Key)
        : '';
  }
  return teamClasses;
}

function formatStandings(standingsData) {
  let standings = [];
  for (const team of standingsData) {
    standings.push({
      teamName: `${team.City} ${team.Name}`,
      teamCity: team.City,
      teamName: team.Name,
      teamAbbr: team.Key,
      teamID: team.TeamID,
      wins: team.Wins,
      losses: team.Losses,
      pct: team.Percentage.toFixed(3),
      streak: team.StreakDescription,
      gamesBack: team.GamesBack === 0 ? '-' : team.GamesBack,
      conference: team.Conference,
      division: team.Division,
      confRank: team.ConferenceRank,
      divRank: team.DivisionRank,
    });
  }
  return standings;
}

function renderSchedule(games, standings, teamClasses) {
  let html = `
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      ${styling.emailStyles('nba')}
    </head>
    <h1>Schedule</h1>
    <table>
    <tr>
      <th style="padding: 0.5rem;">Time</th>
      <th style="padding: 0.5rem; text-align: left;">Team</th>
      <th style="padding: 0.5rem; text-align: left;">W-L</th>
    </tr>`;

  for (const game of games.sort((a, b) =>
    a.DateTime.localeCompare(b.DateTime)
  )) {
    const awayAbbr = game.AwayTeam;
    const awayInfo = naming.nbaNames(awayAbbr);
    const aTeamStandings = standings.find((team) => team.teamAbbr === awayAbbr);
    const aTeamClass = teamClasses[awayInfo['full']] || '';

    const homeAbbr = game.HomeTeam;
    const homeInfo = naming.nbaNames(homeAbbr);
    const hTeamStandings = standings.find((team) => team.teamAbbr === homeAbbr);
    const hTeamClass = teamClasses[homeInfo['full']] || '';

    const utcDateTime = `${game.DateTimeUTC}Z`;
    const gameTime = tools.theTime(utcDateTime);
    const IST = game.InseasonTournament ? ` (NBA Cup)` : '';

    gameContent = `
      <tr>
        <td rowspan="2">${gameTime}${IST}</td>
        <td><span class="pill ${aTeamClass}"><strong>${awayInfo['full']}</strong></span></td>
        <td>${aTeamStandings['wins']}-${aTeamStandings['losses']}</td>
      </tr>
      <tr>
        <td><span class="pill ${hTeamClass}"><strong>${homeInfo['full']}</strong></span></td>
        <td>${hTeamStandings['wins']}-${hTeamStandings['losses']}</td>
      </tr>
      <tr><th colspan="4">&nbsp;</th></tr>`;

    html += gameContent;
  }

  html += `</table>`;
  return html;
}

function renderStandings(standings, teamClasses) {
  var conference,
    division = '';
  let html = `
  <h1>Standings</h1>
    <table>
  `;

  const eastStandings = standings
    .filter((team) => team.conference === 'Eastern')
    .sort((a, b) => a.confRank - b.confRank);
  const westStandings = standings
    .filter((team) => team.conference === 'Western')
    .sort((a, b) => a.confRank - b.confRank);
  const theStandings = eastStandings.concat(westStandings);

  for (const team of theStandings) {
    if (team.conference !== conference) {
      conference = team.conference;
      html += `
      <tr>
        <th style="padding: 0.5rem;" colspan="6">${conference}</th>
      </tr>
      <tr>
        <th style="padding: 0.5rem;">Conf Rank</th>
        <th style="padding: 0.5rem;">Team</th>
        <th style="padding: 0.5rem;">W-L</th>
        <th style="padding: 0.5rem;">PCT</th>
        <th style="padding: 0.5rem;">Streak</th>
        <th style="padding: 0.5rem;">GB</th>
      </tr>`;
    }

    const rank = team.confRank;
    const teamName = `${team.teamCity} ${team.teamName}`;
    const teamClass = teamClasses[teamName];
    const winLoss = `${team.wins}-${team.losses}`;
    const pct = team.pct;
    const streak = team.streak;
    const gamesBack = team.gamesBack;

    html += `
      <tr>
        <td style="padding: 0.5rem;">${rank}</td>
        <td><span class="pill ${teamClass}"><strong>${teamName}</strong></span></td>
        <td style="text-align: center">${winLoss}</td>
        <td style="text-align: center">${pct}</td>
        <td style="text-align: center">${streak}</td>
        <td style="text-align: center">${gamesBack}</td>
      </tr>`;
  }

  html += `</table>`;
  return html;
}

async function sendEmail() {
  try {
    console.log('Running NBA Schedule');
    const { scheduleData, standingsData } = await fetchNBAData();
    const games = scheduleData ?? [];
    if (!games.length) {
      console.log('Not sending NBA email - no games');
      return;
    }

    const subject = `NBA Schedule & Standings for ${tools.theDate(true)}`;
    const teamClasses = buildTeamClasses(standingsData);
    const formattedStandings = formatStandings(standingsData);
    const scheduleHtml = renderSchedule(games, formattedStandings, teamClasses);
    const standingsHtml = renderStandings(formattedStandings, teamClasses);
    const bodyText = scheduleHtml + `<br/><hr/>` + standingsHtml;

    await mailer.sendEmail(subject, bodyText);

    console.log('NBA email sent');
  } catch (error) {
    console.error('Error sending NBA email:', error);
  }
}

export default {
  sendEmail,
};

// For testing purposes only
//
// sendEmail();
