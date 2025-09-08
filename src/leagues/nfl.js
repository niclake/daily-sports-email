require("dotenv").config();
const tools = require("../utils/tools");
const styling = require("../utils/styling");
const naming = require("../utils/naming");
const mailer = require("../utils/mailer");
const fetch = require("node-fetch");

async function fetchNFLData() {
  const sportsDataKey = process.env.SPORTS_DATA_KEY;
  const timeframeRequest = await fetch(
    `https://api.sportsdata.io/v3/nfl/scores/json/Timeframes/current?key=${sportsDataKey}`
  );
  const timeframeData = await timeframeRequest.json();
  const apiSeason = timeframeData[0].ApiSeason;
  const apiWeek = timeframeData[0].ApiWeek;
  // break here if there's no week data
  if (!apiWeek || !apiSeason) return;

  const [weeklyScheduleRes, dailyScheduleRes, standingsRes] = await Promise.all(
    [
      fetch(
        `https://api.sportsdata.io/v3/nfl/scores/json/ScoresBasicFinal/${apiSeason}/${apiWeek}?key=${sportsDataKey}`
      ),
      fetch(
        `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByDateFinal/${tools.theDate()}?key=${sportsDataKey}`
      ),
      fetch(
        `https://api.sportsdata.io/v3/nfl/scores/json/Standings/${apiSeason}?key=${sportsDataKey}`
      ),
    ]
  );
  const weeklyScheduleData = await weeklyScheduleRes.json();
  const dailyScheduleData = await dailyScheduleRes.json();
  const standingsData = await standingsRes.json();
  return {
    weeklyScheduleData,
    dailyScheduleData,
    standingsData,
    apiSeason,
    apiWeek,
  };
}

function buildTeamClasses(standings) {
  const teamClasses = {};
  for (const team of standings) {
    teamClasses[team.Name] =
      tools.teamConfig("nfl", team.Name) == "true"
        ? tools.teamClass(team.Team)
        : "";
  }
  return teamClasses;
}

function formatStandings(standingsData) {
  let standings = [];
  for (const team of standingsData) {
    standings.push({
      teamName: team.Name,
      teamAbbr: team.Team,
      teamID: team.GlobalTeamID,
      wins: team.Wins,
      losses: team.Losses,
      ties: team.Ties,
      streak:
        team.Streak.toString().substring(0, 1) === "-"
          ? `L${team.Streak.toString().split("-")[1]}`
          : `W${team.Streak}`,
      divWins: team.DivisionWins,
      divLosses: team.DivisionLosses,
      divTies: team.DivisionTies,
      conference: team.Conference,
      division: team.Division,
      confRank: team.ConferenceRank,
      divRank: team.DivisionRank,
    });
  }
  return standings;
}

function renderSchedule(
  games,
  standings,
  apiSeason,
  apiWeek,
  dayOfWeek,
  teamClasses
) {
  let html = `
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      ${styling.emailStyles("nfl")}
    </head>
    <h1>Schedule</h1>
    <h2><a href="https://506sports.com/nfl.php?yr=${apiSeason
      .toString()
      .substring(0, 4)}&wk=${apiWeek}">506Sports Coverage Map</a></h2>
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
    const awayInfo = naming.nflNames(awayAbbr);
    const aTeamStandings = standings.find(
      (team) => team.teamName === awayInfo["full"]
    );
    const aTeamClass = teamClasses[awayInfo["full"]];
    const aTeamWL =
      aTeamStandings === undefined
        ? "-"
        : `${aTeamStandings["wins"]}-${aTeamStandings["losses"]}${
            aTeamStandings["ties"] > 0 ? `-${aTeamStandings["ties"]}` : ""
          }`;

    const homeAbbr = game.HomeTeam;
    const homeInfo = naming.nflNames(homeAbbr);
    const hTeamStandings = standings.find(
      (team) => team.teamName === homeInfo["full"]
    );
    const hTeamClass = teamClasses[homeInfo["full"]];
    const hTeamWL =
      hTeamStandings === undefined
        ? "-"
        : `${hTeamStandings["wins"]}-${hTeamStandings["losses"]}${
            hTeamStandings["ties"] > 0 ? `-${hTeamStandings["ties"]}` : ""
          }`;

    const utcDateTime = `${game.DateTimeUTC}Z`;
    const gameTime = tools.theTime(utcDateTime);
    const channel = game.Channel === undefined ? "" : game.Channel;

    if (dayOfWeek == 3) {
      if (dayNames[new Date(game.DateTime).getDay()] != gameDay) {
        gameDay = dayNames[new Date(game.DateTime).getDay()];
        html += `
          <tr>
            <th colspan="4" style="padding: 0.5rem;">${gameDay}</th>
          </tr>`;
      }
    }

    html += `
      <tr>
        <td rowspan="2">${gameTime}<br />${channel}</td>
        <td><span class="pill ${aTeamClass}"><strong>${awayInfo["full"]}</strong></span></td>
        <td>${aTeamWL}</td>
      </tr>
      <tr>
        <td><span class="pill ${hTeamClass}"><strong>${homeInfo["full"]}</strong></span></td>
        <td>${hTeamWL}</td>
      </tr>
      <tr><th colspan="4">&nbsp;</th></tr>`;
  }
  html += `</table>`;
  return html;
}

function renderStandings(standings, apiWeek, teamClasses) {
  var conference,
    division = "";
  let html = `
    <h1>Standings</h1>
    <table>
  `;
  for (const team of standings) {
    if (team.division !== division) {
      conference = team.conference;
      division = team.division;
      html += `
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

    const rank =
      apiWeek >= 4 && team.confRank <= 7 ? ` (${team.confRank})` : "";
    const teamName = team.teamName;
    const teamAbbr = team.teamAbbr;
    const winLoss = `${team.wins}-${team.losses}${
      team.ties > 0 ? `-${team.ties}` : ""
    }`;
    const divWinLoss = `${team.divWins}-${team.divLosses}${
      team.divTies > 0 ? `-${team.divTies}` : ""
    }`;
    const streak = team.streak;

    html += `
      <tr>
        <td><span class="pill ${teamClasses[teamName]}"><strong>${teamName}</strong></span>${rank}</td>
        <td style="text-align: center">${winLoss}</td>
        <td style="text-align: center">${divWinLoss}</td>
        <td style="text-align: center">${streak}</td>
      </tr>`;
  }
  html += `</table>`;
  return html;
}

async function sendEmail() {
  try {
    console.log("Running NFL Schedule");

    let dayOfWeek = tools.theDate(false, false, "nflDay");
    if (dayOfWeek == 2) {
      console.log("Not sending NFL email on Tuesdays");
      return;
    }

    const {
      weeklyScheduleData,
      dailyScheduleData,
      standingsData,
      apiSeason,
      apiWeek,
    } = await fetchNFLData();
    const games =
      dayOfWeek == 3 ? weeklyScheduleData ?? [] : dailyScheduleData ?? [];
    // Don't send the NFL email if there are no games scheduled
    if (!games.length) {
      console.log("Not sending NFL email - no games");
      return;
    }

    const subject =
      dayOfWeek == 3
        ? `NFL Schedule & Standings for Week ${apiWeek}`
        : `NFL Schedule & Standings for ${tools.theDate(true)}`;
    const teamClasses = buildTeamClasses(standingsData);
    const formattedStandings = formatStandings(standingsData);
    const scheduleHtml = renderSchedule(
      games,
      formattedStandings,
      apiSeason,
      apiWeek,
      dayOfWeek,
      teamClasses
    );
    const standingsHtml = renderStandings(
      formattedStandings,
      apiWeek,
      teamClasses
    );
    const bodyText = scheduleHtml + `<br/><hr/>` + standingsHtml;

    await mailer.sendEmail(subject, bodyText);

    console.log("NFL email sent");
  } catch (error) {
    console.error("Error sending NFL email:", error);
  }
}

module.exports = {
  sendEmail,
};

// For testing purposes only
//
// sendEmail();
