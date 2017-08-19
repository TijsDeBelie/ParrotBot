const { Command } = require('discord.js-commando');
const sql = require("sqlite");
require('dotenv').config();
sql.open(appRoot + "/score.sqlite");
module.exports = class Points extends Command {
    constructor(client) {
        super(client, {
            name: 'level',
            group: 'levels',
            memberName: 'level',
            description: 'displays your current level',
            examples: ['$level'],
            throttling: {
                usages: 1,
                duration: 10
            },
        });
    }

    run(msg) {
        sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row => {
            if (!row) return msg.reply("Your current level is 0");
            msg.reply(`Your current level is ${row.level}`);
          });
    }
}