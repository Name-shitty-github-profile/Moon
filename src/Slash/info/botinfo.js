const {
    EmbedBuilder
} = require('discord.js');
const version = "0.0.1";
module.exports = {
    name: "botinfo",
    description: "Les informations du bot",
    func: async (client, interaction) => {
        let embed = new EmbedBuilder()
            .setTitle("Information de Moon")
            .setColor("#0000FF")
            .addFields(
                { name: 'Contributeurs', value: '* Noémie', inline: true },
                { name: 'Propriétaires', value: '* Noémie\n* Jack', inline: true },
                { name: 'Source', value: '[Github/Moon](https://github.com/Name-shitty-github-profile/Moon)', inline: true },
                { name: 'Serveur associé/Support', value: '[Moonland](https://discord.gg/tpzV3p6wYJ)', inline: true },
                { name: 'Language', value: 'Le bot est construit à 100% avec Javascript.', inline: true },
                { name: 'Version', value: `La version du bot est la version : ${version}`, inline: true },
                { name: "Nombre de serveurs", value: `${client.guilds.cache.size} serveurs`},
                { name: "Nombre de utilisateurs", value: `${client.users.cache.size} utilisateurs`},
                { name: "Nombre de salons", value: `${client.channels.cache.size} salons`}
            )
            .setTimestamp();
        await interaction.reply({ embeds: [embed]});
    }
};