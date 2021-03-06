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
        const { user, rank } = args;
        let role = msg.guild.roles.find("name", rank);
        if (!msg.member.hasPermission('MANAGE_ROLES'))
            return msg.say('Error! You don\'t have permission to revoke ' + rank + ' from ' + user + "!");
        else {


            let userToModify = msg.mentions.members.first();

            try {

                if (userToModify.removeRole(role).catch(console.error)) {
                    msg.delete();
                    return msg.say(userToModify + " has been removed from: " + rank)
                }


            } catch (ex) {

                console.log(ex.stack);
                msg.say("this command could not be executed, please make sure you are not removing a role that has not been assigned to you!")

            }
        }








    }
};
