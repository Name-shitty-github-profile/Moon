const {
    EmbedBuilder,
    PermissionsBitField,
    ApplicationCommandOptionType
} = require('discord.js');
const remove = require("../../../databasewrapper/remove");
const add = require("../../../databasewrapper/add");
module.exports = {
    description: "Le système antilink",
    options: [
        {
            name: "actif",
            description: "Est ce que le système antilink est actif?",
            required: false,
            type: ApplicationCommandOptionType.Boolean,
            choices: [
                { name: "Oui", value: true },
                { name: "Non", value: false }
            ]
        }
    ],
    func: async (client, interaction) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply({ content: "Tu n'as pas la permissions pour performer cette action.", ephemeral: true});
            return;
        }
        const status = interaction.options.getBoolean('actif');
        const file = `antilink/${interaction.guild.id}`;
        if (status) {
            add(file, {status: true});
            let embed = new EmbedBuilder()
                .setTitle("Antilink")
                .setColor("#00FF00")
                .setAuthor({
                    name: interaction.user.name,
                    iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`
                })
                .setDescription("Le système antilink est maintenant actif ! ✅")
                .setTimestamp();
            await interaction.reply({ embeds: [embed]});
        }
        remove(file);
        let embed = new EmbedBuilder()
                .setTitle("Antilink")
                .setColor("#FF0000")
                .setAuthor({
                    name: interaction.user.name,
                    iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`
                })
                .setDescription("Le système antilink est maintenant inactif ! ❌")
                .setTimestamp();
            await interaction.reply({ embeds: [embed]});
    }
};