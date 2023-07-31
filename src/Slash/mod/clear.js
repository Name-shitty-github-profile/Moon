module.exports = {
    name: "clear",
    description: "Supprimer des messages",
    options: [
        {
            name: "nombre",
            description: "le nombre de messages",
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    func: async function(client, interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            await interaction.reply({ content: "Tu ne possède pas les permissions pour faire cela.", ephemeral:true });
            return;
        }
        const numberx = interaction.options.getNumber("nombre") + 1;
        if (numberx > 98) { 
            await interaction.reply({ content: data.clear_max_message_limit }) 
            return;
        };
        await interaction.channel.bulkDelete(numberx, true);
        await interaction.reply({content: `${numberx} messages ont été supprimés!`});
    }
};