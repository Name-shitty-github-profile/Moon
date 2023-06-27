const {
    EmbedBuilder,
    PermissionsBitField,
    ApplicationCommandOptionType
} = require('discord.js');
const remove = require(`${process.cwd()}/databasewrapper/remove`);
const add = require(`${process.cwd()}/databasewrapper/add`);
const search = require(`${process.cwd()}/databasewrapper/search`);
module.exports = {
    name: "antilink",
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
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply({ content: "Tu n'as pas la permissions pour performer cette action.", ephemeral: true});
            return;
        }
        let status = interaction.options.getBoolean('actif');
        const file = `antilink/${interaction.guild.id}`;
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
                .setTitle("Antilink")
                .setColor("#00FF00")
                .setDescription("Le système antilink est maintenant actif ! ✅")
                .setTimestamp();
            await interaction.reply({ embeds: [embed]});
            return;
        }
        remove(file);
        let embed = new EmbedBuilder()
                .setTitle("Antilink")
                .setColor("#FF0000")
                .setDescription("Le système antilink est maintenant inactif ! ❌")
                .setTimestamp();
            await interaction.reply({ embeds: [embed]});
    }
};