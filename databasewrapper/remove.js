const fs = require('fs');
const search = require('./search');
module.exports = function(path) {
    const file = `${process.cwd()}/database/${path}.json`;
    if (!search(path)) return;
    fs.unlink(file, (err) => {});
    return true;
}