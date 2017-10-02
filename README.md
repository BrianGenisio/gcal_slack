# gcal_slack
Update my Slack status based off of Google Calendar.  This isn't really productized, but feel free to fork it and use it for yourself.

## Configuration
1. Download your `client_secret.json` file from the [Google Credentials Dashboard](https://console.developers.google.com/apis/credentials).  For more details, see "Step 1" for the [GCal Node API Quickstart](https://developers.google.com/google-apps/calendar/quickstart/nodejs).
2. Create a `slack_secret.json` file with the `token` coming from creating a Slack app, and giving it the "users.profile:write" scope, then "install" the app.  You will get an auth token.  
3. Add the `user` property to the `slack_secret.json` file.  I got mine from looking at my profile from the web app.  It was in the URL: https://myorg.slack.com/messages/MYUSERID/

## Execution
`node index.js`

## Cron
I set this to run every minute, M-F, 9-5 by using Cron.
`crontab -e`
`*/1 09-17 * * 1-5 cd /Users/me/code/gcal-slack && /usr/local/bin/node index.js >/dev/null 2>&1`
