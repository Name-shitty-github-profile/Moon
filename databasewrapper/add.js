const fs = require('fs');
const search = require('./search');

module.exports = function(path, content) {
    const file = `${process.cwd()}/database/${path}.json`;
    if (search(path)) {
        return false;
    }
    try {
        fs.writeFileSync(file, Buffer.from(JSON.stringify(content)).toString('base64'));
    } catch (e) {
        return false;
    }
}