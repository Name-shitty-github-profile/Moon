const search = require('./search'),
    fs = require('fs');
module.exports = function(path) {
    path = `database/${path}.json`;
    if (!search(path)) {
        return null;
    }
    try {
        return JSON.parse(Buffer.from(encodedContent, 'base64').toString('utf8'));
    } catch (error) {
        return null;
    }
};