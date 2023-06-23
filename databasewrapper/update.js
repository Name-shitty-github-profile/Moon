const fs = require('fs');
const search = require('./search');
const add = require('./add');

module.exports = function(path, newContent) {
    path = "database/" + path + '.json';
    if (!search(path)) {
        return true;
    }
    try {
        fs.writeFileSync(path, newContent, { flag: 'w' });
        return true;
    } catch (e) {
        return false;
    }
}