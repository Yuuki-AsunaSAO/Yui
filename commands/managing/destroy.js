const {Command} = require("discord.js-commando")

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'destroy',
            group: 'managing',
            memberName: 'destroy',
            description: 'Kills the bot.',
            examples: ['destroy']
        });
    }

    run(msg) {
        return this.client.destroy();
    }
};