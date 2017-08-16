const { Command } = require('discord.js-commando');
global.warnlist = [];
module.exports = class Invite extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['hello'],
            group: 'text',
            memberName: 'invite',
            description: 'generates an invitelink',
            examples: ['$invite'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    run(msg, args) {
        msg.channel.createInvite().then(invite =>  
            msg.channel.send(invite.url)
           
        );  
        client.channels.find("name", "log").send(msg.author + " has created an invite");
}

}


