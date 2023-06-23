const { ShardingManager } = require('discord.js');
const manager = new ShardingManager("./src/core/bot.js", { totalShards: "auto", token: require(`${process.cwd()}/private_files/config`).token});
manager.on("shardCreate", (shard) => console.log(`Hello! The bot has started! (Shard[${shard.id}])`));
manager.spawn();