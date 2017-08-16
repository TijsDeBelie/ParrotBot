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
var talkedRecently = [];
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
  warnBuffer: 1, //Maximum amount of messages allowed to send in the interval time before getting warned. 
  maxBuffer: 3, // Maximum amount of messages allowed to send in the interval time before getting banned. 
  interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned. 
  warningMessage: "Stop spamming!", // Warning message send to the user indicating they are going to fast. 
  banMessage: "has been banned for spamming, anyone else?", // Ban message, always tags the banned user in front of it. 
  maxDuplicatesWarning: 2, // Maximum amount of duplicate messages a user can send in a timespan before getting warned 
  maxDuplicatesBan: 4 // Maximum amount of duplicate messages a user can send in a timespan before getting banned 
});


client.on("message", (message) => {
const swearWords = [
"Sonofabitch",
"motherfucker",
"pussy",
"asshole",
"assfuck",
"fuckass",
"dumbass",
"dick",
"twat",
"skank",
"slut",
"bitch",
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
"wtf",
"bstrd",
"btch",
"ni**er",
"homo",
"gay",
"lesbian",
"paki"];
if(swearWords.some(word => message.content.toLowerCase().includes(word)) ) {
message.reply("Please watch the language");
  message.delete()
  
  const embed = new Discord.RichEmbed()
  .setColor("#FF0000")
  .setAuthor(client.user.tag, client.user.displayAvatarURL)
  .setTitle("⚠ Auto Warning ⚠")
  .addField("Reason", "Bad Word")
  message.author.send({embed})


  
}




function checkAvailability(arr, val) {
  return arr.some(function(arrVal) {
    return val == arrVal;
  });
}


var index = talkedRecently.indexOf(message.author.id);
if (checkAvailability(talkedRecently, message.author.id)) {
    message.delete();
} else {
  
  talkedRecently.push(message.author.id.toString());
}
setTimeout(() => {
  
  if (index > -1) {
    talkedRecently.splice(index, 1);
}
}, 750);




});




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



