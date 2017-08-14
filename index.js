//discord.js-commando
require('dotenv').config();
const { spawn } = require('child_process');
const Discord = require('discord.js');
const path = require('path');
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
var express = require('express');
var app = express();
var antispam = require("./automod.js");
global.appRoot = path.resolve(__dirname);

var key = process.env.LOGINTOKEN;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

const env = Object.assign({}, process.env, {PORT: 5000});
//const child = spawn('node', ['index.js'], {env});

global.client = new CommandoClient({
    commandPrefix: '$',
	owner: '243275264497418250',
    disableEveryone: true,
    unknownCommandResponse: false,
    autoReconnect:true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["text", 'All commands for Text channels'],
        ['speech', 'All commands for Speech channels'],
        ['moderation', 'All moderation commands'],
        ['trivia', 'Poll command']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands(

        //disable commands with [help : false]
    )
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in!');
    client.user.setGame('use $help for help');
});


client.login(key);   



 client.on("guildMemberAdd", (member) => {
    client.channels.get('325619660206637057').send(`Welcome, "${member.user.username}" has joined this server`);
});

antispam(client, {
  warnBuffer: 1, //Maximum amount of messages allowed to send in the interval time before getting warned. 
  maxBuffer: 3, // Maximum amount of messages allowed to send in the interval time before getting banned. 
  interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned. 
  warningMessage: "Stop spamming!", // Warning message send to the user indicating they are going to fast. 
  banMessage: "has been banned for spamming, anyone else?", // Ban message, always tags the banned user in front of it. 
  maxDuplicatesWarning: 2, // Maximum amount of duplicate messages a user can send in a timespan before getting warned 
  maxDuplicatesBan: 4 // Maximum amount of duplicate messages a user can send in a timespan before getting banned 
});

/*
client.on("message", (message) => {
//let's use something like a spam variable for 10 or more messages sent within 5000ms
if(message.content === spam) {
    message.reply("Warning: Spamming in this channel is forbidden.");
    console.log(message.author.username + " (" + message.author.id + ") has sent 10 messages or more in 5 seconds in " + message.channel.name + ".");
  }
});
*/


/*//music client
const ytdl = require('ytdl-core');
const musicclient = new Discord.Client();
musicclient.on('message', message => {
  if (message.content.startsWith('$play')) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl(message.content, { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        
        dispatcher.on('end', () => voiceChannel.leave());
      });
  } else if (message.content.startsWith('$stop')) {
      voiceChannel.dispatcher.end();
   }
});
musicclient.login(key);
*/



