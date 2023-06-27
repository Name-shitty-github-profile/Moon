const {
    ApplicationCommandOptionType
} = require('discord.js');
const add = require(`${process.cwd()}/databasewrapper/add`);
const search = require(`${process.cwd()}/databasewrapper/search`);
const { owners } = require(`${process.cwd()}/privates_files/config`);
module.exports = {
    name: "blacklist",
    description: "Blacklist un membre",
    options: [
        {
            name: "membre_id",
            description: "l'id du membre",
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    func: async (client, interaction) => {
        if (!owners.includes(interaction.user.id)) {
            await interaction.reply({ content: "Tu n'as pas la permissions pour performer cette action.", ephemeral: true});
            return;
        }
        const member_id = interaction.options.getString("membre_id");
        const file = `blacklist/${member_id}`;
        if (search(file)) {
            await interaction.reply({ content: "Ce membre est déja blacklist.", ephemeral: true});
        }
        add(file, { status: true});
        await interaction.reply(`L'utilisateur <@${member_id}> est maintenant blacklist!`);
    }
};