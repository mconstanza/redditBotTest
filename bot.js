// REDDIT LIBRARY AND SETUP ////////////////////////////////////////

// this is our private config file with relevant application information for both Reddit and nodemailer
if(NODE_ENV="development"){
  var redditConfig = require('./config.js');
}

// This is a wrapper for the Reddit api. It isn't necessary, but it makes working with the API easier
var snoowrap = require('snoowrap');

// configure the reddit library using all of your super-secret config data
const reddit = new snoowrap({
    userAgent: 'Javascript bot that compiles web-dev articles and posts them in /r/RCBRedditBot',
    clientId: redditConfig.clientId || REDDIT_CLIENT,
    clientSecret: redditConfig.clientSecret || REDDIT_SECRET,
    username: redditConfig.username || REDDIT_USER,
    password: redditConfig.password|| REDDIT_PASSWORD});

// Variables used in application

var posts = [];

// Our main function that will call the Reddit api for new stories in a specific subreddit
getNewStories = (sub='aww', num=10) => {
    reddit.getSubreddit(sub).getHot()
    .then(function(listing) {
        for (var i = 0; i < num ; i++) {
          var post = listing[i];
            if ( post.url && !post.stickied && posts.indexOf(post == -1)) {
                posts.push(post);
                console.log(post.url)
                postNewStory(post);
            }
        }
    })
}

postNewStory = (post) => {
    reddit.getSubreddit('RCBRedditBot').submitLink(
      {
        title: post.title + ' cross-post from ' + post.subreddit.display_name,
        url: post.url,
        resubmit: false
    })
    .catch(function(e){
      console.log("Article already submitted.")
    })
    .then(console.log("Article Posted!"))
}

// set how often the bot will run in milliseconds. Be careful not to set it for too frequently!
// This one is set for an hour
getNewStories();
setInterval(getNewStories, 3600000);
