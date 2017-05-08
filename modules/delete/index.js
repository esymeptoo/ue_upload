const promise = require('promise');

module.exports = (src) => {
    return new promise((resolve, reject) => {
        var exec = require('child_process').exec, child;
        child = exec(`rm -rf ${__dirname.split('modules')[0] + 'public/' + src}`, (err, out) => {
            if (err) {
                reject(err);
            }
            console.log('删除成功');
            resolve(out);
        })
    })
};