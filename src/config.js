//       DO NOT TOUCH      //
var config = {};
config.send_email = {};
config.email_client = {};
config.user = {};
config.mlb = {};
config.nba = {};
config.nfl = {};
/////////////////////////////

// USER CONFIGURATION HERE //
// Which emails do you want to receive?
config.send_email.mlb = "true"; // MLB
config.send_email.nba = "true"; // NBA
config.send_email.nfl = "true"; // NFL
// Email client
// Defaults are for Gmail
config.email_client.host = "smtp.gmail.com";
config.email_client.port = "465";
config.email_client.secure = "true"; // use 'true' for port 465, 'false' for all other
// Time zone & display information
config.user.time_zone = "America/Chicago"; // Use https://timezonedb.com/time-zones to find your time zone 
config.user.time_hour = "0"; // "0" for "13:00", "1" for "1:00 PM"
// MLB team highlights
config.mlb.arizona_diamondbacks   = "false";
config.mlb.athletics              = "false";
config.mlb.atlanta_braves         = "true";
config.mlb.baltimore_orioles      = "false";
config.mlb.boston_red_sox         = "true";
config.mlb.chicago_cubs           = "false";
config.mlb.chicago_white_sox      = "false";
config.mlb.cincinnati_reds        = "false";
config.mlb.cleveland_guardians    = "false";
config.mlb.colorado_rockies       = "false";
config.mlb.detroit_tigers         = "false";
config.mlb.houston_astros         = "false";
config.mlb.kansas_city_royals     = "false";
config.mlb.los_angeles_angels     = "false";
config.mlb.los_angeles_dodgers    = "true";
config.mlb.miami_marlins          = "false";
config.mlb.milwaukee_brewers      = "false";
config.mlb.minnesota_twins        = "false";
config.mlb.new_york_mets          = "false";
config.mlb.new_york_yankees       = "false";
config.mlb.philadelphia_phillies  = "false";
config.mlb.pittsburgh_pirates     = "false";
config.mlb.san_diego_padres       = "true";
config.mlb.san_francisco_giants   = "false";
config.mlb.seattle_mariners       = "false";
config.mlb.st_louis_cardinals     = "false";
config.mlb.tampa_bay_rays         = "false";
config.mlb.texas_rangers          = "false";
config.mlb.toronto_blue_jays      = "false";
config.mlb.washington_nationals   = "false";
// NBA team highlights
config.nba.atlanta_hawks          = "false";
config.nba.boston_celtics         = "true";
config.nba.brooklyn_nets          = "false";
config.nba.charlotte_hornets      = "false";
config.nba.chicago_bulls          = "false";
config.nba.cleveland_cavaliers    = "false";
config.nba.dallas_mavericks       = "false";
config.nba.denver_nuggets         = "false";
config.nba.detroit_pistons        = "false";
config.nba.golden_state_warriors  = "false";
config.nba.houston_rockets        = "false";
config.nba.indiana_pacers         = "false";
config.nba.los_angeles_clippers   = "false";
config.nba.los_angeles_lakers     = "false";
config.nba.memphis_grizzlies      = "false";
config.nba.miami_heat             = "false";
config.nba.milwaukee_bucks        = "false";
config.nba.minnesota_timberwolves = "false";
config.nba.new_orleans_pelicans   = "false";
config.nba.new_york_knicks        = "false";
config.nba.oklahoma_city_thunder  = "false";
config.nba.orlando_magic          = "false";
config.nba.philadelphia_76ers     = "false";
config.nba.phoenix_suns           = "false";
config.nba.portland_trail_blazers = "false";
config.nba.sacramento_kings       = "false";
config.nba.san_antonio_spurs      = "false";
config.nba.toronto_raptors        = "false";
config.nba.utah_jazz              = "false";
config.nba.washington_wizards     = "false";
// NFL team highlights
config.nfl.arizona_cardinals      = "false";
config.nfl.atlanta_falcons        = "false";
config.nfl.baltimore_ravens       = "false";
config.nfl.buffalo_bills          = "false";
config.nfl.carolina_panthers      = "false";
config.nfl.chicago_bears          = "true";
config.nfl.cincinnati_bengals     = "false";
config.nfl.cleveland_browns       = "false";
config.nfl.dallas_cowboys         = "false";
config.nfl.denver_broncos         = "false";
config.nfl.detroit_lions          = "false";
config.nfl.green_bay_packers      = "false";
config.nfl.houston_texans         = "false";
config.nfl.indianapolis_colts     = "false";
config.nfl.jacksonville_jaguars   = "false";
config.nfl.kansas_city_chiefs     = "false";
config.nfl.las_vegas_raiders      = "false";
config.nfl.los_angeles_chargers   = "false";
config.nfl.los_angeles_rams       = "false";
config.nfl.miami_dolphins         = "false";
config.nfl.minnesota_vikings      = "true";
config.nfl.new_england_patriots   = "true";
config.nfl.new_orleans_saints     = "false";
config.nfl.new_york_giants        = "false";
config.nfl.new_york_jets          = "false";
config.nfl.philadelphia_eagles    = "false";
config.nfl.pittsburgh_steelers    = "false";
config.nfl.san_francisco_49ers    = "false";
config.nfl.seattle_seahawks       = "false";
config.nfl.tampa_bay_buccaneers   = "false";
config.nfl.tennessee_titans       = "false";
config.nfl.washington_commanders  = "false";
// END USER CONFIGURATION //

//      DO NOT TOUCH      //
module.exports = config;
////////////////////////////