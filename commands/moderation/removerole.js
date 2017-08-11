const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'removerole',
            aliases: [''],
            group: 'moderation',
            memberName: 'removerole',
            description: 'remove a role to the mentionned user',
            examples: ['removerole @User rank'],
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
                    prompt: 'wich rank should the mentionned user get removed?',
                    type: 'string'

                }


            ]
        });
    }

    run(msg, args) {
        if (msg.channel.type !== 'dm')
            if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_ROLES'))
                return msg.say('Error! I don\'t have permission to Manage Roles!');
        const { user, rank } = args;

        let role = msg.guild.roles.find("name", rank);

        let userToModify = msg.mentions.members.first();
     
        if (userToModify.removeRole(role).catch(console.error)) {
            return msg.say(userToModify + " has been removed from: " + rank)
        }
    }
};