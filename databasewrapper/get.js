const search = require('./search'),
    fs = require('fs');
module.exports = function(path) {
    path = `database/${path}.json`;
    if (!search(path)) {
        return;
    }
    try {
        return JSON.parse(Buffer.from(fs.readFileSync(path, 'utf8'), 'base64').toString('utf8'));
    } catch (error) {
        return;
    }
};