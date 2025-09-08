const config = require("../config");

function nthNumber(number) {
  if (number > 3 && number < 21) return `${number}th`;
  switch (number % 10) {
    case 1:
      return `${number}st`;
    case 2:
      return `${number}nd`;
    case 3:
      return `${number}rd`;
    default:
      return `${number}th`;
  }
}

function formatDate(pretty = false, showLabel = false, yearFor = "") {
  const dateObj = new Date();
  const dayOfWeek = dateObj.getDay();
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const monthPretty = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  if (pretty) {
    return `${monthPretty} ${nthNumber(day)}, ${year}`;
  }
  if (showLabel) {
    return month >= 8;
  }
  switch (yearFor) {
    case "nba":
      return month >= 9 ? `${year + 1}` : `${year}`;
    case "nfl":
      return month <= 2 ? `${year - 1}` : `${year}`;
    case "nflDay":
      return `${dayOfWeek}`;
    case "mlb":
      return `${year}`;
    default:
      return `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}`;
  }
}

function theTime(gameDate) {
  return new Date(gameDate).toLocaleTimeString("en-US", {
    timeZone: config.user.time_zone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: !!+config.user.time_hour,
  });
}

function teamClass(teamName) {
  return teamName.replace(/\s+/g, "-").replace(/\./g, "").toLowerCase();
}

function teamConfig(sport, teamName) {
  const key = teamName.replace(/\s+/g, "_").replace(/\./g, "").toLowerCase();
  return config[sport][key];
}

function playoffChase(sport) {
  return config[sport].playoff_chase;
}

module.exports = {
  theDate: formatDate,
  theTime,
  teamClass,
  teamConfig,
  playoffChase,
};
