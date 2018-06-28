const commando = require('discord.js-commando');
const Discord = require('discord.js');
const bot = new commando.Client({
    disableEveryone: true,
    unknownCommandResponse: false
});
const botconfig = require('./botconfig.json');
const sao = require('./sao.json');
const alo = require('./alo.json');
const ggo = require('./ggo.json');
const fs = require('fs');
const commandList = ["help", "fight", "hi", "check", "roadmap"];

bot.on('ready', async() => {

    console.log(`Login as ${bot.user.username} succesfull!`);

    let statuses = ["Developing! Yui-help", "I love mama!", "I love papa!"]
    bot.user.setActivity(statuses[0]);

    setInterval(() =>{

        statuses = statuses.slice(1).concat([statuses[0]])

        bot.user.setActivity(statuses[0]);
        console.log("Set Activity to: "+ statuses[0]);


    }, 60000)

});

bot.on('message', (message) => {
    
    const prefix = botconfig.prefix;
    const getChannel = message.content;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    // Check if message's are sent by users in the server
    if (message.author.bot) return;
    // Check if channel type is DM
    if (message.channel.type == "dm") return;

    if (command == "help" && message.content.startsWith(prefix)) {

        let helpEmbed = new Discord.RichEmbed()
        .setColor(getRandomColor())
        .setTitle("Yui Command Help")
        .addBlankField(true)
        .addField("Global commands", "These commands can be used anywhere")
        .addField("Command list", "\nYui-hi - say hello to Yui \n Yui-")
        .addBlankField(true)
        .addField("Sword Art Online", "These commands only work in the SAO roleplay!")
        .addField("Command list", "Yui-fight list")

        message.channel.send(helpEmbed);

        message.reply("Work In Progress! If you need any help with my commands, ask WannaBeGamerGirl directly please!");

        return;
    }
    if (message.content.includes("hi") && message.content.includes("yui", "Yui")) {

        let generic = ["Hello!", "Hi there!", "Hey!", "Good day :D", "Greetings!"];
        let papa = ["Hello papa!", "Hi there papa!", "Hey papa!", "Good day papa!", "Greetings papa!"];
        let mama = ["Hello mama!", "Hi there mama!", "Hey mama!", "Good day mama!", "Greetings mama!"];

        let answer = ""

        if (msg.author.id == "399494016539820032") {

            answer = papa[Math.floor(Math.random()*papa.length)]

        }
        else if (msg.author.id == "365452203982323712") {

            answer = mama[Math.floor(Math.random()*mama.length)]

        }
        else {

            answer = generic[Math.floor(Math.random()*generic.length)]

        }

        return msg.reply(answer)

    }

    if (command == "save" && message.member.hasPermission("ADMINISTRATOR") && message.content.startsWith(prefix)) {
        
        fs.writeFile("./sao.json", JSON.stringify(sao), (err) => {
            if (err) console.log(err);            
        });
		
        fs.writeFile("./alo.json", JSON.stringify(alo), (err) => {
            if (err) console.log(err);         
        });
		
        fs.writeFile("./ggo.json", JSON.stringify(ggo), (err) => {
            if (err) console.log(err);
        });
		
        fs.writeFile("./botconfig.json", JSON.stringify(botconfig), (err) => {
            if (err) console.log(err);
        });
		
        return message.reply("Successfully saved file changes!");

    }

    if (command == "roadmap" && message.content.startsWith(prefix)) {

        if (args[0] == "add") {

            var featureToAdd = args.join(" ").slice("4");

            if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("ERROR! You are not an administrator!");

            botconfig.roadMap.push(featureToAdd);
            message.reply("Successfully added planned feature!")

        } else if (args[0] == "remove") {

            var featureToRemove = args.join(" ").slice("7");

            for (var g = botconfig.roadMap.length; g >= 0; g--) {
                if (botconfig.roadMap[g] == featureToRemove) {

                    botconfig.roadMap.splice(g, 1);

                }
            }

            message.reply("Successfully removed planned feature!")

        } else  {

            var roadMap = botconfig.roadMap
            var roadMapMessage = "What my mommy is planning to implement soon is:\n"
            
            if (roadMap.length <= 0) return message.reply("There are currently no planned new features!");

            for (var c = 0; c < roadMap.length; c++) {

                roadMapMessage += roadMap[c] + "\n"

            }

            message.reply(roadMapMessage);

            return;
        }
    }

    if (command == "copyright" && message.content.startsWith(prefix)) return message.reply("\nTHE SOFTWARE IS PROVIDED 'AS IS' AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE. \n\nCopyright © 2018 Asuna#3119, All rights reserved");

    // Variable declarations
    const getCategory = message.channel.parentID;
    const csao = "456391975630012428";
    const cafo = "456392015412854796";
    const cggo = "456413358556577792";


    if (message.channel.id == 460837086996594689) {

        //,docs textchannel#settopic

    }

    // SAO section
    if (getCategory == csao || message.channel.id == botconfig.debugChannel) {

        if (!sao[message.author.id]){

            if (message.author.bot) return;

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

            fs.writeFile("./sao.json", JSON.stringify(sao), (err) => {

                if (err) console.log(err);    

            });
        }
        

    if (command == "fight" && message.content.startsWith(prefix)) {

        var getLevel = sao[message.author.id].enemyLevel;
        var getPlayerLevel = sao[message.author.id].playerLevel;

        if (args[0] == "Boar" || args[0] == "boar") {
            
            // Boars do 10 to 15 damage if their strike hits
            // Boars have 100HP multiplied by their level on a 1.1 scale (meaning a level 2 boar does 1.2X damage)
            // Boars can only be killed on floor 1

            if (message.channel.id == "456433914999996437" || message.channel.id == botconfig.debugChannel && sao[message.author.id].enemyCurrent != "Boar") {

                var randomBoarLevel = Math.floor(Math.random() * 12 + 1);
                
                sao[message.author.id].enemyLevel = randomBoarLevel;

                var boarGetHP = sao[message.author.id].enemyLevel * 2.5 + 50;           

                sao[message.author.id].enemyCurrent = "Boar";          
                sao[message.author.id].enemyCurrentHP = boarGetHP;
                sao[message.author.id].enemyMaxHP = boarGetHP;

                return message.reply("You started a fight with a Boar level: " + sao[message.author.id].enemyLevel + ", to attack this creature again, simply use yui-fight untill it dies! Watch your health!");
            
            } else {

                return message.reply("ERROR! My cardinal system says you're already fighting this creature! Use yui-fight instead!");

            }

        } else {

            if (sao[message.author.id].enemyCurrent == "none") return message.reply("ERROR! My cardinal system says that you're not in combat!");

            

            var boarAttacks = ["Oh no! The boar changed his direction, and dodged your attack!", "Oh no!The boar stepped aside, and rushed towards you!", "Oh no! The boar used your movement against you!", "Oh no! You got tired, and the boar used this moment to attack!"];
            var boarIndex = Math.floor(Math.random() * boarAttacks.length);
            var calcPlayerDamage = Math.floor(Math.random() * getPlayerLevel + sao[message.author.id].playerDamage);
            var chanceToHit = Math.floor(Math.random() * 100 +1);

            if (chanceToHit >= 40 && sao[message.author.id].enemyCurrent != "none") {

                message.reply("You attacked a boar! Dealing " + calcPlayerDamage + " Damage!");
                sao[message.author.id].enemyCurrentHP -= calcPlayerDamage;

                console.log("true");

            }
            if (chanceToHit < 40 && sao[message.author.id].enemyCurrent != "none") {

                var boarDamage = getDamage(5, 15);

                message.reply(boarAttacks[boarIndex] + " Dealing " + boarDamage + " Damage!");

                sao[message.author.id].playerHealth -= boarDamage;

                console.log("true");

            }

            if (sao[message.author.id].enemyCurrentHP <= 0 && sao[message.author.id].enemyCurrent != "none") {

                var randomBoarExp = Math.floor(Math.random()* 30 +1);

                enemyKilled(message.author.id);
                levelUp(sao[message.author.id].playerXp, message.author.id);

                return message.reply("You killed a boar! His level was: " + getLevel)
            }
            return;
        }
        return;
    }


    if (command == "profile" && message.content.startsWith(prefix)) {

        if (!args[0]) {

        let profileEmbed = new Discord.RichEmbed()
        .setTitle(message.author.tag + "'s profile!")

        return message.channel.send(profileEmbed);
        } else {



        }

        message.reply("Your current health is: " + sao[message.author.id].playerHealth+ "/" + sao[message.author.id].maxPlayerHealth);

        return;
    }
}

    //TODO

    // AFO section

    // GGO section

//This is the end of bot.on("message", message)
//This is the end of bot.on("message", message)
//This is the end of bot.on("message", message)
//This is the end of bot.on("message", message)
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getDamage(min, max) {
    var randomDamage = Math.floor(Math.random()* max + min);

    return randomDamage;
}

function levelUp(exp, id){
    let levelExp = (sao[id].level^1.5) * 150;
    if (exp >= levelExp) {

        sao[id].playerLevel += 1;
        message.channel.send("Wow! You levelled up! Your new level is: " + sao[message.author.id].playerLevel);

        return;
    }
    return;
}
function enemyKilled(id){

    sao[id].enemyCurrent = "none";
    sao[id].enemyCurrentHP = 0;
    sao[id].enemyMaxHP = 0;
    sao[id].enemyDamage = 0;

    sao[id].playerKills += 1;

    return;
}

var timesSaved = 0
setInterval(function(){

    fs.writeFile("./sao.json", JSON.stringify(sao), (err) => {
        if (err) console.log(err);        
    });

    fs.writeFile("./alo.json", JSON.stringify(alo), (err) => {
        if (err) console.log(err);
    });

    fs.writeFile("./ggo.json", JSON.stringify(ggo), (err) => {
        if (err) console.log(err);
    });

    fs.writeFile("./botconfig.json", JSON.stringify(botconfig), (err) => {
        if (err) console.log(err);
    });
    
    timesSaved++
    console.log("Saved any file changes to Saved: " + timesSaved + " times!");
    
}, 600000);

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
}

bot.login(botconfig.token);