const { Command } = require('discord.js-commando');

module.exports = class prune extends Command {
    constructor(client) {
        super(client, {
            name: 'prune',
            group: 'moderation',
            memberName: 'prune',
            description: 'cleans the amount of messages specified',
            args: [{
                key: "number",
                prompt: "You must specify how many messages to clear",
                type: "integer",
                validate: m => {
                    if (m < 100 || m > 1) return true;
                    return 'Please specify a number between 2 and 100.'
                }
            }]
        });
    }

    async run(message, args) {

        let { number } = args

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {

            return message.channel.send('You don\'t have permission to manage messages')

        }

        message.channel.fetchMessages({ limit: number }).then(messages => {
            message.channel.bulkDelete(messages)
            msg.say(`Purged ${messages.size} messages.`)
            return;
        })
    }
}
