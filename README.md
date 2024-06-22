# Daily Sports Schedules & Standings Emails

A project to email you schedules & standings of MLB, NBA, and/or NFL games & teams every day

## To configure

- Fork this repo & pull down locally
- Run `yarn install`
- Run `you still need to make this, Nic`
- Update `config.js` with your appropriate settings for emails you want to receive, your email client settings, and your time formatting preferences
- Update your `.env` file with your secrets. This will not be committed to your repo
- Update your `.github/workflows/daily_sports_schedules_and_standings.yml` schedule cron to the correct time.
  - Learn more at [https://crontab.guru](https://crontab.guru)
- Run `node src/main.js`. You should see a few console logs, and you should receive an email
- If everything works right, commit & push to your repo
- In your repo, go to `Settings > Secrets and variables > Actions`. Add the secrets from your local `.env` file here
- In your repo, go to `Actions`, and find the workflow. Run it via the dropdown. You should receive an email
- Wait until your schedule cron time. You should receive an email

## To Do

- [X] README
- [ ] Command to generate .env file locally
- [X] MLB Schedule API & format
- [X] MLB Standings API & format
- [X] MLB Email
- [ ] Highlight MLB teams if they're a favorite
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
- [ ] Favorite team email(s) each Monday?
