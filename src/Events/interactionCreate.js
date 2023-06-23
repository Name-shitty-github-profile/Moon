module.exports = async (client, interaction) => {
    if (!interaction.isCommand() || !interaction.guild.channels || interaction.user.bot) return;
    const command = client.interactions.get(interaction.commandName);
    if (!command) return interaction.reply({ content: "Connection error.", ephemeral: true });
    try {
        await command.func(client, interaction);
        e = Date.now();
    } catch (e) {
        try {
            await interaction.reply({content: "something went wrong!", ephemeral: true});
        } catch (e) {}
    }
};