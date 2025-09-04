require('dotenv').config();
const config = require('./config');
const tools = require('./tools');
const styling = require('./styling');
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

async function fetchMLBData() {
  const date = tools.theDate();
  const [scheduleRes, standingsRes] = await Promise.all([
    fetch(`http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&hydrate=probablePitcher&date=${date}`),
    fetch(`https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&hydrate=division`)
  ]);
  const scheduleData = await scheduleRes.json();
  const standingsData = await standingsRes.json();
  return { scheduleData, standingsData };
}

function buildTeamClasses(standings) {
  const teamClasses = {};
  for (const division of standings) {
    for (const teamRecord of division.teamRecords) {
      const teamName = teamRecord.team.name;
      const wildCardLeader = teamRecord.wildCardLeader;
      const wildCardGamesBack = teamRecord.wildCardGamesBack;
      const wildCardEliminationNumber = teamRecord.wildCardEliminationNumber;
      const eliminated = wildCardEliminationNumber === "E";
      const labelTrue = tools.teamConfig("mlb", teamName) == "true";
      const isSept = tools.theDate(false, true);
      const inWCChase = (wildCardGamesBack <= 5 && !eliminated) || wildCardLeader;
      const teamClass = (labelTrue || (isSept && inWCChase)) ? tools.teamClass(teamName) : "";
      teamClasses[teamName] = teamClass;
    }
  }
  return teamClasses;
}

function renderSchedule(games, teamClasses) {
  if (!games.length) return '';
  let html = `
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      ${styling.emailStyles("mlb")}
    </head>
    <h1>Schedule</h1>
    <table>
    <tr>
      <th style="padding: 0.5rem;">Time</th>
      <th style="padding: 0.5rem; text-align: left;">Team</th>
      <th style="padding: 0.5rem; text-align: left;">W-L</th>
      <th style="padding: 0.5rem; text-align: left;">Probable Starter</th>
    </tr>`;
  for (const game of games) {
    const away = game.teams.away;
    const home = game.teams.home;
    const gameTime = tools.theTime(game.gameDate);
    const isDH = game.doubleHeader === 'S';
    const gameNum = isDH ? `<br/>(game ${game.gameNumber})` : '';
    html += `
      <tr>
        <td rowspan="2">${gameTime}${gameNum}</td>
        <td><span class="pill ${teamClasses[away.team.name]}"><strong>${away.team.name}</strong></span></td>
        <td>${away.leagueRecord.wins}-${away.leagueRecord.losses}</td>
        <td>${away.probablePitcher ? away.probablePitcher.fullName : "TBD"}</td>
      </tr>
      <tr>
        <td><span class="pill ${teamClasses[home.team.name]}"><strong>${home.team.name}</strong></span></td>
        <td>${home.leagueRecord.wins}-${home.leagueRecord.losses}</td>
        <td>${home.probablePitcher ? home.probablePitcher.fullName : "TBD"}</td>
      </tr>
      <tr><th colspan="4">&nbsp;</th></tr>`;
  }
  html += `</table>`;
  return html;
}

function renderStandings(standings, teamClasses) {
  let html = `
    <h1>Standings</h1>
    <small>X = Clinched Playoffs | Y = Division Leader | Z = Division Champ</small><br />
    <small>w = Wild Card Leader | e# = Elimination Number | e = Eliminated</small><br /><br />
    <table>
  `;
  for (const division of standings) {
    html += `
      <tr style="height: 24px;">
        <th style="padding: 0.5rem;">${division.division.nameShort}</th>
        <th style="padding: 0.5rem;">W</th>
        <th style="padding: 0.5rem;">L</th>
        <th style="padding: 0.5rem;">PCT</th>
        <th style="padding: 0.5rem;">Last 10/Streak</th>
        <th style="padding: 0.5rem;">GB</th>
        <th style="padding: 0.5rem;">WCGB</th>
      </tr>
    `;
    for (const team of division.teamRecords) {
      const lTenObj = team.records.splitRecords.find(o => o.type === 'lastTen');
      const isSept = tools.theDate(false, true);
      let label = "";
      if (isSept) {
        if (team.clinched && team.divisionChamp) label = " Z";
        else if (team.clinched && team.divisionLeader) label = " Y";
        else if (team.clinched) label = " X";
        else if (team.divisionLeader) label = " C" + team.magicNumber;
        else if (team.wildCardLeader) label = " W";
        else if (team.wildCardEliminationNumber < 20) label = " e" + team.wildCardEliminationNumber;
        else if (team.wildCardEliminationNumber === "E") label = " E";
      }
      html += `
        <tr>
          <td><span class="pill ${teamClasses[team.team.name]}"><strong>${team.team.name}</strong></span><sup>${label}</sup></td>
          <td style="text-align: center">${team.leagueRecord.wins}</td>
          <td style="text-align: center">${team.leagueRecord.losses}</td>
          <td style="text-align: center">${team.leagueRecord.pct}</td>
          <td style="text-align: center">${lTenObj.wins}-${lTenObj.losses} (${team.streak.streakCode || ""})</td>
          <td style="text-align: center">${team.gamesBack}</td>
          <td style="text-align: center">${team.wildCardGamesBack}</td>
        </tr>
      `;
    }
  }
  html += `</table>`;
  return html;
}

async function sendMLBEmail() {
  console.log('Running MLB Schedule');
  const { scheduleData, standingsData } = await fetchMLBData();
  const games = scheduleData.dates[0]?.games ?? [];
  if (!games.length) return;

  const teamClasses = buildTeamClasses(standingsData.records);
  const scheduleHtml = renderSchedule(games, teamClasses);
  const standingsHtml = renderStandings(standingsData.records, teamClasses);
  const bodyText = scheduleHtml + `<br/><hr/>` + standingsHtml;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: `MLB Schedule & Standings for ${tools.theDate(true)}`,
    text: bodyText,
    html: bodyText,
  });

  console.log("Message sent");
}

sendMLBEmail();
