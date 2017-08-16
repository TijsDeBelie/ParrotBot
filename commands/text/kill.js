const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
global.warnlist = [];
module.exports = class Kill extends Command {
    constructor(client) {
        super(client, {
            name: 'kill',
            aliases: ['die'],
            group: 'text',
            memberName: 'kill',
            description: 'try it',
            examples: ['$kill'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    run(msg) {
 

        var links = ["http://pa1.narvii.com/6516/e25b263a42813b3e8abd325ee7c75c428bff44ad_hq.gif"
        ,"https://media.giphy.com/media/Ep94i7XsV92ow/giphy.gif"
        ,"https://media.giphy.com/media/5KfqXl7ZCKqgE/giphy.gif"
    ,"https://media.giphy.com/media/MISGabY9Idt3q/giphy.gif"
,"https://media.giphy.com/media/FvLl9h4IN2dEs/giphy.gif"
,"https://media.giphy.com/media/CgXqahHUOj8JO/giphy.gif"
,"https://media.giphy.com/media/9PwxaMmfh1wfS/giphy.gif"
]
          
        var link = links[Math.floor(Math.random() * links.length)]

        const embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setImage(link)
        .setTitle("THEY TRYING TO KILL ME!!!!!!")
      msg.channel.send({ embed });
       

      

}

}
















