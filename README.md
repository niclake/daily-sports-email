# Daily Sports Schedules & Standings Emails

![A screenshot of the MLB email](/images/mlb-screenshot.png)

I am the type of person that needs information put right in front of me if I want to guarantee that I'll see it. This project was made to send myself emails every morning, containing that day's schedule & the current standings for Major League Baseball. I decided to extend it to the NBA and NFL as well (coming soon).

## Features

- Show the schedule for MLB, ~~NBA, and NFL~~ games happening that day
- Show the current standings for the league~~s~~
- Highlight your favorite teams, so you can immediately find them on the schedule & standings

## To Use

- Fork this repo.
- If you'd like to test locally, pull down and run `yarn install`.
- Update [`src/config.js`](src/config.js) with your appropriate settings for emails you want to receive, your email client settings, and your time formatting preferences.
  - Also, if you would like to have favorite teams highlighted, set that team's value to `"true"`.
  - If you use Gmail, you do not need to change any of the `config.email_client.*` settings
  - If you don't use Gmail, search for `<email provider> smtp settings` to find your host & port
- If your email provider offers it, generate an app specific password for your account
  - For Gmail, [you can do that here](https://myaccount.google.com/apppasswords)
- **[LOCALLY ONLY]** Create a `.env` file at the project root.
  - **DO NOT upload this file to your repo.**
  - The file contents should look as follows:

```
MAIL_FROM="Daily Sports Email <yourEmail@here>"
MAIL_TO="yourEmail@here"
MAIL_USER_EMAIL="yourEmail@here"
MAIL_USER_PASSWORD="yourAppSpecificPasswordHere"
```

- **[LOCALLY ONLY]** Update your `.env` file with the appropriate values.
  - For the `MAIL_USER_PASSWORD`, use your app-specific password here.
  - For Gmail's app-specific passwords, they will look like `aaaa bbbb cccc dddd`; remove the spaces so it's `aaaabbbbccccdddd`.
- Update your [`.github/workflows/daily_sports_schedules_and_standings.yml`](.github/workflows/daily_sports_schedules_and_standings.yml) schedule cron to the correct time.
  - The default, `cron: "0 13 * * *"`, executes at 9am Eastern / 6am Pacific.
  - Learn more at [https://crontab.guru](https://crontab.guru).
- **[LOCALLY ONLY]** Run `node src/main.js`. You should see a few console logs, and you should receive an email.
- **[LOCALLY ONLY]** If If everything works right, commit & push to your repo.
- In your repo, go to `Settings > Secrets and variables > Actions`. Add the secrets from [the `.env` file](.env) here, and set the values appropriately.
  - If you did not test locally, reference the "Create a `.env` file" and "Update your `.env` file" steps above.
- In your repo, go to `Actions`, and find the workflow. Run it via the dropdown. You should receive an email.
- Wait until your schedule cron time. You should receive an email.

## To Do

- [X] README
- [X] MLB Schedule API & format
- [X] MLB Standings API & format
- [X] MLB Email
- [X] Highlight MLB teams if they're a favorite
- [ ] NFL Schedule API & format
- [ ] NFL Standings API & format
- [ ] NFL Email
  - [ ] Send one on Tues/Weds for the upcoming week
  - [ ] Send one each day for games that day
- [ ] Highlight NFL teams if they're a favorite
- [ ] NBA schedule API & format
- [ ] NBA standings API & format
- [ ] NBA Email
- [ ] Highlight NBA teams if they're a favorite
- [ ] Command to generate .env and src/config.js files locally
- [ ] Favorite team email(s) each Monday?
- [ ] Option to only show favorite teams
- [ ] Options to show schedule, standings, or both
