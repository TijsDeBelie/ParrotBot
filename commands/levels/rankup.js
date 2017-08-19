const { Command } = require('discord.js-commando');
const sql = require("sqlite");
require('dotenv').config();
sql.open(appRoot + "/score.sqlite");
module.exports = class Points extends Command {
    constructor(client) {
        super(client, {
            name: 'rankup',
            group: 'levels',
            memberName: 'rankup',
            description: 'ranks you up to the mentionned rank if you have sufficient points',
            examples: ['$rankup @Member'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: 'rank',
                    prompt: 'What rank do you want to rankup too?',
                    type: 'string',
                }


            ]
        });
    }

    run(msg, args) {
        const { rank } = args;
        sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row => {
            if (!row) return msg.reply("sadly you do not have any points yet!");
            if (rank == "Member") {
                if (row.level > 5) {
                    msg.reply(`You just ranked up to ` + rank);
                    let Member = msg.guild.roles.find("name", "Member");
                    msg.member.addRole(Member);
                } else {
                    msg.reply(`Sadly you don't have enough points to rank up, you need another ` + (5000 - row.points) + " points");

                }

            } else if (rank == "Trusted") {
                if (row.level > 10) {
                    msg.reply(`You just ranked up to ` + rank);
                    let Trusted = msg.guild.roles.find("name", "Trusted");
                    msg.member.addRole(Trusted);
                } else {
                    msg.reply(`Sadly you don't have enough points to rank up, you need another ` + (10000 - row.points) + " points");

                }
            } else msg.reply("The rank you mentionned does not appear in the list of possible ranks");
        });


    }
}
