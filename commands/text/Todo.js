const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const client = new Discord.Client();
const sql = require("sqlite");
sql.open(appRoot + "./score.sqlite");
module.exports = class Todo extends Command {
    constructor(client) {
        super(client, {
            name: 'todo',
            group: 'text',
            memberName: 'todo',
            description: "see a personal list of todo's or add/remove a task",
            examples: ['$todo [add/remove] [taskname] or $todo to see the list'],
            args: [
                {
                    key: 'method',
                    prompt: 'Do you want to add or remove a task?',
                    type: 'string',
                    default: ""


                },


                {
                    key: 'task',
                    prompt: 'what task do you want to add?',
                    type: 'string',
                    default: ""
                }
            ]
        });
    }

    run(msg, args) {
        const { method, task } = args;
        if (task == "" && method == "") {
            sql.all(`SELECT task FROM todo WHERE userId="${msg.author.id}"`).then(rows => {


                var tasks = rows.map(function (item) {
                    return item['task'];
                });
                    if(tasks == ""){
                        msg.channel.send("Please add something to your todolist first")

                    } else
                    msg.channel.send("Your To-Do list :\n" + tasks);
            });


        } else if (task != "" && method == "add") {


            sql.get(`SELECT * FROM todo WHERE userId="${msg.author.id}"`).then(row => {

                sql.run("INSERT INTO todo (userId, task) VALUES (?, ?)", [msg.author.id, task]);
                msg.reply(`you have added a task \n` + task);

            }).catch(() => {
                console.error;
                sql.run("CREATE TABLE IF NOT EXISTS todo (userId TEXT, task TEXT)").then(() => {
                    sql.run("INSERT INTO todo (userId, task) VALUES (?, ?)", [msg.author.id, task]);
                });
            });


        } else if (task != "" && method == "remove") {
            sql.run(`DELETE FROM todo WHERE task="${task}"`)

            msg.reply(`you have removed \n` + task);

        }
    }
}