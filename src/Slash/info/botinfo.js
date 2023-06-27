const {
    EmbedBuilder
} = require('discord.js');
const version = "0.0.1";
module.exports = {
    description: "Les informations du bot",
    func: async (client, interaction) => {
        let embed = new EmbedBuilder()
            .setTitle("Information de Moon")
            .setColor("#0000FF")
            .setAuthor({
                name: client.user.name,
                iconURL: `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png`
            })
            .setDescription(`**Contributeurs**\n* Noémie (notnoemie/869826235335843892)\n**Propriétaires**\n* Noémie (notnoemie/869826235335843892)\n* Jack (th3_wanderer/1017564009878270043)\n**Source**\nhttps://github.com/Name-shitty-github-profile/Moon\n**Serveur associé/Support**\nhttps://discord.gg/tpzV3p6wYJ\n**Language**\nLe bot est construit à 100% avec Javascript.\n**Version**\nLa version du bot est la version : ${version}`)
            .setTimestamp();
        await interaction.reply({ embeds: [embed]});
    }
};