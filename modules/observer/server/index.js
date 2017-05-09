const EventEmitter = require('events');
const eventEmitters = {};

module.exports = {
    getEventEmitter: (name) => {
        if (!name) {
            name = 'default';
        }
        if (!eventEmitters[name]) {
            eventEmitters[name] = new EventEmitter();
        }
        return eventEmitters[name];
    }
};