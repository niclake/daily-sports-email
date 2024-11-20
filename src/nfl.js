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
  console.log('Running NFL generation');

  let dayOfWeek = tools.theDate(pretty=false, showLabel=false, yearFor="nflDay");
  // Do not run the NFL email on Tuesdays
  if (dayOfWeek == 2) { return; };

  let sportsDataKeyNFL = process.env.SPORTS_DATA_KEY_NFL;
  let seasonYear = tools.theDate(pretty=false, showLabel=false, yearFor="nfl");

  const timeframeRequest = await fetch(`https://api.sportsdata.io/v3/nfl/scores/json/Timeframes/current?key=${sportsDataKeyNFL}`)
  const timeframeData = await timeframeRequest.json();
  const apiSeason = timeframeData[0].ApiSeason;
  const apiWeek = timeframeData[0].ApiWeek;
  // TODO: break here if there's no week data

  const weeklyScheduleRequest = await fetch(`https://api.sportsdata.io/v3/nfl/scores/json/ScoresBasicFinal/${apiSeason}/${apiWeek}?key=${sportsDataKeyNFL}`);
  const weeklyScheduleData = await weeklyScheduleRequest.json();
  const dailyScheduleRequest = await fetch(`https://api.sportsdata.io/v3/nfl/scores/json/ScoresByDateFinal/${tools.theDate()}?key=${sportsDataKeyNFL}`);
  // const dailyScheduleRequest = await fetch(`https://api.sportsdata.io/v3/nfl/scores/json/ScoresByDateFinal/2024-11-17?key=${sportsDataKeyNFL}`);
  const dailyScheduleData = await dailyScheduleRequest.json();
  const standingsRequest = await fetch(`https://api.sportsdata.io/v3/nfl/scores/json/Standings/${seasonYear}?key=${sportsDataKeyNFL}`);
  const standingsData = await standingsRequest.json();

  var games = [];

  // On Wednesdays, use the weekly schedule data
  if (dayOfWeek == 3) {
    const subject = `NFL Schedule & Standings for Week ${apiWeek}`;
    games = weeklyScheduleData ?? [];
  }
  // Otherwise, use the daily schedule data
  if (dayOfWeek != 3) {
    const subject = `NFL Schedule & Standings for ${tools.theDate(pretty=true)}`;
    games = dailyScheduleData ?? [];
  }
  // Don't send the NFL email if there are no games scheduled
  if (games.length === 0) return;

  let i = 0;
  let r = 0;
  let standings = [];

  // Build the standings table, because we have to reference it for the daily schedule data
  while (r < standingsData.length) {
    const team = standingsData[r];

    standings.push({
      teamName: team.Name,
      teamAbbr: team.Team,
      teamID: team.GlobalTeamID,
      wins: team.Wins,
      losses: team.Losses,
      ties: team.Ties,
      streak: (team.Streak.toString().substring(0,1) === "-") ? `L${team.Streak.toString().split('-')[1]}` : `W${team.Streak}`,
      divWins: team.DivisionWins,
      divLosses: team.DivisionLosses,
      divTies: team.DivisionTies,
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
      ${styling.emailStyles("nfl")}
    </head>
    <h1>Schedule</h1>
    <h2><a href="https://506sports.com/nfl.php?yr=${apiSeason.toString().substring(0,4)}&wk=${apiWeek}">506Sports Coverage Map</a></h2>
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
    const awayInfo = naming.nflNames(awayAbbr);
    const aTeamStandings = standings.find(team => team.teamName === awayInfo["full"]);
    const aTeamClass = tools.teamConfig("nfl", awayInfo["full"]) == "true" ? tools.teamClass(awayAbbr) : '';
    const aTeamWL = `${aTeamStandings["wins"]}-${aTeamStandings["losses"]}${aTeamStandings["ties"] > 0 ? `-${aTeamStandings["ties"]}` : ''}`;

    const homeAbbr = game.HomeTeam;
    const homeInfo = naming.nflNames(homeAbbr);
    const hTeamStandings = standings.find(team => team.teamName === homeInfo["full"]);
    const hTeamClass = tools.teamConfig("nfl", homeInfo["full"]) == "true" ? tools.teamClass(homeAbbr) : '';
    const hTeamWL = `${hTeamStandings["wins"]}-${hTeamStandings["losses"]}${hTeamStandings["ties"] > 0 ? `-${hTeamStandings["ties"]}` : ''}`;

    const utcDateTime = `${game.DateTimeUTC}Z`;
    const gameTime = tools.theTime(utcDateTime);


    gameContent = `
      <tr>
        <td rowspan="2">${gameTime}</td>
        <td><span class="pill ${aTeamClass}"><strong>${awayInfo["full"]}</strong></span></td>
        <td>${aTeamWL}</td>
      </tr>
      <tr>
        <td><span class="pill ${hTeamClass}"><strong>${homeInfo["full"]}</strong></span></td>
        <td>${hTeamWL}</td>
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

  // eastStandings = standings.filter(team => team.conference === "Eastern").sort((a, b) => a.confRank - b.confRank);
  // westStandings = standings.filter(team => team.conference === "Western").sort((a, b) => a.confRank - b.confRank);
  // theStandings = eastStandings.concat(westStandings);

  while (i < standings.length) {
    team = standings[i];
    if (team.division !== division) {
      conference = team.conference;
      division = team.division;
      currStandings += `
      <tr>
        <th style="padding: 0.5rem;" colspan="4">${conference} ${division}</th>
      </tr>
      <tr>
        <th style="padding: 0.5rem;">Team</th>
        <th style="padding: 0.5rem;">Record</th>
        <th style="padding: 0.5rem;">Div Record</th>
        <th style="padding: 0.5rem;">Streak</th>
      </tr>`;
    }

    const rank = (apiWeek >= 4 && team.confRank <= 7) ? ` (${team.confRank})` : '';
    const teamName = team.teamName;
    const teamAbbr = team.teamAbbr;
    const teamClass = tools.teamConfig("nfl", teamName) == "true" ? tools.teamClass(teamAbbr) : '';
    const winLoss = `${team.wins}-${team.losses}${team.ties > 0 ? `-${team.ties}` : ''}`;
    const divWinLoss = `${team.divWins}-${team.divLosses}${team.divTies > 0 ? `-${team.divTies}` : ''}`;
    const streak = team.streak;

    currStandings += `
      <tr>
        <td><span class="pill ${teamClass}"><strong>${teamName}</strong></span>${rank}</td>
        <td style="text-align: center">${winLoss}</td>
        <td style="text-align: center">${divWinLoss}</td>
        <td style="text-align: center">${streak}</td>
      </tr>`;
    i++;
  }

  currStandings += `</table>`;
  const bodyText = todaysGames + `<br/><hr/>` + currStandings;

  const subject = 

  await transporter.sendMail({
    from: process.env.MAIL_FROM, // sender address
    to: process.env.MAIL_TO, // list of receivers
    subject: subject,
    text: `${bodyText}`, // plain text body
    html: `${bodyText}`, // html body
  });
  
  console.log("Message sent");
})();