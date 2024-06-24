module.exports = {
  emailStyles: function(league = nil) {
    style = `
      <style>
        table, th, td {border: 1px solid #ccc; border-collapse: collapse;}
        table {min-width: 50%;}
        th {background-color: #ccc;}
        td {padding: 0.25rem;}
        .pill {padding: 2px 8px; border: none; border-radius: 10px;}`;
    
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
        .arizona-diamondbacks  {background-color: #A71930; color: #E3D4AD;}
        .atlanta-braves        {background-color: #13274F; color: #CE1141;}
        .baltimore-orioles     {background-color: #000000; color: #DF4601;}
        .boston-red-sox        {background-color: #BD3039; color: #0C2340;}
        .chicago-cubs          {background-color: #0E3386; color: #FFFFFF;}
        .chicago-white-sox     {background-color: #27251F; color: #FFFFFF;}
        .cincinnati-reds       {background-color: #C6011F; color: #FFFFFF;}
        .cleveland-guardians   {background-color: #00385D; color: #E50022;}
        .colorado-rockies      {background-color: #333366; color: #C4CED4;}
        .detroit-tigers        {background-color: #0C2340; color: #FA4616;}
        .houston-astros        {background-color: #002D62; color: #EB6E1F;}
        .kansas-city-royals    {background-color: #004687; color: #FFFFFF;}
        .los-angeles-angels    {background-color: #BA0021; color: #FFFFFF;}
        .los-angeles-dodgers   {background-color: #005A9C; color: #FFFFFF;}
        .miami-marlins         {background-color: #000000; color: #00A3E0;}
        .milwaukee-brewers     {background-color: #12284B; color: #FFC52F;}
        .minnesota-twins       {background-color: #002B5C; color: #D31145;}
        .new-york-mets         {background-color: #002D72; color: #FF5910;}
        .new-york-yankees      {background-color: #003087; color: #FFFFFF;}
        .oakland-athletics     {background-color: #003831; color: #EFB21E;}
        .philadelphia-phillies {background-color: #E81828; color: #FFFFFF;}
        .pittsburgh-pirates    {background-color: #FDB827; color: #27251F;}
        .san-diego-padres      {background-color: #6ECEB2; color: #FF3EB5;}
        .san-francisco-giants  {background-color: #27251F; color: #FD5A1E;}
        .seattle-mariners      {background-color: #005C5C; color: #C4CED4;}
        .st-louis-cardinals    {background-color: #C41E3A; color: #FFFFFF;}
        .tampa-bay-rays        {background-color: #092C5C; color: #F5D130;}
        .texas-rangers         {background-color: #003278; color: #C0111F;}
        .toronto-blue-jays     {background-color: #134A8E; color: #FFFFFF;}
        .washington-nationals  {background-color: #AB0003; color: #FFFFFF;}
      `;
  },

  nbaStyles: function() {
    return ``;
  },

  nflStyles: function() {
    return ``;
  }
};