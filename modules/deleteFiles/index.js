const events = require('events');
const eventEmitter = new events.EventEmitter();
const deleteWay = require('../delete');

const deleteFiles = (src) => {
    deleteWay(src);
};

eventEmitter.on('delete:file', deleteFiles);

module.exports = eventEmitter;