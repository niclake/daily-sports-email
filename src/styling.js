module.exports = {
  emailStyles: function(league = nil) {
    style = `
      <style>
        table, th, td {border: 1px solid #ccc; border-collapse: collapse; font-size: .8rem;}
        table {min-width: 50%;}
        th {background-color: #ccc;}
        td {padding: 6px 4px;}
        .pill {padding: 2px 4px; margin-bottom: 4px; border: none; border-radius: 5px; font-size: .8rem;}
        @media screen and (max-width: 650px){ table { width: 100vw; margin: 0; padding: 0; } }`;
    
    switch(league) {
      case "mlb": style += this.mlbStyles(); break;
      case "nba": style += this.nbaStyles(); break;
      case "nfl": style += this.nflStyles(); break;
    }

    style += `</style>`;

    return style;
  },

  mlbStyles: function() {
    return `
        .arizona-diamondbacks  {background-color: #A71930; color: #E3D4AD; border-bottom: 3px solid #000000;}
        .atlanta-braves        {background-color: #13274F; color: #FCFCFC; border-bottom: 3px solid #CE1141;}
        .baltimore-orioles     {background-color: #DF4601; color: #FCFCFC; border-bottom: 3px solid #000000;}
        .boston-red-sox        {background-color: #BD3039; color: #FCFCFC; border-bottom: 3px solid #0C2340;}
        .chicago-cubs          {background-color: #0E3386; color: #FCFCFC; border-bottom: 3px solid #CC3433;}
        .chicago-white-sox     {background-color: #27251F; color: #FCFCFC; border-bottom: 3px solid #C4CED4;}
        .cincinnati-reds       {background-color: #C6011F; color: #FCFCFC; border-bottom: 3px solid #000000;}
        .cleveland-guardians   {background-color: #00385D; color: #FCFCFC; border-bottom: 3px solid #E50022;}
        .colorado-rockies      {background-color: #333366; color: #C4CED4; border-bottom: 3px solid #000000;}
        .detroit-tigers        {background-color: #0C2340; color: #FCFCFC; border-bottom: 3px solid #FA4616;}
        .houston-astros        {background-color: #002D62; color: #FCFCFC; border-bottom: 3px solid #EB6E1F;}
        .kansas-city-royals    {background-color: #004687; color: #FCFCFC; border-bottom: 3px solid #BD9B60;}
        .los-angeles-angels    {background-color: #BA0021; color: #FCFCFC; border-bottom: 3px solid #003263;}
        .los-angeles-dodgers   {background-color: #005A9C; color: #FCFCFC; border-bottom: 3px solid #EF3E42;}
        .miami-marlins         {background-color: #000000; color: #FCFCFC; border-bottom: 3px solid #EF3340;}
        .milwaukee-brewers     {background-color: #12284B; color: #FCFCFC; border-bottom: 3px solid #FFC52F;}
        .minnesota-twins       {background-color: #002B5C; color: #FCFCFC; border-bottom: 3px solid #D31145;}
        .new-york-mets         {background-color: #002D72; color: #FCFCFC; border-bottom: 3px solid #FF5910;}
        .new-york-yankees      {background-color: #0C2340; color: #FCFCFC; border-bottom: 3px solid #C4CED3;}
        .oakland-athletics     {background-color: #003831; color: #FCFCFC; border-bottom: 3px solid #EFB21E;}
        .philadelphia-phillies {background-color: #E81828; color: #FCFCFC; border-bottom: 3px solid #002D72;}
        .pittsburgh-pirates    {background-color: #FDB827; color: #27251F; border-bottom: 3px solid #27251F;}
        .san-diego-padres      {background-color: #6ECEB2; color: #FF3EB5; border-bottom: 3px solid #FBE122;}
        .san-francisco-giants  {background-color: #27251F; color: #FD5A1E; border-bottom: 3px solid #AE8F6F;}
        .seattle-mariners      {background-color: #005C5C; color: #C4CED4; border-bottom: 3px solid #0C2C56;}
        .st-louis-cardinals    {background-color: #C41E3A; color: #FCFCFC; border-bottom: 3px solid #0C2340;}
        .tampa-bay-rays        {background-color: #8FBCE6; color: #092C5C; border-bottom: 3px solid #F5D130;}
        .texas-rangers         {background-color: #003278; color: #FCFCFC; border-bottom: 3px solid #C0111F;}
        .toronto-blue-jays     {background-color: #134A8E; color: #FCFCFC; border-bottom: 3px solid #E8291C;}
        .washington-nationals  {background-color: #AB0003; color: #FCFCFC; border-bottom: 3px solid #14225A;}
      `;
  },

  nbaStyles: function() {
    return ``;
  },

  nflStyles: function() {
    return ``;
  }
};