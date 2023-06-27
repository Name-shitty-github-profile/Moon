const get = require('../../databasewrapper/get');
const { Client, Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
module.exports = async function(client, guild, event, content) {
    const someinfo = get(`log_channel/${guild.id}`)
    if (!someinfo) return;
    let Msgchannel = client.channels.cache.get(someinfo);
    if (!Msgchannel) return;
    let logsEmbed = new EmbedBuilder()
            .setTitle(event)
            .setColor("#000000")
            .setAuthor({
                name: guild.name,
                iconURL: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
            })
            .setDescription(content)
            .setTimestamp();
    await Msgchannel.send({embeds: logsEmbed});
}