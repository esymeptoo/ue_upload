const express = require('express');
const router = express.Router();
const { getEventEmitter } = require('../modules/observer/server');
const observer = getEventEmitter('task');

router.post('/', (req, res) => {
    observer.emit('task:deleteFile', req.body.src);
    res.send('ok');
});
module.exports = router;