const { ApplicationCommand } = require('discord.js');

module.exports = async (client, commands, options = {
    guildId: null
}) => {
    const ready = client.readyAt ? Promise.resolve() : new Promise(resolve => client.once('ready', resolve));
    await ready;
    const currentCommands = await client.application.commands.fetch(options.guildId && { guildId: options.guildId });
    console.log(`Synchronizing commands...\nCurrently ${currentCommands.size} commands are registered to the bot.`);
    const deletedCommands = currentCommands.filter((command) => !commands.some((c) => c.name === command.name)).toJSON();
    for (let deletedCommand of deletedCommands) {
        await deletedCommand.delete();
    }
    console.log(`Deleted ${deletedCommands.length} commands!`);
    const newCommands = commands.filter((command) => !currentCommands.some((c) => c.name === command.name));
    for (let newCommand of newCommands) {
        await client.application.commands.create(newCommand, options.guildId);
    }
    console.log(`Created ${newCommands.length} commands!`);
    const updatedCommands = commands.filter((command) => currentCommands.some((c) => c.name === command.name));
    let updatedCommandCount = 0;
    for (let updatedCommand of updatedCommands) {
        const newCommand = updatedCommand;
        const previousCommand = currentCommands.find((c) => c.name === updatedCommand.name);
        let modified = false;
        if (!previousCommand.description === newCommand.description) { modified = true; };
        
        if (!ApplicationCommand.optionsEqual(previousCommand.options ?? [], newCommand.options ?? [])) modified = true;
        if (modified) {
            await previousCommand.edit(newCommand);
            updatedCommandCount++;
        }
    };
    console.log(`Updated ${updatedCommandCount} commands!`);
    console.log(`Commands synchronized!`);
};