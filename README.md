RedditBotTest
=============

A basic Reddit bot that pulls the 'hot' posts from a collection of dev-related subreddits every 30 minutes and reposts them to a [private sub-reddit](https://www.reddit.com/r/RCBRedditBot/).

To modify, you'll need to register an application on [Reddit's Dev page](https://ssl.reddit.com/prefs/apps) Then, add your clientId, clientSecret, username, and password to a config.js file in the root of the app. You will need to add env configs for products or otherwise change how the code handles config data. You SHOULD NOT hard-code your client Secret or user account information!

The app uses [snoowrap](https://github.com/not-an-aardvark/snoowrap) for accessing Reddit's API.

MConstanza
