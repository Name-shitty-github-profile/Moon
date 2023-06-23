const { Client } = require('discord.js');
const settings = require('./settings');
const client = new Client({intents: settings.Intents, partials: settings.Partials, ws: {properties: {browser: 'Discord iOS'}}});
require('../core')(client);
client.login(require('./../../private_files/config').token);