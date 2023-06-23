const fs = require('fs');
const search = require('./search');

module.exports = function(path, content) {
    path = "database/" + path + '.json';
    if (search(path)) {
        return false;
    }
    try {
        fs.writeFileSync(path, JSON.stringify(content));
    } catch (e) {
        return false;
    }
}