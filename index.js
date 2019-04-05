const auth = require('./auth.json');

const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Ready to work!");
});

client.on('message', msg => {
    if(msg.guild.available)
    {
        var text = msg.content;
        var channel = msg.channel;
        if(text.substr(0, 1) === '!')
        {
            var args = text.substr(1).split(' ');
            var cmd = args[0];

            args = args.splice(1);
            switch(cmd)
            {
                case 'r':
                    var item = args[0];
                    var quantity = parseInt(args[1]);
                    if(args.length == 2 && !isNaN(quantity))
                    // Notify creation of the request by direct message.
                    var requestChannel = msg.guild.channels.find(channel => channel.id === '561162325403369482');
                    requestChannel.send(msg.member.nickname + ' vient de créer une requête pour ' + quantity + " x " + item + ' !');
                break;
                case 'd':

                break;
            }
        }
    }
});

client.login(auth.token);