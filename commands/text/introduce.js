const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'introduce',
            aliases: ['whois'],
            group: 'text',
            memberName: 'introduce',
            description: 'introduces the bot to the user mentionned',
            examples: ['introduce @User'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to send the DM to?',
                    type: 'user'
                }
                
                
            ]
        });
}

run(msg, args) {
    if (msg.channel.type !== 'dm')
        if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_MESSAGES'))
            return msg.say('Error! I don\'t have permission to Manage Messages!');
    const { user } = args;
    msg.delete();
    return user.send("Hello, I am Parrot Bot created by Eagler1997, please use $help for more information on how to use this bot. \nI am still in developpment so if you encounter any bugs, please let me know \n\nThis is an automated message done by the request of " + msg.author + " !\n\n The bot is in no way responsible for the content this user has sent!");
}
};