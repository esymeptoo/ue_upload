const express = require('express');
const router  = express.Router();
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path'),
    os = require('os');
const formidable = require('formidable');


router.get('/ueditor', (req, res) => {
    // 客户端发起其它请求
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
});

router.post('/ueditor', (req, res) => {
    if (req.query.action === 'uploadimage') {
        console.log('上传图片');
        //var form = new formidable.IncomingForm();
        //form.uploadDir = __dirname.split('/routes')[0] + '/public/images/upload/';
        //form.keepExtensions = true; //保留后缀
        //form.maxFieldsSize = 2 * 1024; //文件大小
        //form.parse(req, function (error, fields, files) {
        //    if (error) {
        //        console.log(error.message);
        //        return;
        //    }
        //    var type_of_image = files.upfile.type;
        //    const last_name = type_of_image.split('/')[1];
        //    //新文件名
        //    var saveName = 'upload_' + (new Date()).getTime() + '.' + last_name;
        //    //保存地址
        //    var savePath = form.uploadDir + saveName;
        //    fs.renameSync(files.upfile.path, savePath);
        //    res.json({
        //        'url': `/images/upload/${saveName}`,
        //        'title': req.body.pictitle,
        //        'original': saveName,
        //        'state': 'SUCCESS'
        //    });
        //})
        var name = '',
            file_name = '';
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            name = `upload_${(new Date()).getTime()}.${mimetype.split('/')[1]}`;
            file_name = filename;
            var saveTo = path.join(`${os.tmpDir()}/public/images/upload/`, path.basename(`upload_${(new Date()).getTime()}.${mimetype.split('/')[1]}`));
            file.pipe(fs.createWriteStream(saveTo));
        });
        busboy.on('finish', function() {
            console.log('over');
            setTimeout(function() {
                res.json({
                    'url': `/images/upload/${name}`,
                    'title': req.body.pictitle,
                    'original': file_name,
                    'state': 'SUCCESS'
                });
            }, 3000);
        });
        req.pipe(busboy);
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {

    } else if (req.query.action == 'catchimage') {

    }
});
module.exports = router;