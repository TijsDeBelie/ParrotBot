const { Command } = require('discord.js-commando');

module.exports = class Addrole extends Command {
    constructor(client) {
        super(client, {
            name: 'server',
            group: 'moderation',
            memberName: 'server',
            description: 'displays how many guilds the bot is in',
            examples: ['$server'],
            throttling: {
                usages: 1,
                duration: 10
            },
            
        });
    }

    run(msg, args) {
       
            if (!msg.member.hasPermission('ADMINISTRATOR')){
                return msg.say('Error! You don\'t have permission to use info');}
            else {

                msg.channel.send(client.guilds.size.toLocaleString() + "\n" + client.guilds.array());
                
            }
        }
};