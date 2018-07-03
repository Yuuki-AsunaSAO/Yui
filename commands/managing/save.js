const { Command } = require('discord.js-commando');
const fs = require('fs');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'save',
			group: 'managing',
			memberName: 'save',
			description: 'Saves the data to a file.',
			examples: ['save'],
		});
	}

	run(msg) {
		fs.writeFile('./sao.json', JSON.stringify(this.client.sao, null, 4), (err) => {
			if (err) console.log(err);
		});
		fs.writeFile('./alo.json', JSON.stringify(this.client.alo, null, 4), (err) => {
			if (err) console.log(err);
		});
		fs.writeFile('./ggo.json', JSON.stringify(this.client.ggo, null, 4), (err) => {
			if (err) console.log(err);
		});
		fs.writeFile('./bco.json', JSON.stringify(this.client.bco, null, 4), (err) => {
			if (err) console.log(err);
		});

		return msg.reply('Successfully saved file changes!');
	}
};