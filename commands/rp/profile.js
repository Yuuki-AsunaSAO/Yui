const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'profile',
			group: 'rp',
			memberName: 'profile',
			description: 'Show what Yui knows about you.',
			examples: ['profile'],
		});
	}

	run(msg) {
		if (msg.guild === null || msg.channel.parentID == 456391975630012428 || msg.channel.id == this.client.bco.debugChannel) {
			msg.embed(new Discord.RichEmbed()
				.setTitle(msg.author.tag + '\'s profile!')
				.setDescription(`Your current health is: ${this.client.sao[msg.author.id].playerHealth}/${this.client.sao[msg.author.id].maxPlayerHealth}`)
				.setColor(this.client.getRandomColor())
			);
		}
	}
};