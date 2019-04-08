const config = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();
const { Users, Requests } = require('./dbObjects');
const { Op } = require('sequelize');
const test = new Discord.Collection();

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
                    switch(params[0])
                    {
                        case 'config':

                        break;
                        case 'version':
                            var botsChannel = msg.guild.channels.find(channel => channel.name.includes("bot"));
                            botsChannel.send("Je suis actuellement en version " + config.version + ", kupo !");
                        break;
                    }
                break;
            }
        }
    }
    
});

client.on('guildMemberAdd', member => {
    member.send("Bienvenue chez les " + member.guild.name + ", kupo !");
});

client.login(config.token);