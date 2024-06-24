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
config.mlb.arizona_diamondbacks  = "true";
config.mlb.atlanta_braves        = "true";
config.mlb.baltimore_orioles     = "true";
config.mlb.boston_red_sox        = "true";
config.mlb.chicago_cubs          = "true";
config.mlb.chicago_white_sox     = "true";
config.mlb.cincinnati_reds       = "true";
config.mlb.cleveland_guardians   = "true";
config.mlb.colorado_rockies      = "true";
config.mlb.detroit_tigers        = "true";
config.mlb.houston_astros        = "true";
config.mlb.kansas_city_royals    = "true";
config.mlb.los_angeles_angels    = "true";
config.mlb.los_angeles_dodgers   = "true";
config.mlb.miami_marlins         = "true";
config.mlb.milwaukee_brewers     = "true";
config.mlb.minnesota_twins       = "true";
config.mlb.new_york_mets         = "true";
config.mlb.new_york_yankees      = "true";
config.mlb.oakland_athletics     = "true";
config.mlb.philadelphia_phillies = "true";
config.mlb.pittsburgh_pirates    = "true";
config.mlb.san_diego_padres      = "true";
config.mlb.san_francisco_giants  = "true";
config.mlb.seattle_mariners      = "true";
config.mlb.st_louis_cardinals    = "true";
config.mlb.tampa_bay_rays        = "true";
config.mlb.texas_rangers         = "true";
config.mlb.toronto_blue_jays     = "true";
config.mlb.washington_nationals  = "true";
// NBA team highlights
// NFL team highlights
// END USER CONFIGURATION //

//      DO NOT TOUCH      //
module.exports = config;
////////////////////////////