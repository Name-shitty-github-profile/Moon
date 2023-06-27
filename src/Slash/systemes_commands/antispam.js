const {
    EmbedBuilder,
    PermissionsBitField,
    ApplicationCommandOptionType
} = require('discord.js');
const remove = require(`${process.cwd()}/databasewrapper/remove`);
const add = require(`${process.cwd()}/databasewrapper/add`);
const search = require(`${process.cwd()}/databasewrapper/search`);
module.exports = {
    name: "antispam",
    description: "Le système antispam",
    options: [
        {
            name: "actif",
            description: "Est ce que le système antispam est actif?",
            required: false,
            type: ApplicationCommandOptionType.Boolean,
            choices: [
                { name: "Oui", value: true },
                { name: "Non", value: false }
            ]
        }
    ],
    func: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply({ content: "Tu n'as pas la permissions pour performer cette action.", ephemeral: true});
            return;
        }
        let status = interaction.options.getBoolean('actif');
        const file = `antispam/${interaction.guild.id}`;
        if (status === null) {
            if (search(file)) {
                status = false;
            } else {
                status = true;
            }
        }
        if (status) {
            add(file, {status: true});
            let embed = new EmbedBuilder()
                .setTitle("Antispam")
                .setColor("#00FF00")
                .setDescription("Le système antispam est maintenant actif ! ✅")
                .setTimestamp();
            await interaction.reply({ embeds: [embed]});
        }
        remove(file);
        let embed = new EmbedBuilder()
                .setTitle("Antispam")
                .setColor("#FF0000")
                .setDescription("Le système antispam est maintenant inactif ! ❌")
                .setTimestamp();
            await interaction.reply({ embeds: [embed]});
    }
};