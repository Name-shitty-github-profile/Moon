const { ApplicationCommand } = require('discord.js');

module.exports = async (client, commands, options = {
    guildId: 1122982249168638032
}) => {
    const ready = client.readyAt ? Promise.resolve() : new Promise(resolve => client.once('ready', resolve));
    await ready;
    console.log(`Synchronizing commands...`);
    
    const newCommands = commands;
    for (let newCommand of newCommands) {
        await client.application.commands.create(newCommand);
    }
    console.log(`Created ${newCommands.length} commands!`);
    console.log(`Commands synchronized!`);
};