//       DO NOT TOUCH      //
const config = {};
config.send_email = {};
config.email_client = {};
config.user = {};
config.mlb = {};
config.nba = {};
config.nfl = {};
/////////////////////////////

// USER CONFIGURATION HERE //
// Which emails do you want to receive?
config.send_email = {
  mlb: "true",
  nba: "true",
  nfl: "true"
};

// Email client
// Defaults are for Gmail
config.email_client = {
  host: "smtp.gmail.com",
  port: "465",
  secure: "true"
};

config.user = {
  // Use https://timezonedb.com/time-zones to find your time zone 
  time_zone: "America/Chicago",
  // "0" for military time ("13:00"), "1" for normal time ("1:00 PM")
  time_hour: "0"
};

// MLB
config.mlb = {
  // Highlight teams in playoff chase late in the season?
  playoff_chase: "true",
  // Highlight your favorite team(s) by changing to "true"
  arizona_diamondbacks   : "false",
  athletics              : "false",
  atlanta_braves         : "true",
  baltimore_orioles      : "false",
  boston_red_sox         : "true",
  chicago_cubs           : "false",
  chicago_white_sox      : "false",
  cincinnati_reds        : "false",
  cleveland_guardians    : "false",
  colorado_rockies       : "false",
  detroit_tigers         : "false",
  houston_astros         : "false",
  kansas_city_royals     : "false",
  los_angeles_angels     : "false",
  los_angeles_dodgers    : "true",
  miami_marlins          : "false",
  milwaukee_brewers      : "false",
  minnesota_twins        : "false",
  new_york_mets          : "false",
  new_york_yankees       : "false",
  philadelphia_phillies  : "false",
  pittsburgh_pirates     : "false",
  san_diego_padres       : "true",
  san_francisco_giants   : "false",
  seattle_mariners       : "false",
  st_louis_cardinals     : "false",
  tampa_bay_rays         : "false",
  texas_rangers          : "false",
  toronto_blue_jays      : "false",
  washington_nationals   : "false"
};

// NBA
config.nba = {
  // Highlight teams in playoff chase late in the season?
  playoff_chase: "true",
  // Highlight your favorite team(s) by changing to "true"
  atlanta_hawks          : "false",
  boston_celtics         : "true",
  brooklyn_nets          : "false",
  charlotte_hornets      : "false",
  chicago_bulls          : "false",
  cleveland_cavaliers    : "false",
  dallas_mavericks       : "false",
  denver_nuggets         : "false",
  detroit_pistons        : "false",
  golden_state_warriors  : "false",
  houston_rockets        : "false",
  indiana_pacers         : "false",
  los_angeles_clippers   : "false",
  los_angeles_lakers     : "false",
  memphis_grizzlies      : "false",
  miami_heat             : "false",
  milwaukee_bucks        : "false",
  minnesota_timberwolves : "false",
  new_orleans_pelicans   : "false",
  new_york_knicks        : "false",
  oklahoma_city_thunder  : "false",
  orlando_magic          : "false",
  philadelphia_76ers     : "false",
  phoenix_suns           : "false",
  portland_trail_blazers : "false",
  sacramento_kings       : "false",
  san_antonio_spurs      : "false",
  toronto_raptors        : "false",
  utah_jazz              : "false",
  washington_wizards     : "false"
};

// NFL
config.nfl = {
  // Highlight teams in playoff chase late in the season?
  playoff_chase: "true",
  // Highlight your favorite team(s) by changing to "true"
  arizona_cardinals      : "false",
  atlanta_falcons        : "false",
  baltimore_ravens       : "false",
  buffalo_bills          : "false",
  carolina_panthers      : "false",
  chicago_bears          : "true",
  cincinnati_bengals     : "false",
  cleveland_browns       : "false",
  dallas_cowboys         : "false",
  denver_broncos         : "false",
  detroit_lions          : "false",
  green_bay_packers      : "false",
  houston_texans         : "false",
  indianapolis_colts     : "false",
  jacksonville_jaguars   : "false",
  kansas_city_chiefs     : "false",
  las_vegas_raiders      : "false",
  los_angeles_chargers   : "false",
  los_angeles_rams       : "false",
  miami_dolphins         : "false",
  minnesota_vikings      : "true",
  new_england_patriots   : "true",
  new_orleans_saints     : "false",
  new_york_giants        : "false",
  new_york_jets          : "false",
  philadelphia_eagles    : "false",
  pittsburgh_steelers    : "false",
  san_francisco_49ers    : "false",
  seattle_seahawks       : "false",
  tampa_bay_buccaneers   : "false",
  tennessee_titans       : "false",
  washington_commanders  : "false"
};
// END USER CONFIGURATION //

//      DO NOT TOUCH      //
module.exports = config;
////////////////////////////