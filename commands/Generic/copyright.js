const {Command} = require("discord.js-commando")
const Discord = require('discord.js')

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'copyright',
            group: 'generic',
            memberName: 'copyright',
            description: 'Copyright info on Yui.',
            examples: ['copyright']
        });
    }

    async run(msg) {
        let Asuna = await this.client.fetchUser("365452203982323712")
        msg.embed(
            new Discord.RichEmbed()
            .setDescription("\nTHE SOFTWARE IS PROVIDED 'AS IS' AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE. \n\nCopyright © 2018 Asuna#3119, All rights reserved")
            .setFooter("Asuna#3119", Asuna.avatarURL)
            .setColor(this.client.getRandomColor())
        )
    }
};