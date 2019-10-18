# The Munch-Bot

Forked from https://github.com/spring-media/munch-bot
and adapted to use Konrad and Nemetschek restaurant in Munich and send their menus to a Microsoft Teams channel.

To run it, e.g. add cronjob:
```
0 10 * * * npm run runBot --prefix /home/user/munch-bot/
```

The script fetches the Menu of the day and posts it into our Microsoft Teams channel (set in env.json).
The execution of the script is triggered via a cronjob at 10:00 am.