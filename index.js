//discord.js-commando
require('dotenv').config();
const { spawn } = require('child_process');
const Discord = require('discord.js');
const path = require('path');
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
var express = require('express');
var app = express();

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
const child = spawn('node', ['index.js'], {env});

const client = new CommandoClient({
    commandPrefix: '$',
    owner: 'AEnterprise#4693',
    disableEveryone: true,
    unknownCommandResponse: false
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
  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  member.guild.defaultChannel.send(`"${member.user.username}" has joined this server`);
});



//music client

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







