
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
                    type: 'string'

                }


            ]
        });
    }

    run(msg, args) {
        const { user, rank } = args;
        let role = msg.guild.roles.find("name", rank);
            if (!msg.member.hasPermission('MANAGE_ROLES'))
                return msg.say('Error! I don\'t have permission to Manage Roles!');
            else {


                
                let userToModify = msg.mentions.members.first();

                try {

                    if (userToModify.addRole(role).catch(console.error)) {
                        return msg.say(userToModify + " has been added to: " + rank)
                    }


                } catch (ex) {

                    console.log(ex.stack);
                    msg.say("this command could not be executed, please make sure you are not adding a role to a bot or adding a role higher than your current role!")

                }
            }



    }
};