const { EmbedBuilder } = require('discord.js')

module.exports = async (client, guild) => {
    let embed = new EmbedBuilder()
        .setColor("#00FF00")
        .setTimestamp(guild.joinedTimestamp)
        .setDescription(`**Un nouveau serveur à ajouté Moon !**`)
        .addFields({ name: "🏷️・Nom du serveur", value: `\`${guild.name}\``, inline: true },
            { name: "🆔・ID du serveur", value: `\`${guild.id}\``, inline: true },
            { name: "🌐・Region du serveur", value: `\`${guild.preferredLocale}\``, inline: true },
            { name: "👤・Nombre de membres", value: `\`${guild.memberCount}\` membres`, inline: true },
            { name: "🪝・URL", value: `\`discord.gg/${guild.vanityURLCode || "None"}\``, inline: true })
        .setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`)
        .setFooter({ text: 'Moon', iconURL: client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }) });
    client.channels.cache.get(1123113082407886969).send({ embeds: [embed] }).catch(() => { });
};