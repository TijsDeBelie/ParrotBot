const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            aliases: ['message'],
            group: 'text',
            memberName: 'dm',
            description: 'Sends a message to the user you mention.',
            examples: ['dm @User Hi there!'],
            throttling: {
            usages: 1,
            duration: 10
            },
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to send the DM to?',
                    type: 'user'
                },
                {
                    key: 'content',
                    prompt: 'What would you like the content of the message to be? Please limit your message to 200 charachters!',
                    type: 'string',
                    validate: text => {
                    if (text.length < 201) return true;
                    return 'Message Content is above 200 characters';
        }    
                }
            ]
        });    
    }

    run(msg, args) {
        if (msg.channel.type !== 'dm')
            if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_MESSAGES'))
        return msg.say('Error! I don\'t have permission to Manage Messages!');
        const { user, content } = args;
        msg.delete();
        return user.send(content + " \n\nThis is an automated message done by the request of " + msg.author + " !\n\n The bot is in no way responsible for the content this user has sent!");
    }
};