
// REDDIT LIBRARY AND SETUP ////////////////////////////////////////

// this is our private config file with relevant application information for both Reddit and nodemailer
var redditConfig = require('./config.js');

// This is a wrapper for the Reddit api. It isn't necessary, but it makes working with the API easier
var snoowrap = require('snoowrap');

// configure the reddit library using all of your super-secret config data
const reddit = new snoowrap({
  userAgent: 'Javascript bot that compiles web-dev articles and posts them in /r/RCBRedditBot',
  clientId: redditConfig.clientId,
  clientSecret: redditConfig.clientSecret,
  username: redditConfig.username,
  password: redditConfig.password
});


// Our main function that will call the Reddit api for new stories in a specific subreddit
getNewStories = () => {
  reddit.getSubreddit('aww').getHot().then(console.log)
}


// set how often the bot will run in milliseconds. Be careful not to set it for too frequently!
setInterval(getNewStories, 10000);
