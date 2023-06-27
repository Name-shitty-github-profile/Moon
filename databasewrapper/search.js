const fs = require('fs');
module.exports = function(path) {
    return fs.existsSync(`${process.cwd()}/database/${path}.json`);
}