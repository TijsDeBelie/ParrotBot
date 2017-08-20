//discord.js-commando
require('dotenv').config();
const { spawn } = require('child_process');
global.Discord = require('discord.js');
const path = require('path');
const { CommandoClient} = require('discord.js-commando');
var express = require('express');
var app = express();
var antispam = require("./automod.js");
require("./sql.js");
global.appRoot = path.resolve(__dirname);
var key = process.env.LOGINTOKEN;
var index;
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

const env = Object.assign({}, process.env, { PORT: 5000 });


global.client = new CommandoClient({
  commandPrefix: '$',
  owner: '243275264497418250',
  disableEveryone: true,
  unknownCommandResponse: false,
  autoReconnect: true
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["text", 'All commands for Text channels'],
    ['speech', 'All commands for Speech channels'],
    ['moderation', 'All moderation commands'],
    ['trivia', 'Poll command'],
    ['levels', 'All commands related to levels']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands(

  //disable commands with [help : false]
  )
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log('Logged in!');
  client.user.setGame('use $help for help');
  client.user.setPresence({ game: { name: `$help | Servers: ${client.guilds.size}`, type: 0 } });


});
client.on('disconnect', function(event) {
  if(event.code != 1000) {
    console.log("Discord client disconnected with reason: " + event.reason + " (" + event.code + "). Attempting to reconnect in 6s...");
    setTimeout(function(){ client.login(key); }, 6000);
  }
});


client.login(key);


client.on('guildMemberAdd', member => {
  if (member.bot) {
    let guild = member.guild;
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Bot Update',
      `${member.user} Bot Joined. :wave:  `)
    client.channels.find("name", "announcements").sendEmbed(embed); // change general to your preferred TEXT channel. 
  } else {

    let guild = member.guild;
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Member Update',
      `${member.user} has joined! :white_check_mark: `)
    client.channels.find("name", "announcements").sendEmbed(embed); // change general to your preferred TEXT channel. 
  }
});

antispam(client, {
  warnBuffer: 4, //Maximum amount of messages allowed to send in the interval time before getting warned. 
  maxBuffer: 6, // Maximum amount of messages allowed to send in the interval time before getting banned. 
  interval: 2500, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned. 
  warningMessage: "Stop spamming!", // Warning message send to the user indicating they are going to fast. 
  banMessage: "has been punished for spamming, anyone else?", // Ban message, always tags the banned user in front of it. 
  maxDuplicatesWarning: 4, // Maximum amount of duplicate messages a user can send in a timespan before getting warned 
  maxDuplicatesBan: 5 // Maximum amount of duplicate messages a user can send in a timespan before getting banned 
});


client.on("message", (message) => {
  const swearWords = [
    "Sonofabitch", "motherfucker", "pussy",
    "asshole", "assfuck", "fuckass",
    "dumbass", "dick", "twat",
    "skank", "slut",
    "bitch", "cunt",
    "douche",
    "douchebag",
    "fuck",
    "shit",
    "fuker",
    "niggers",
    "nigga",
    "d1ck",
    "cnt",
    "fking",
    "what the fuck",
    "bstrd",
    "btch",
    "ni**er",
    "homo",
    "gay",
    "lesbian",
    "paki",
    "h0m0",
    "kys",
    "killyourself",
    "fck"];
  if(message.author.id != "243275264497418250"){
  if (swearWords.some(word => message.content.replace(/ /g, '').toLowerCase().includes(word))) {
    message.reply("Please watch the language");
    message.delete()

    
  }

}
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  var t = message.content.replace(/ /g, '');
  if (t.match(regex)) {
    var allowed = client.channels.find("name", "music_and_media").id;
    if (message.channel.id != allowed) {
      console.log(message.member.roles);
      if (!message.member.roles.has('305343494162087937')) {
        if (message.author.id != client.user.id) {

          message.delete();
          message.channel.send("Urls are not allowed in this channel, please use #music_and_media")

        }
      } else {

        return message.content;
      }
    }
  }
});




