const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const bot = new CommandoClient({
    commandPrefix: "!",
    unknownCommandResponse: false,
    owner: ["270622806520102913", "399494016539820032", "365452203982323712"],
    disableEveryone: true
});

const sao = require('./sao.json');
const alo = require('./alo.json');
const ggo = require('./ggo.json');
const bco = require('./bco.json');

bot.sao = sao
bot.alo = alo
bot.ggo = ggo
bot.bco = bco

bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['managing', 'Managing commands'],
        ["rp", "Roleplaying commands"],
        ["generic", "General commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

bot.on('ready', async() => {

    console.log(`Login as ${bot.user.username} succesfull!`);

    let statuses = ["Developing! Yui-help", "I love mama!", "I love papa!"]
    bot.user.setActivity(statuses[0]);

    setInterval(() =>{

        statuses = statuses.slice(1).concat([statuses[0]])

        bot.user.setActivity(statuses[0]);
        
        //console.log("Set Activity to: "+ statuses[0]);


    }, 60000)

});

bot.on("message", message =>{
    if (message.channel.parentID == 456391975630012428 || message.channel.id == bco.debugChannel) {

        if (!sao[message.author.id] && !message.author.bot){

            message.reply("Hey! I created a profile for you! you didn't seem to have one!");

            sao[message.author.id] = {
                playerXp: 0,
                playerLevel: 1,
                playerHealth: 100,
                PlayerMaxHealth: 100,
                playerCor: 150,
                playerInventory: [],
                playerTotalXp: 0,
                playerKills: 0,
                playerDamage: 10,
                enemyCurrent: "none",
                enemyCurrentHP: 0,
                enemyMaxHP: 0,
                enemyDamage: 0,
            }

            fs.writeFile("./sao.json", JSON.stringify(sao), err => {

                if (err) console.log(err);    

            });
        }
    }
})

bot.getRandomColor = () => {
    return "#" + Math.floor(Math.random()* (256 ** 3)).toString(16)
}

bot.login("NDI4MTI3ODY4ODcwOTgzNjgw.DhUtVg.qyBWkM5UkR5UV9peQxcMqEhadSY");