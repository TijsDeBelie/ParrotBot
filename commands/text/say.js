const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['repeat', 'echo', 'parrot'],
            group: 'text',
            memberName: 'say',
            description: 'Replies with the text you provide.',
            examples: ['say Hi there!'],
            guildOnly: true,
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, args) {
        const { text } = args;
        msg.delete();


        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        var t = msg.content;

        if (t.match(regex)) {

            msg.delete();
            msg.channel.send("Urls are not allowed")

        } else {

            return msg.say(`\u180E${text}`);
        }
    }
};