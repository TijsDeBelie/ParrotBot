const { Command } = require('discord.js-commando');
var automod = require(appRoot +'/automod.js')
module.exports = class Banlist extends Command {
    constructor(client) {
        super(client, {
            name: 'banlist',
            aliases: ['log'],
            group: 'moderation',
            memberName: 'banlist',
            description: 'Gives a list of recent warned and banned users',
            examples: ['$banlist'],
            throttling: {
                usages: 1,
                duration: 10
            },
        });
    }

    run(msg) {

       msg.channel.send("Warned users: " + warned + "\nBanned users: " + banlist);


    }
}







