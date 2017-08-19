const Discord = require("discord.js");
const client = new Discord.Client();
const sql = require("sqlite");
require('dotenv').config();
sql.open("./score.sqlite");
var key = process.env.LOGINTOKEN;

client.login(key);
console.log('sql is running');
const punten = 20;
const prefix = "$";
client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type !== "text") return;


  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + punten}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`You've leveled up to level **${curLevel}**! Congrats`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + punten} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });



  if (!message.content.startsWith(prefix)) return;



  if (message.content.startsWith(prefix + "level")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Your current level is 0");
      message.reply(`Your current level is ${row.level}`);
    });
  } else if (message.content.startsWith(prefix + "points")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("sadly you do not have any points yet!");
      message.reply(`you currently have ${row.points} points, good going!`);
    });
  } else if (message.content.startsWith(prefix + "rankup")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("sadly you do not have any points yet!");
      if (row.level == 10) {
        message.reply(`You just ranked up to Trusted`);
        let Trusted = message.guild.roles.find("name", "Trusted");
        message.member.addRole(Trusted);
      } else {
        message.reply(`Sadly you don't have enough points to rank up, you need another ` + (10000 - row.points) + " points");

      }
    });
  } else if (message.content.startsWith(prefix + "rankinfo")) {

    message.reply(`For every message you sent you gain ` + punten + ' points.\n Once you reach level 10 you can rankup to Trusted. More ranks will be added in the future');
  }
});


