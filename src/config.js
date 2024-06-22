var config = {};
config.send_email = {};
config.email_client = {};
config.user = {};

// Which emails do you want to receive?
config.send_email.mlb = "true"; // MLB
config.send_email.nba = "false"; // NBA
// Email client (if you are using Gmail you can leave)
config.email_client.host = "smtp.gmail.com";
config.email_client.port = "465";
config.email_client.secure = "true";
// Time zone & display information
config.user.time_zone = "America/Chicago";
config.user.time_hour = "0"; // "0" for "13:00", "1" for "1:00 PM"

module.exports = config;