const {Command} = require("discord.js-commando")

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fight',
            group: 'rp',
            memberName: 'fight',
            description: 'Fight some enemies.',
            examples: ["fight", 'fight boar'],
            args: [
                {
                    key: "enemy",
                    prompt: "Which enemy do you want to attack?",
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    run(msg) {
        if (msg.channel.parentID == 456391975630012428 || msg.channel.id == this.client.bso.debugChannel){
            //TODO
        }
    }
};