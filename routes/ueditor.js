const express = require('express');
const router  = express.Router();
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path'),
    os = require('os');

router.get('/ueditor', (req, res) => {
    // 客户端发起其它请求
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
});

router.post('/ueditor', (req, res) => {
    if (req.query.action === 'uploadimage') {
        console.log('上传图片');
        var name = '',
            file_name = '';
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            name = `upload_${(new Date()).getTime()}.${mimetype.split('/')[1]}`;
            file_name = filename;
            var saveTo = path.join(`${os.tmpDir()}/public`, path.basename(`upload_${(new Date()).getTime()}.${mimetype.split('/')[1]}`));
            file.pipe(fs.createWriteStream(saveTo));
        });
        busboy.on('finish', function() {
            console.log('over');
            res.json({
                'url': `/${name}`,
                'title': req.body.pictitle,
                'original': file_name,
                'state': 'SUCCESS'
            });
        });
        req.pipe(busboy);
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {

    } else if (req.query.action == 'catchimage') {

    }
});
module.exports = router;