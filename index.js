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
        console.log("Message sent: " + text);
        if(text.substr(0, 1) === '!')
        {
            var regexp = /([^\s"']+|"([^"]*)")/i;
            var args = text.substr(1).split(regexp);
            var cmd = args[0];

            for(var i = 0 ; i < args.length ; i++)
            {
                console.log("args[" + i + "]: " + args[i]);
            }
            var params = args.slice(1, args.length);
            console.log(params);
            switch(cmd)
            {
                case 'r':
                    var item = args[0];
                    try
                    {
                        var quantity = parseInt(args[1]);
                        if(args.length == 2 && !isNaN(quantity))
                        {
                            console.log("OK");
                            // Notify creation of the request by direct message.
                            var requestsChannel = msg.guild.channels.find(channel => channel.id === config.requestChannel);
                            requestsChannel.send(msg.member.displayName + ' vient de créer une requête pour ' + quantity + " x " + item + ' !');
                        }
                        else
                        {
                            console.log("KO");
                            msg.member.send('Vous avez envoyé trop d\'arguments (' + args.length + '), 2 étaient attendus (objet, quantité).');
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
            }
        }
    }
    
});

client.login(config.token);