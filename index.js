const { ShardingManager } = require('discord.js');
const { token } = require(`${process.cwd()}/privates_files/config`);
const manager = new ShardingManager("./src/core/bot.js", { totalShards: "auto", token: token});
manager.on("shardCreate", (shard) => console.log(`Hello! The bot has started! (Shard[${shard.id}])`));
manager.spawn();