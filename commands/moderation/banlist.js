const { Command } = require('discord.js-commando');
    constructor(client) {
        super(client, {
            name: 'banlist',
            group: 'moderation',
            memberName: 'banlist',
            throttling: {
                usages: 1,
                duration: 10
            },
        });
    }




    }
}







