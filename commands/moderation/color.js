
const { Command } = require('discord.js-commando');

module.exports = class Addrole extends Command {
    constructor(client) {
        super(client, {
            name: 'color',
            group: 'moderation',
            memberName: 'color',
            description: 'changes the color of the rank',
            examples: [''],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: 'rank',
                    prompt: 'what rank should update its color? Do not mention the role',
                    type: 'role'

                },
                {
                    key: 'color',
                    prompt: 'provide the hex color',
                    type: 'string'

                }


            ]
        });
    }

    run(msg, args) {
        const { rank,color} = args;
        
        rank.setColor(color);

    }
};

