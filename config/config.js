var path = require('path');
fs = require('fs');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {

    dns: {
        pfx: fs.readFileSync('Enter main domain certificate here'),
        hostname: 'cksw.co',
        passphrase: 'password',
        ca: [fs.readFileSync('Enter the intermediate certificates here')]
    },

    rootPath: rootPath,
    port: 443,
    expressSecret: 'Put here some secret for cryptoraphy',

}
