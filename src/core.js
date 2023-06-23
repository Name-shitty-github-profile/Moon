const eventManager = require('./core/eventManager'),
    slashFetcher = require('./core/slashFetcher');

module.exports = async (client) => {
    client.commands = new Map(),
        client.interactions = new Map(),
        client.register_arr = [];
    eventManager(client),
        slashFetcher(client);
};