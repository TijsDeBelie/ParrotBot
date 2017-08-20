const { Command } = require('discord.js-commando');
const sql = require("sqlite");
var user;
require('dotenv').config();
sql.open(appRoot + "/score.sqlite");
module.exports = class Points extends Command {
    constructor(client) {
        super(client, {
            name: 'points',
            group: 'levels',
            memberName: 'points',
            description: 'displays your current points, this is also used to adjust points of users',
            examples: ['$points @user Amount Reason'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: 'user',
                    prompt: 'Wich user do you want to display the points from?',
                    type: 'user',
                    default: ""
                },
                {
                    key: "amount",
                    prompt: "",
                    type: "integer",
                    default: 0

                },
                {
                    key: "reason",
                    prompt: "",
                    type: "string",
                    default: ""
                }



            ]
        });
    }

    run(msg, args) {
        const { user, amount, reason } = args;

        if (user == "") {
            console.log("user is empty");
            sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row => {

                msg.channel.send(`${msg.author} has currently ${row.points} points`);

            });
        } else {

            sql.get(`SELECT * FROM scores WHERE userId ="${user.id}"`).then(row => {
                var total = row.points + amount

                if (args.amount != 0) {
                    if (msg.member.hasPermission('ADMINISTRATOR')) {

                        sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [user.id, total, 0]);
                        msg.channel.send("Adjusted " + user + " points balance, it is now: " + total + "\nReason: " + reason);


                    } else {

                        msg.reply("You do not have the perms to modify points");
                    }

                } else if (args.amount == 0) {
                    if (!row) return msg.channel.send('sadly ' + user + ' does not have any points yet!');

                    msg.channel.send(`${user} has currently ${row.points} points`);
                }
            });
        }
    }
}