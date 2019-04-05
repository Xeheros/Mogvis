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
                    // Notify creation of the request by direct message.
                    //msg.member.send('Il y a ' + msg.guild.channels.size + ' salons sur ce serveur.');
                    msg.member.send('Tu viens de créer une requête !');
                    //channel.send(msg.member.nickname + ' vient de créer une requête !');
                break;
            }
        }
    }
});

client.login(auth.token);