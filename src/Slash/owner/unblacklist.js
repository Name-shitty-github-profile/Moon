const {
    ApplicationCommandOptionType
} = require('discord.js');
const remove = require(`${process.cwd()}/databasewrapper/remove`);
const search = require(`${process.cwd()}/databasewrapper/search`);
const { owners } = require(`${process.cwd()}/privates_files/config`);
module.exports = {
    name: "unblacklist",
    description: "Unblacklist un membre",
    options: [
        {
            name: "membre_id",
            description: "l'id du membre",
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    func: async (client, interaction) => {
        if (!owners.has(interaction.member.id)) {
            await interaction.reply({ content: "Tu n'as pas la permissions pour performer cette action.", ephemeral: true});
            return;
        }
        const member_id = interaction.options.getString("membre_id");
        const file = `blacklist/${member_id}`;
        if (!search(file)) {
            await interaction.reply({ content: "Ce membre n'est pas blacklist.", ephemeral: true});
        }
        remove(file);
        await interaction.reply(`L'utilisateur <@${member_id}> n'est maintenant plus blacklist!`);
    }
};