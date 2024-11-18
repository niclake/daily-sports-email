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
      case "gs":  return {"full":"Golden State Warriors","city":"Golden State","team":"Warriors","abbr":"GSW"};
      case "hou": return {"full":"Houston Rockets","city":"Houston","team":"Rockets","abbr":"HOU"};
      case "ind": return {"full":"Indiana Pacers","city":"Indiana","team":"Pacers","abbr":"IND"};
      case "lac": return {"full":"Los Angeles Clippers","city":"Los Angeles","team":"Clippers","abbr":"LAC"};
      case "lal": return {"full":"Los Angeles Lakers","city":"Los Angeles","team":"Lakers","abbr":"LAL"};
      case "mem": return {"full":"Memphis Grizzlies","city":"Memphis","team":"Grizzlies","abbr":"MEM"};
      case "mia": return {"full":"Miami Heat","city":"Miami","team":"Heat","abbr":"MIA"};
      case "mil": return {"full":"Milwaukee Bucks","city":"Milwaukee","team":"Bucks","abbr":"MIL"};
      case "min": return {"full":"Minnesota Timberwolves","city":"Minnesota","team":"Timberwolves","abbr":"MIN"};
      case "no":  return {"full":"New Orleans Pelicans","city":"New Orleans","team":"Pelicans","abbr":"NOP"};
      case "ny":  return {"full":"New York Knicks","city":"New York","team":"Knicks","abbr":"NYK"};
      case "okc": return {"full":"Oklahoma City Thunder","city":"Oklahoma City","team":"Thunder","abbr":"OKC"};
      case "orl": return {"full":"Orlando Magic","city":"Orlando","team":"Magic","abbr":"ORL"};
      case "phi": return {"full":"Philadelphia 76ers","city":"Philadelphia","team":"76ers","abbr":"PHI"};
      case "pho": return {"full":"Phoenix Suns","city":"Phoenix","team":"Suns","abbr":"PHX"};
      case "por": return {"full":"Portland Trail Blazers","city":"Portland","team":"Trail Blazers","abbr":"POR"};
      case "sac": return {"full":"Sacramento Kings","city":"Sacramento","team":"Kings","abbr":"SAC"};
      case "sa":  return {"full":"San Antonio Spurs","city":"San Antonio","team":"Spurs","abbr":"SAS"};
      case "tor": return {"full":"Toronto Raptors","city":"Toronto","team":"Raptors","abbr":"TOR"};
      case "uta": return {"full":"Utah Jazz","city":"Utah","team":"Jazz","abbr":"UTA"};
      case "was": return {"full":"Washington Wizards","city":"Washington","team":"Wizards","abbr":"WAS"};
    }
  },

  nflNames(teamAbbr) {
    switch(teamAbbr.toLowerCase()) {
      case "ari": return {"full":"Arizona Cardinals","city":"Arizona","team":"Cardinals","abbr":"ARI"};
      case "atl": return {"full":"Atlanta Falcons","city":"Atlanta","team":"Falcons","abbr":"ATL"};
      case "bal": return {"full":"Baltimore Ravens","city":"Baltimore","team":"Ravens","abbr":"BAL"};
      case "buf": return {"full":"Buffalo Bills","city":"Buffalo","team":"Bills","abbr":"BUF"};
      case "car": return {"full":"Carolina Panthers","city":"Carolina","team":"Panthers","abbr":"CAR"};
      case "chi": return {"full":"Chicago Bears","city":"Chicago","team":"Bears","abbr":"CHI"};
      case "cin": return {"full":"Cincinnati Bengals","city":"Cincinnati","team":"Bengals","abbr":"CIN"};
      case "cle": return {"full":"Cleveland Browns","city":"Cleveland","team":"Browns","abbr":"CLE"};
      case "dal": return {"full":"Dallas Cowboys","city":"Dallas","team":"Cowboys","abbr":"DAL"};
      case "den": return {"full":"Denver Broncos","city":"Denver","team":"Broncos","abbr":"DEN"};
      case "det": return {"full":"Detroit Lions","city":"Detroit","team":"Lions","abbr":"DET"};
      case "gb":  return {"full":"Green Bay Packers","city":"Green Bay","team":"Packers","abbr":"GB"};
      case "hou": return {"full":"Houston Texans","city":"Houston","team":"Texans","abbr":"HOU"};
      case "ind": return {"full":"Indianapolis Colts","city":"Indianapolis","team":"Colts","abbr":"IND"};
      case "jax": return {"full":"Jacksonville Jaguars","city":"Jacksonville","team":"Jaguars","abbr":"JAX"};
      case "kc":  return {"full":"Kansas City Chiefs","city":"Kansas City","team":"Chiefs","abbr":"KC"};
      case "lac": return {"full":"Los Angeles Chargers","city":"Los Angeles","team":"Chargers","abbr":"LAC"};
      case "lar": return {"full":"Los Angeles Rams","city":"Los Angeles","team":"Rams","abbr":"LAR"};
      case "lv":  return {"full":"Las Vegas Raiders","city":"Las Vegas","team":"Raiders","abbr":"LV"};
      case "mia": return {"full":"Miami Dolphins","city":"Miami","team":"Dolphins","abbr":"MIA"};
      case "min": return {"full":"Minnesota Vikings","city":"Minnesota","team":"Vikings","abbr":"MIN"};
      case "ne":  return {"full":"New England Patriots","city":"New England","team":"Patriots","abbr":"NE"};
      case "no":  return {"full":"New Orleans Saints","city":"New Orleans","team":"Saints","abbr":"NO"};
      case "nyg": return {"full":"New York Giants","city":"New York","team":"Giants","abbr":"NYG"};
      case "nyj": return {"full":"New York Jets","city":"New York","team":"Jets","abbr":"NYJ"};
      case "phi": return {"full":"Philadelphia Eagles","city":"Philadelphia","team":"Eagles","abbr":"PHI"};
      case "pit": return {"full":"Pittsburgh Steelers","city":"Pittsburgh","team":"Steelers","abbr":"PIT"};
      case "sea": return {"full":"Seattle Seahawks","city":"Seattle","team":"Seahawks","abbr":"SEA"};
      case "sf":  return {"full":"San Francisco 49ers","city":"San Francisco","team":"49ers","abbr":"SF"};
      case "tb":  return {"full":"Tampa Bay Buccaneers","city":"Tampa Bay","team":"Buccaneers","abbr":"TB"};
      case "ten": return {"full":"Tennessee Titans","city":"Tennessee","team":"Titans","abbr":"TEN"};
      case "was": return {"full":"Washington Football Team","city":"Washington","team":"Football Team","abbr":"WAS"};
    }
  }
};