module.exports = {
  nbaNames(teamAbbr) {
    switch(teamAbbr.toLowerCase()) {
      case "atl": return {"full":"Atlanta Hawks","city":"Atlanta","team":"Hawks","abbr":"ATL"};
      case "bos": return {"full":"Boston Celtics","city":"Boston","team":"Celtics","abbr":"BOS"};
      case "bkn": return {"full":"Brooklyn Nets","city":"Brooklyn","team":"Nets","abbr":"BKN"};
      case "cha": return {"full":"Charlotte Hornets","city":"Charlotte","team":"Hornets","abbr":"CHA"};
      case "chi": return {"full":"Chicago Bulls","city":"Chicago","team":"Bulls","abbr":"CHI"};
      case "cle": return {"full":"Cleveland Cavaliers","city":"Cleveland","team":"Cavaliers","abbr":"CLE"};
      case "dal": return {"full":"Dallas Mavericks","city":"Dallas","team":"Mavericks","abbr":"DAL"};
      case "den": return {"full":"Denver Nuggets","city":"Denver","team":"Nuggets","abbr":"DEN"};
      case "det": return {"full":"Detroit Pistons","city":"Detroit","team":"Pistons","abbr":"DET"};
      case "gsw": return {"full":"Golden State Warriors","city":"Golden State","team":"Warriors","abbr":"GSW"};
      case "hou": return {"full":"Houston Rockets","city":"Houston","team":"Rockets","abbr":"HOU"};
      case "ind": return {"full":"Indiana Pacers","city":"Indiana","team":"Pacers","abbr":"IND"};
      case "lac": return {"full":"Los Angeles Clippers","city":"Los Angeles","team":"Clippers","abbr":"LAC"};
      case "lal": return {"full":"Los Angeles Lakers","city":"Los Angeles","team":"Lakers","abbr":"LAL"};
      case "mem": return {"full":"Memphis Grizzlies","city":"Memphis","team":"Grizzlies","abbr":"MEM"};
      case "mia": return {"full":"Miami Heat","city":"Miami","team":"Heat","abbr":"MIA"};
      case "mil": return {"full":"Milwaukee Bucks","city":"Milwaukee","team":"Bucks","abbr":"MIL"};
      case "min": return {"full":"Minnesota Timberwolves","city":"Minnesota","team":"Timberwolves","abbr":"MIN"};
      case "nop": return {"full":"New Orleans Pelicans","city":"New Orleans","team":"Pelicans","abbr":"NOP"};
      case "nyk": return {"full":"New York Knicks","city":"New York","team":"Knicks","abbr":"NYK"};
      case "okc": return {"full":"Oklahoma City Thunder","city":"Oklahoma City","team":"Thunder","abbr":"OKC"};
      case "orl": return {"full":"Orlando Magic","city":"Orlando","team":"Magic","abbr":"ORL"};
      case "phi": return {"full":"Philadelphia 76ers","city":"Philadelphia","team":"76ers","abbr":"PHI"};
      case "phx": return {"full":"Phoenix Suns","city":"Phoenix","team":"Suns","abbr":"PHX"};
      case "por": return {"full":"Portland Trail Blazers","city":"Portland","team":"Trail Blazers","abbr":"POR"};
      case "sac": return {"full":"Sacramento Kings","city":"Sacramento","team":"Kings","abbr":"SAC"};
      case "sas": return {"full":"San Antonio Spurs","city":"San Antonio","team":"Spurs","abbr":"SAS"};
      case "tor": return {"full":"Toronto Raptors","city":"Toronto","team":"Raptors","abbr":"TOR"};
      case "uta": return {"full":"Utah Jazz","city":"Utah","team":"Jazz","abbr":"UTA"};
      case "was": return {"full":"Washington Wizards","city":"Washington","team":"Wizards","abbr":"WAS"};
    }
  }
};