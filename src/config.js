//       DO NOT TOUCH      //
var config = {};
config.send_email = {};
config.email_client = {};
config.user = {};
config.mlb = {};
/////////////////////////////

// USER CONFIGURATION HERE //
// Which emails do you want to receive?
config.send_email.mlb = "true"; // MLB
config.send_email.nba = "false"; // NBA
config.send_email.nfl = "false"; // NFL
// Email client
// Defaults are for Gmail
config.email_client.host = "smtp.gmail.com";
config.email_client.port = "465";
config.email_client.secure = "true"; // use 'true' for port 465, 'false' for all other
// Time zone & display information
config.user.time_zone = "America/Chicago"; // Use https://timezonedb.com/time-zones to find your time zone 
config.user.time_hour = "0"; // "0" for "13:00", "1" for "1:00 PM"
// MLB team highlights
config.mlb.arizona_diamondbacks  = "false";
config.mlb.atlanta_braves        = "true";
config.mlb.baltimore_orioles     = "true";
config.mlb.boston_red_sox        = "true";
config.mlb.chicago_cubs          = "false";
config.mlb.chicago_white_sox     = "false";
config.mlb.cincinnati_reds       = "false";
config.mlb.cleveland_guardians   = "false";
config.mlb.colorado_rockies      = "false";
config.mlb.detroit_tigers        = "false";
config.mlb.houston_astros        = "false";
config.mlb.kansas_city_royals    = "true";
config.mlb.los_angeles_angels    = "false";
config.mlb.los_angeles_dodgers   = "true";
config.mlb.miami_marlins         = "false";
config.mlb.milwaukee_brewers     = "false";
config.mlb.minnesota_twins       = "true";
config.mlb.new_york_mets         = "false";
config.mlb.new_york_yankees      = "false";
config.mlb.oakland_athletics     = "false";
config.mlb.philadelphia_phillies = "false";
config.mlb.pittsburgh_pirates    = "false";
config.mlb.san_diego_padres      = "true";
config.mlb.san_francisco_giants  = "false";
config.mlb.seattle_mariners      = "false";
config.mlb.st_louis_cardinals    = "false";
config.mlb.tampa_bay_rays        = "false";
config.mlb.texas_rangers         = "false";
config.mlb.toronto_blue_jays     = "false";
config.mlb.washington_nationals  = "false";
// NBA team highlights
// NFL team highlights
// END USER CONFIGURATION //

//      DO NOT TOUCH      //
module.exports = config;
////////////////////////////