const { Client } = require('discord.js');
const { token } = require(`${process.cwd()}/privates_files/config`)
const settings = require('./settings');
const client = new Client({intents: settings.Intents, partials: settings.Partials, ws: {properties: {browser: 'Discord iOS'}}});
require('../core')(client);
client.login(token);