const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const fs = require('fs');

const bot = new CommandoClient({
	commandPrefix: '!',
	unknownCommandResponse: false,
	owner: ['270622806520102913', '399494016539820032', '365452203982323712'],
	disableEveryone: true,
});

const sao = require('./sao.json');
const alo = require('./alo.json');
const ggo = require('./ggo.json');
const bco = require('./bco.json');

bot.sao = sao;
bot.alo = alo;
bot.ggo = ggo;
bot.bco = bco;

bot.registry
	.registerDefaultTypes()
	.registerGroups([
		['managing', 'Managing commands'],
		['rp', 'Roleplaying commands'],
		['generic', 'General commands'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

bot.on('ready', async () => {

	console.log(`Login as ${bot.user.username} succesfull!`);

	let statuses = ['Developing! Yui-help', 'I love mama!', 'I love papa!'];
	bot.user.setActivity(statuses[0]);

	setInterval(() =>{

		statuses = statuses.slice(1).concat([statuses[0]]);

		bot.user.setActivity(statuses[0]);

	}, 60000);

});

bot.on('message', async (message) =>{
	if (message.channel.id == 408292100275306496) {
		if (message.content == bco['counting'] + 1) {

			bco['counting']++;

			fs.writeFile('./bco.json', JSON.stringify(bco, null, 2), (err) => {
				if (err) console.log(err);
			});

		}
		else{

			message.delete();
		}

	}
	else if (message.channel.parentID == 456391975630012428 || message.channel.id == bco.debugChannel || !message.guild) {

		if (!sao[message.author.id] && !message.author.bot) {

			message.reply('Hey! I created a profile for you! you didn\'t seem to have one!');

			sao[message.author.id] = {
				playerXp:        0,
				playerLevel:     1,
				playerHP:        100,
				PlayerMaxHP:     100,
				playerCor:       150,
				playerInventory: [],
				playerTotalXp:   0,
				playerKills:     0,
				playerDamage:    10,
				enemyType:       null,
				enemyHP:         null,
				enemyMaxHP:      null,
				enemyDamage:     null,
				enemyLevel:      null,
			};

			fs.writeFile('./sao.json', JSON.stringify(sao, null, 4), err => {

				if (err) console.log(err);

			});
		}
	}
});

bot.getRandomColor = () => {
	return '#' + Math.floor(Math.random() * (256 ** 3)).toString(16);
};

bot.login('NDI4MTI3ODY4ODcwOTgzNjgw.DhUtVg.qyBWkM5UkR5UV9peQxcMqEhadSY');