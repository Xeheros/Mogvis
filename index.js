const config = require('./config.json');

const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Ready to work!");
});

client.on('message', msg => {
    if(!msg.author.bot)
    {
        var text = msg.content;
        var channel = msg.channel;
        if(text.substr(0, 1) === '!')
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
                            // Notify creation of the request by direct message.
                            var requestsChannel = msg.guild.channels.find(channel => (channel.name.includes("request") || channel.name.includes("requête")));
                            requestsChannel.send(msg.member.displayName + ' a besoin de ' + quantity + " x " + item + '.').then(
                                function (botMsg)
                                {
                                    botMsg.react("✅");
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