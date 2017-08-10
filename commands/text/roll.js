const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            aliases: ['randomize'],
            group: 'text',
            memberName: 'roll',
            description: 'rolls a random number between 1 and the number given by the user',
            examples: ['roll 500'],
            args: [
                {
                    key: 'MinNumber',
                    prompt: 'Please fill in the lowest possible number for the randomizer',
                    type: 'integer'
                },
                {
                    key: 'MaxNumber',
                    prompt: 'Please fill in the highest possible number for the randomizer',
                    type: 'integer',
                }
            ]
        });

    }
    run(msg, args) {
        const { MinNumber, MaxNumber } = args;

        var number = Math.floor(Math.random()*(MaxNumber - MinNumber + 1) + MinNumber);
        return msg.say('You have rolled a ' + number);
    }

}
