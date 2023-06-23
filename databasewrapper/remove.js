const fs = require('fs');
module.exports = function(path) {
    fs.unlink("database/" + path + '.json', (err) => {});
}