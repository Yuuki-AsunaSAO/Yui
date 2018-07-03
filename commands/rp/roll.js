const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			group: 'rp',
			memberName: 'roll',
			description: 'Rolls a die.',
			examples: ['roll 20'],
			args: [
				{
					key: 'sides',
					prompt: 'How many sides should the die have?',
					type: 'integer',
				},
			],
		});
	}

	run(msg, { sides }) {
		return msg.say(`${msg.author.username} rolled a ${Math.floor(Math.random()*sides)+1}`);
	}
};