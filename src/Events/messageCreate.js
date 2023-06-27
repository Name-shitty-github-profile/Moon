const { PermissionsBitField } = require('discord.js');
const get = require("../databasewrapper/get");
const send = require('../logger/send');
const wait = require('../../utils/wait');
let cache = Map();
let catfetch = false;
async function catch_worker() {
    if (catfetch) return;
    catfetch = true;
    while (true) {
        await wait(600);
        cache = new Map();
    }
}
async function antilink(client, message) {
    const cont = `antilink/${message.guild.id}`;
    if (!cache.get(cont)) {
        if (!get(cont)) return;
        cache.set(cont, true);
    }
    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
    const contentLower = message.content.toLowerCase();
    for (const word of ["https://", "http://", ".com", ".xyz", ".fr", "www.", ".gg", "g/", ".gg/", "youtube.be", "/?"]) {
        if (contentLower.includes(word) && contentLower.length > word.length + 2) {
            await message.delete();
            await send(client, message.guild, "AntiLink", `**Message content**\n\`\`\`\n${message.content}\n\`\`\`\n**Detected**\n\`\`\`\n${word}\n\`\`\`\n**User**\nUsername : ${message.author.username}\nId : ${message.author.id}`);
            return;
        }
    }
}
let spam = Map();
async function antispam(client, message) {
    let cont = `antispam/${message.guild.id}`;
    if (!cache.get(cont)) {
        if (!get(cont)) return;
        cache.set(cont, true);
    }
    let payload = spam.get(`${message.guild.id}/${message.author.id}`);
    if (!payload) {
        spam.set(`${message.guild.id}/${message.author.id}`, {num: 1, messages: [message]});
        await wait(1);
        spam.set(`${message.guild.id}/${message.author.id}`, {num: 0, messages: []})
        return;
    }
    if (payload.num === 4) {
        spam.delete(`${message.guild.id}/${message.author.id}`);
        await message.author.timeout(6.048e+8, "antispam");
        await send(client, message, 'AntiSpam', `**Contents**\n\`\`\`\n${payload.messages.join('\n')}\n**User**\nUsername : ${message.author.username}\nId : ${message.author.id}`);
        for (let i = 0; i < payload.messages.length; i++) {
            try {
                await payload.messages[i].delete();
            } catch (e) {}
        }
    }
    payload.num += 1;
    payload.messages.push(message);
    spam.set(`${message.guild.id}/${message.author.id}`, payload);
}
module.exports = async (client, message) => {
    if (!message.guild || message.author.bot || !message.channel || message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
    await antilink(client, message);
    await antispam(client, message);
    await catch_worker();
};