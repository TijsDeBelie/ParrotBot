const Discord = require("discord.js");
const client = new Discord.Client();
const sql = require("sqlite");
require('dotenv').config();
sql.open("./score.sqlite");
var key = process.env.LOGINTOKEN;

client.login(key);
console.log('sql is running');
const punten = 5;
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


});
