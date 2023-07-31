module.exports = {
    name: "kick",
    description: "Expulser quelqu'un",
    options: [
        {
            name: "membre",
            description: "le member que vous voulez expulser",
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: "raison",
            description: "la raison du kick",
            required: false,
            type: ApplicationCommandOptionType.String
        }
    ],
    func: async function(client, interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            await interaction.reply({ content: "Tu ne possède pas les permissions pour faire cela.", ephemeral:true });
            return;
        }
        const member = interaction.guild.members.cache.get(interaction.options.get("membre").user.id)
        if (!member) {
            await interaction.reply({ content: "Je n'ai pas pu trouver le membre...", ephemeral: true });
            return;
        }
        if (member.user.id === interaction.member.id) { 
            await interaction.reply({ content: "Tu ne peux pas t'expulser toi même", ephemeral: true });
            return; 
        }
        if (interaction.member.roles.highest.position < member.roles.highest.position) {
            await interaction.reply({ content: "Tu ne possède pas les permissions pour faire cela.", ephemeral:true });
            return;
        }
        const raison = interaction.options.getString("raison");
        if (!raison) {
            try {
                await member.send({ content: `Bonjour👋!\nTu viens de te faire expulser de ${interaction.guild.name} par ${interaction.member.user.username}!`});
            } catch (e) {}
            raison = `Kick par ${interaction.member.user.username}!`;
        } else {
            try {
                await member.send({ content: `Bonjour👋!\nTu viens de te faire expulser de ${interaction.guild.name} par ${interaction.member.user.username}!\nPour la raison suivante : ${raison}`});
            } catch (e) {}
            raison += `\nKick par ${interaction.member.user.username}!`;
        }
        await member.kick({ reason: raison});
        await interaction.reply(`Le membre ${member.username} s'est bien fait expulser du serveur!`);
    }
};