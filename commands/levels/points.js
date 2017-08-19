const { Command } = require('discord.js-commando');
const sql = require("sqlite");
require('dotenv').config();
sql.open(appRoot + "/score.sqlite");
module.exports = class Points extends Command {
    constructor(client) {
        super(client, {
            name: 'points',
            group: 'levels',
            memberName: 'points',
            description: 'displays your current points',
            examples: ['$points'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: 'user',
                    prompt: 'Wich user do you want to display the points from',
                    type: 'user',
                }


            ]
        });
    }

    run(msg, args) {
        const { user } = args;

        sql.get(`SELECT * FROM scores WHERE userId ="${user.id}"`).then(row => {
            if (!row) return msg.channel.send('sadly ' + user + ' does not have any points yet!');
            msg.channel.send(`${user} has currently ${row.points} points`);

        });
    }
}