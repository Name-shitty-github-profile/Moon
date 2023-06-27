module.exports = function (seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds * 1000);
    });
};