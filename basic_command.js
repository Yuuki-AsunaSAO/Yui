const {Command} = require("discord.js-commando")

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'name',
            group: 'group',
            memberName: 'name',
            description: 'Gives an example template.',
            examples: ['example arg arg'],
            args: [
                {
                    key: "sides",
                    prompt: "How many sides should the die have?",
                    type: "integer"
                }
            ]
        });
    }

    run(msg) {
        return null
    }
};