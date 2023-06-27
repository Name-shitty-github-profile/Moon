const fs = require('fs');
const search = require('./search');
const add = require('./add');

module.exports = function(path, newContent) {
    const file = `${process.cwd()}/database/${path}.json`;
    if (!search(path)) {
        add(path, newContent);
        return true;
    }
    try {
        fs.writeFileSync(file, Buffer.from(JSON.stringify(newContent)).toString('base64'), { flag: 'w' });
        return true;
    } catch (e) {
        return false;
    }
}