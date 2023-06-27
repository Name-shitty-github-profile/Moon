const fs = require("fs");
const path = require('path');

function getSlashs(folderPath) {
  let files = [];
      function traverseFolder(currentPath) {
          const items = fs.readdirSync(currentPath);
          items.forEach((item) => {
              const itemPath = path.join(currentPath, item);
              const stat = fs.statSync(itemPath);
              if (stat.isDirectory()) {
                  traverseFolder(itemPath);
              } else {
                  files.push(itemPath.replace(/\.js$/, ''));
              }
          });
      }
  traverseFolder(folderPath);
  return files;
}

module.exports = async (client) => {
  const slash_commands = getSlashs(`${process.cwd()}/src/Slash`);
  slash_commands.forEach(command => {
    const props = require(command);
    client.interactions.set(props.name, { ...props });
    client.register_arr.push(props);
  });
};

/*
Basic command structure
module.exports = {
  description: "uwu",
  options: [
    {
      name: "Kitten",
      description: "Your discord kitten name",
      required: true,
      choices: [
        { name: "winky wittle kitten", value: "prostitute n.1"},
        { name: "Bisexual kitten", value: "prositute n.2"}
      ]
    }
  ],
  func: async (client, interaction) => {
    interaction.reply(`The big daddy choosed the ${interaction.options.getString("Kitten")}`);
  }
};
*/