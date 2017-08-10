//Set up dependencies
const { Command } = require('discord.js-commando');
const path = require('path');

//Allow access to this command
module.exports = class ReplyCommand extends Command {
    //Set up command data
    constructor(client) {
        super(client, {
            name: 'poll',
            group: 'trivia',
            memberName: 'poll',
            description: 'Starts a poll.',
            examples: ['startpoll what you want the poll to be about?'],
            args: [
                {
                    key: "topic",
                    prompt: "What do you want start a poll about?",
                    type: "string"
                }
            ]
        });
    }

    //The action part of the command
    async run(message, args) {
        //Check if the poll contains a question mark at the end
        if (message.content.endsWith(`?`) === false) {
            //Add a question mark to the end
            const { topic } = args;
            global.questionMark = '?';
            global.messageWithQuestionMark = topic + global.questionMark;
        }
        else if (message.content.endsWith(`?`) === true) {
            //It already has a question mark, so keep it the same
            const { topic } = args;
            global.messageWithQuestionMark = topic;
        }

        message.say(`:ballot_box:  <@${message.author.id}> started a vote! React to my next message to vote on it. :ballot_box: `);
        //Add the voting reactions
        const pollTopic = await message.say(global.messageWithQuestionMark);
        pollTopic.react(`✅`);
        pollTopic.react(`⛔`);
    }


};