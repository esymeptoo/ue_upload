const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path'),
    os = require('os');
const Busboy = require('busboy');
const formidable = require('formidable');

router.post('/uploadFile',function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname.split('/routes')[0] + '/public/';
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024; //文件大小
    form.parse(req, function (error, fields, files) {
        if (error) {
            console.log(error.message);
            return;
        }

        var type_of_image = files.inputFile.type;
        console.log(type_of_image)
        const last_name = type_of_image.split('/ms')[1];
        if (last_name.length == 0) {
            res.json({result: 2});
            return;
        }
        //新文件名
        var saveName = 'upload_' + (new Date()).getTime() + '.doc';
        //保存地址
        var savePath = form.uploadDir + saveName;
        fs.renameSync(files.inputFile.path, savePath);
        console.log(savePath);
        res.json({result: 1});
    })
    //console.log('正在上传文件');
    //var busboy = new Busboy({ headers: req.headers });
    //var name = '',
    //    file_name = '';
    //busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //    console.log(mimetype)
    //    name = `upload_${(new Date()).getTime()}.${mimetype.split('/')[1]}`;
    //    file_name = filename;
    //    var saveTo = path.join(`${os.tmpDir()}/public`, path.basename(`upload_${(new Date()).getTime()}.${mimetype.split('/')[1]}`));
    //    file.pipe(fs.createWriteStream(saveTo));
    //});
    //busboy.on('error', function() {
    //    console.log('上传失败');
    //    res.send("That's all folks!");
    //});
    //busboy.on('finish', function() {
    //    console.log('上传成功');
    //    res.json({
    //        'url': `/${name}`,
    //        'original': file_name,
    //    })
    //});
    //req.pipe(busboy);
});


module.exports = router;
