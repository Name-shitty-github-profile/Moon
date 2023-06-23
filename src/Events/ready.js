const slashSync = require('../core/slashsync');

const { ApplicationCommandType, ActivityType } = require('discord.js');
module.exports = async (client) => {
    await slashSync(client, client.register_arr.map((command) => ({
        name: command.name,
        description: command.description,
        options: command.options,
        type: ApplicationCommandType.ChatInput
    })));
    function Status() {
        const possible_status = [
            'I love cats!',
            'My goal is to be as simple as possible!',
            'A cat sitting on the moon moderating your discord servers...',
            'iHorizon',
            'MEE6 3 millions dollar NFT scam',
            'Cognito Inc.',
            'Inside Job',
            'How to train your dragon',
            'How to train your dragon 2',
            'How to train your dragon 3',
            'What tatoo my owner could get'
        ];
        client.user.setPresence({ activities: [{ name: status[Math.floor(Math.random() * possible_status.length)], type: ActivityType.Watching }] });
    }
    await setInterval(Status, 80_000);
};