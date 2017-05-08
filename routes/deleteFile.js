const express = require('express');
const router = express.Router();
const eventEmitter = require('../modules/deleteFiles');

router.post('/', (req, res) => {
    eventEmitter.emit('delete:file', req.body.src);
    res.send('ok');
});
module.exports = router;