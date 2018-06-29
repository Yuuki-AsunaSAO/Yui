const {Command} = require("discord.js-commando")

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roadmap',
            group: 'generic',
            memberName: 'roadmap',
            description: 'Features that are yet to come.',
            examples: ['roadmap'],
            args: [
                {
                    key: "action",
                    type: "string",
                    prompt: "What is it you want to do?",
                    default: "list"
                },
                {
                    key: "content",
                    default: "",
                    prompt: "What is it you want to modify?",
                    type: "string"
                }
            ]
        });
    }

    run(msg, { action, content}) {
        if (action === "list"){
            let roadMap = this.client.bco.roadMap
            
            if (roadMap.length == 0) {

                msg.reply("There are currently no planned new features!");

            }

            let roadMapMessage = "What my is planned to be implemented soon is:\n"

            for (let i = 0; i < roadMap.length; i++) {

                roadMapMessage += roadMap[i] + "\n"

            }

            msg.reply(roadMapMessage);

        }else if (action === "remove"){

            for (let g = this.client.bco.roadMap.length; g >= 0; g--) {
                
                if (this.client.bco.roadMap[g] == content) {

                    this.client.bco.roadMap.splice(g, 1);

                }
            }
            msg.reply("Successfully removed planned feature!")

        }else if (action == "add") {

            if (msg.member){

                if (!msg.member.hasPermission("ADMINISTRATOR")){

                 return msg.reply("ERROR! You are not an administrator!");

                }
            }

            this.client.bco.roadMap.push(content);
            msg.reply("Successfully added planned feature!")

        }else {
            
            msg.reply("That's not a valid action.")

        }
    }
};