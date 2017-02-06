// REDDIT LIBRARY AND SETUP ////////////////////////////////////////

// Controlling our environment so that the bot works correctly when deployed on Heroku
var environment = process.env.NODE_ENV || 'development'

// we only use the config.js on dev machines to test without sharing credentials
if(environment == "development"){
  var redditConfig = require('./config.js');
}

// This is a wrapper for the Reddit api. It isn't necessary, but it makes working with the API easier
var snoowrap = require('snoowrap');

// configure the reddit library using all of your super-secret config data
const reddit = new snoowrap({
    userAgent: 'Javascript bot that compiles web-dev articles and posts them in /r/RCBRedditBot',
// These variables in CAPS are environment variables set in heroku via CLI or web interface. If the app is in dev mode, it will use the config file instead.
    clientId:  process.env.REDDIT_CLIENT || redditConfig.clientId,
    clientSecret:  process.env.REDDIT_SECRET || redditConfig.clientSecret,
    username:  process.env.REDDIT_USER || redditConfig.username,
    password: process.env.REDDIT_PASS || redditConfig.password});

// Our main function that will call the Reddit api for new stories in a specific subreddit
// if you aren't familiar with ES6 syntax, the sub will default to /r/aww, the number of stories to 10.
// The arrows are one way of writing functions in ES6.
getNewStories = (sub='aww', num=10) => {
    reddit.getSubreddit(sub).getHot()
    .then(function(listing) {
        for (var i = 0; i < num ; i++) {
          var post = listing[i];
          // stickied posts are always at the top of a subreddit, so we want to ignore those.
          // I check for post.url to see if the post is a link to something instead of just a text post.
            if ( post.url && !post.stickied) {
                console.log(post.url)
                postNewStory(post);
            }
        }
    })
}

// This function submits a post to our private subreddit
postNewStory = (post) => {
  console.log(post)
  // creating a post object to submit to Reddit
    reddit.getSubreddit('RCBRedditBot').submitLink(
      {
        title: post.title + ' (X-post from /r/'+ post.subreddit.display_name + ')',
        url: post.url,
        resubmit: false
    })
    // we want some basic error handling so our bot doesn't just stop
    .catch(function(e){
      console.log("Article already submitted.")
    })
    .then(console.log("Article Posted!"))
}

// This function runs getNewStories in several diffrent subreddits and posts them in our subreddit
getDevStories = () => {
  getNewStories('coding', 10);
  getNewStories('web_design', 10);
  getNewStories('node', 10);
  getNewStories('javascript', 10);
  getNewStories('webdev', 10);
  getNewStories('Frontend', 10);
  getNewStories('reactjs', 10);
  getNewStories('compsci', 10);
}


// We run the function once so that it runs immediately when deployed
getDevStories();
// Set how often the bot will run in milliseconds. Be careful not to set it for too frequently!
// This one is set for an hour
setInterval(getDevStories, 1800000);
