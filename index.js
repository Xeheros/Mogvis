const auth = require('./auth.json');

const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    //console.log("Ready to work!");
});

client.on('message', msg => {
    var text = msg.content;
    var channel = msg.channel;
    if(text.substr(0, 1) === '!')
    {
        var args = text.substr(1).split("[^\\s\"']+|\"([^\"]*)\"|'([^']*)'");
        var cmd = args[0];

        console.log(args);

        args = args.splice(1);
        switch(cmd)
        {
            case 'r':
                var item = args[0];
                try
                {
                    var quantity = parseInt(args[1]);
                    if(args.length == 2 && !isNaN(quantity))
                    {
                        // Notify creation of the request by direct message.
                        var requestsChannel = msg.guild.channels.find(channel => channel.id === '561162325403369482');
                        requestsChannel.send(msg.member.displayName + ' vient de créer une requête pour ' + quantity + " x " + item + ' !');
                    }
                    else
                    {
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
});

client.login(auth.token);