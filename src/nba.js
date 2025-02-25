require('dotenv').config();
var config = require('./config');
var tools = require('./tools');
var styling = require('./styling');
var naming = require('./naming');
const fetch = require('node-fetch');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: config.email_client.host,
  port: config.email_client.port,
  secure: config.email_client.secure === "true",
  auth: {
    user: process.env.MAIL_USER_EMAIL,
    pass: process.env.MAIL_USER_PASSWORD,
  },
});

(async function run() {
  console.log('Running NBA generation');

  let sportsDataKeyNBA = process.env.SPORTS_DATA_KEY_NBA;
  let seasonYear = tools.theDate(pretty=false, showLabel=false, yearFor="nba");
  console.log(sportsDataKeyNBA)

  const scheduleRequest = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/GamesByDateFinal/${tools.theDate()}?key=${sportsDataKeyNBA}`);
  const scheduleData = await scheduleRequest.json();
  const standingsRequest = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/Standings/${seasonYear}?key=${sportsDataKeyNBA}`);
  const standingsData = await standingsRequest.json();

  let games = scheduleData ?? [];
  // Don't send the NBA email if there are no games scheduled
  if (games.length === 0) return;

  let i = 0;
  let r = 0;
  let standings = [];

  // Build the standings table, because we have to reference it for the daily schedule data
  while (r < standingsData.length) {
    const team = standingsData[r];

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
      gamesBack: (team.GamesBack === 0) ? "-" : team.GamesBack,
      conference: team.Conference,
      division: team.Division,
      confRank: team.ConferenceRank,
      divRank: team.DivisionRank
    });
    r++;
  }

  var todaysGames = `
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      ${styling.emailStyles("nba")}
    </head>
    <h1>Schedule</h1>
    <table>
    <tr>
      <th style="padding: 0.5rem;">Time</th>
      <th style="padding: 0.5rem; text-align: left;">Team</th>
      <th style="padding: 0.5rem; text-align: left;">W-L</th>
    </tr>`;

  games = games.sort((a, b) => a.DateTime.localeCompare(b.DateTime));
    
  while (i < games.length) {
    game = games[i];

    const awayAbbr = game.AwayTeam;
    const awayInfo = naming.nbaNames(awayAbbr);
    const aTeamStandings = standings.find(team => team.teamAbbr === awayAbbr);
    const aTeamClass = tools.teamConfig("nba", awayInfo["full"]) == "true" ? tools.teamClass(awayAbbr) : '';

    const homeAbbr = game.HomeTeam;
    const homeInfo = naming.nbaNames(homeAbbr);
    const hTeamStandings = standings.find(team => team.teamAbbr === homeAbbr);
    const hTeamClass = tools.teamConfig("nba", homeInfo["full"]) == "true" ? tools.teamClass(homeAbbr) : '';
    
    const utcDateTime = `${game.DateTimeUTC}Z`;
    const gameTime = tools.theTime(utcDateTime);
    const IST = game.InseasonTournament ? ` (NBA Cup)` : '';

    gameContent = `
      <tr>
        <td rowspan="2">${gameTime}${IST}</td>
        <td><span class="pill ${aTeamClass}"><strong>${awayInfo["full"]}</strong></span></td>
        <td>${aTeamStandings["wins"]}-${aTeamStandings["losses"]}</td>
      </tr>
      <tr>
        <td><span class="pill ${hTeamClass}"><strong>${homeInfo["full"]}</strong></span></td>
        <td>${hTeamStandings["wins"]}-${hTeamStandings["losses"]}</td>
      </tr>
      <tr><th colspan="4">&nbsp;</th></tr>`;
    
    todaysGames += gameContent;
    i++;
  };

  todaysGames += `</table>`;

  i = 0;
  var conference = '';
  var division = '';

  var currStandings = `
  <h1>Standings</h1>
    <table>
  `

  eastStandings = standings.filter(team => team.conference === "Eastern").sort((a, b) => a.confRank - b.confRank);
  westStandings = standings.filter(team => team.conference === "Western").sort((a, b) => a.confRank - b.confRank);
  theStandings = eastStandings.concat(westStandings);

  while (i < theStandings.length) {
    team = theStandings[i];
    if (team.conference !== conference) {
      conference = team.conference;
      currStandings += `
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
    const teamClass = tools.teamConfig("nba", teamName) == "true" ? tools.teamClass(team.teamAbbr) : '';
    const winLoss = `${team.wins}-${team.losses}`;
    const pct = team.pct;
    const streak = team.streak;
    const gamesBack = team.gamesBack;

    currStandings += `
      <tr>
        <td style="padding: 0.5rem;">${rank}</td>
        <td><span class="pill ${teamClass}"><strong>${teamName}</strong></span></td>
        <td style="text-align: center">${winLoss}</td>
        <td style="text-align: center">${pct}</td>
        <td style="text-align: center">${streak}</td>
        <td style="text-align: center">${gamesBack}</td>
      </tr>`;
    i++;
  }

  currStandings += `</table>`;
  const bodyText = todaysGames + `<br/><hr/>` + currStandings;
  // console.log(bodyText);
  // return;

  await transporter.sendMail({
    from: process.env.MAIL_FROM, // sender address
    to: process.env.MAIL_TO, // list of receivers
    subject: `NBA Schedule & Standings for ${tools.theDate(pretty=true)}`,
    text: `${bodyText}`, // plain text body
    html: `${bodyText}`, // html body
  });
  
  console.log("Message sent");
})();