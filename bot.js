const config = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();
/*const { Users, Requests } = require('./dbObjects');
const { Op } = require('sequelize');
const test = new Discord.Collection();*/

const CMD_SYMBOL = '!';

client.on('ready', () => {
    console.log("Ready to work!");
});

client.on('message', msg => {
    if(!msg.author.bot)
    {
        var text = msg.content;
        var channel = msg.channel;
        if(text.startsWith(CMD_SYMBOL))
        {
            var regexp = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
            var args = text.substr(1).match(regexp);
            var params = args.splice(1);
            var cmd = args[0];

            for(var i = 0 ; i < params.length ; i++)
            {
                params[i] = params[i].replace(/\"/g, "")
            }

            switch(cmd)
            {
                case 'r':
                    var item = params[0];
                    try
                    {
                        var quantity = parseInt(params[1]);
                        if(params.length == 2 && !isNaN(quantity))
                        {
                            // Notify creation of the request on the requests channel.
                            var requestsChannel = msg.guild.channels.find(channel => (channel.name.includes("request") || channel.name.includes("requête")));
                            requestsChannel.send(msg.member.displayName + ' a besoin de ' + quantity + " x " + item + '.').then(
                                function (botMsg)
                                {
                                    const filter = (reaction, user) => {
                                        return ['✅'].includes(reaction.emoji.name);
                                    };
                                    botMsg.react('✅').then(() => botMsg.awaitReactions(filter).then(collected => {
                                        const reaction = collected.first();
                                        
                                        reaction.user.send("Tu as réagis avec " + reaction.name);
                                    }));
                                }
                            ).catch(function()
                            {
                                msg.reply("L'annonce n'a pas pu être envoyée !");
                            });

                        }
                        else
                        {
                            msg.reply('Vous avez envoyé trop d\'arguments (' + params.length + '), 2 étaient attendus (objet, quantité).');
                        }
                    }
                    catch(error)
                    {
                        console.error(error);
                        msg.reply("Une erreur est survenue durant le traitement de cette commande.");
                    }
                break;
                case 'd':

                break;
                case 'm':
                    var botsChannel = msg.guild.channels.find(channel => channel.name.includes("bot"));
                    switch(params[0])
                    {
                        case 'ping':
                            msg.reply("tu es en retard de " + client.ping + "ms, kupo !");
                        break;
                        case 'uptime':
                            botsChannel.send("Je suis réveillé depuis " + readifyTime(client.uptime) + ", kupopo...");
                        break;
                        case 'version':
                            botsChannel.send("Je suis actuellement en version " + config.version + ", kw... euh... kupo !");
                        break;
                    }
                break;
            }
        }
        else if(text.toLowerCase().includes("chocolatine") && msg.member.id != msg.guild.ownerID)
        {
            try
            {
                var currentNickName = msg.member.displayName;
                msg.member.setNickname('Chocopabo', 'Hérétisme envers le Saint Pain au chocolat !');
                msg.reply("et crois-tu qu'Éorzéa est plate, kupo ?");
                setTimeout(() => msg.member.setNickname(currentNickName), config.timers.chocolatine);
            }
            catch(error)
            {
                console.error(error);
            }
        }
    }
    
});

function readifyTime(uptime)
{
    var readifiedTime = "";
    var hours = 0;
    var minutes = 0;
    var seconds = Math.floor(uptime / 1000);

    if(seconds > 60)
    {
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        if(minutes > 60)
        {
            hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
        }
    }

    readifiedTime = (hours > 0 ? hours + " heure" + (hours > 1 ? "s" : "") : "")
                    + (minutes > 0 ? (hours > 0 ? ", " : "") + minutes + " minute" + (minutes > 1 ? "s" : "") : "")
                    + (seconds > 0 ? (hours > 0 || minutes > 0 ? " et " : "") + seconds + " seconde" + (seconds > 1 ? "s" : "") : "")

    return readifiedTime;
}

client.on('guildMemberAdd', member => {
    member.send("Bienvenue chez les " + member.guild.name + ", kupo !");
});

client.login(config.token);