const { getEventEmitter } = require('../modules/observer/server');
const promise = require('promise');
const fs = require('fs');

getEventEmitter('task')
    .on('task:deleteFile', (src) => {
        src = src.slice(1, src.length);
        var retry = 3;
        var exec = require('child_process').exec, child;
        exec(`rm -rf ${__dirname.split('observers')[0] + 'public/' + src}`);
        //doDelete(src, retry);
    });

function doDelete(src, retry) {
    if (retry == 0) {
        return ;
    }
    fs.readdirSync('public').map((file) => {
        if (src == file) {
            var exec = require('child_process').exec, child;
            return new promise((resolve, reject) => {
                exec(`rm -rf ${__dirname.split('observers')[0] + 'public/' + src}`, (err, out) => {
                    if (err) {
                        retry--;
                        doDelete(src, retry);
                    }
                    resolve('delete over');
                });
            })
        } else {
            retry--;
            doDelete(src, retry);
        }
    })
}