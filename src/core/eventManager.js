const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const eventFiles = fs.readdirSync(path.resolve(__dirname, '..', 'Events')).filter(file => file.endsWith('.js'));
    let i = 0;
    for (const file of eventFiles) {
        const event = require(path.resolve(__dirname, '..', 'Events', file));
        const eventName = file.split('.')[0];
        i++; client.on(eventName, event.bind(null, client));
    };
    console.log(`Event : ${i} has been loaded!`);
};