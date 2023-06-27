const {
    PermissionsBitField,
    ApplicationCommandOptionType
} = require('discord.js');
const update = require(`${process.cwd()}/databasewrapper/add`);
module.exports = {
    name: "salon_de_log",
    description: "Le salon de log",
    options: [
        {
            name: "salon",
            description: "Salon de log",
            required: true,
            type: ApplicationCommandOptionType.Channel
        }
    ],
    func: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply({ content: "Tu n'as pas la permissions pour performer cette action.", ephemeral: true});
            return;
        }
        const channel_id = interaction.options.getChannel("salon");
        update(`log_channel/${interaction.guild.id}`, { id: channel_id});
        await interaction.reply(`Le salon de log est maintenant <#${channel_id}>!`);
    }
};