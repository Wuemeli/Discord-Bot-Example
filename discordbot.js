const Discord = require('discord.js');
const client = new Discord.Client();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./config.json');

const commands = [{
    name: 'ping',
    description: 'Replies with Pong!'
}];
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready'), () => {
    console.log('Ready!');
}

client.on('interactionCreate'), async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
}

client.login(token);


