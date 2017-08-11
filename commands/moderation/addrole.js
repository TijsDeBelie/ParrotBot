
const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addrole',
            aliases: ['role'],
            group: 'moderation',
            memberName: 'addrole',
            description: 'adds a role to the mentionned user',
            examples: ['addrole @User rank'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want the rank to apply to?',
                    type: 'user'
                },
                {
                    key: 'rank',
                    prompt: 'wich rank should the mentionned user get?',
                    type: 'rank'

                }
                
                
            ]
        });
}

run(msg, args) {
    if (msg.channel.type !== 'dm')
        if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_ROLES'))
            return msg.say('Error! I don\'t have permission to Manage Roles!');
    const { user, rank } = args;

let role = message.guild.roles.find("name", rank);

// or the person who made the command: let member = message.member;

// Add the role!
user.addRole(role).catch(console.error);

// Remove a role!
user.removeRole(role).catch(console.error);
}
};