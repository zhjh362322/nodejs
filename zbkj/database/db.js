var mongoose = require('mongoose');

// var options = {
//     db: { native_parser: true },
//     server: { poolSize: 5 },
//     replset: { rs_name: 'myReplicaSetName' },
//     user: 'myUserName',
//     pass: 'myPassword'
// }
mongoose.connect('mongodb://127.0.0.1:12345/zjh');

mongoose.connection.on('connected', function() {
    console.log('mongoose default connection open to :' + '127.0.0.1:12345/zjh');
});
mongoose.connection.on('error', function(err) {
    console.log('mongoose连接错误：' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('mongoose没有链接上');
});
process.on('SIGNIT', function() {
    mongoose.connection.close(function() {
        console.log('disconnected');
        process.exit(0);
    })
});

module.exports = mongoose;