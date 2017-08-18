const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reply',
            group: 'text',
            memberName: 'reply',
            description: 'Replies with a Message.',
            examples: ['reply']
        });
    }
    run(msg) {
     const responses = [
        "Hello?","Who are you?","I have been summoned?","make your wish","yes Master?","My name is Jeff","Goodbye","...","Let me sleep...","Why do I even bother to reply", "Congrats you have succesfully subscribed to random cat facts","THIS IS SPARTAAAAAA","Huh, where am I?","Scotty, Beam me up","Leave me alone, I am busy"]

   msg.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
   msg.delete();

    }
};