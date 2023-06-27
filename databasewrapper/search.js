const fs = require('fs');
module.exports = function(path) {
    return fs.existsSync(`database/${path}.json`);
}