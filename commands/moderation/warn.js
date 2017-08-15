const { Command } = require('discord.js-commando');
global.warnlist = [];
module.exports = class Warn extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            aliases: ['attention'],
            group: 'moderation',
            memberName: 'warn',
            description: 'warns a user',
            examples: ['$warn @user reason'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to warn?',
                    type: 'user'
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason this user should be warned for?',
                    type: 'string'

                }


            ]
        });
    }

    run(msg, args) {
        const { user, reason } = args;
        var count;

        if (!msg.member.hasPermission('ADMINISTRATOR')){
            msg.delete();
            return msg.say('Error! '+  msg.author + ' doesn\'t have permission to warn users!');}
        else {
            user.send("You have been warned for: " + reason);
            warned.push("\n" + user + " " + reason);
            warnlist.push(user);

            console.log("warnlist \n" + warnlist);


            countInArray(warnlist, user);

            function countInArray(array, what) {
                count = array.filter(item => item == what).length;
                console.log("count \n" + count);

            }

            if (count >= 5) {

                var member = msg.mentions.members.first();
                // Kick
                user.send("Automod has kicked you ! /nIf you feel like this is a mistake please contact @Eagler1997#7990")
                member.kick().then((member) => {
                    // Successmessage

                    msg.channel.send(":wave: " + user + " has been successfully kicked :point_right: ");

                }).catch(() => {
                    // Failmessage
                    msg.channel.send("Access Denied");
                });
            }

        }
    }
}