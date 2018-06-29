const {Command} = require("discord.js-commando")

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hi',
            group: 'generic',
            memberName: 'hi',
            description: 'Say hello to Yui.',
            examples: ['hi']
        });
    }

    run(msg) {

        let generic = ["Hello!", "Hi there!", "Hey!", "Good day :D", "Greetings!"];
        let papa = ["Hello papa!", "Hi there papa!", "Hey papa!", "Good day papa!", "Greetings papa!"];
        let mama = ["Hello mama!", "Hi there mama!", "Hey mama!", "Good day mama!", "Greetings mama!"];

        let answer = ""

        if (msg.author.id == "399494016539820032") {

            answer = papa[Math.floor(Math.random()*papa.length)]

        }
        else if (msg.author.id == "365452203982323712") {

            answer = mama[Math.floor(Math.random()*mama.length)]

        }
        else {

            answer = generic[Math.floor(Math.random()*generic.length)]

        }

        return msg.reply(answer)

    }
};