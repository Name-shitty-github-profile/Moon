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