var mysql = require('mysql');

var query = fn => {
    var connection = mysql.createConnection('mysql://bramble:xuguoyi11@bramble.wang/blog_xuguoyi?charset=utf8mb4');
    connection.connect();

    connection.query('select * from message', function(err, rows, fields) {
        if (err) throw err;
        fn && fn(rows);
    });

    connection.end();
}

var insert = (name, content, ip, fn) => {
    var obj = {
        id: null,
        name: name,
        ip: ip,
        datetime: new Date,
        content: content,
        pid: null
    };
    var connection = mysql.createConnection('mysql://bramble:xuguoyi11@bramble.wang/blog_xuguoyi?charset=utf8mb4');
    connection.connect();

    var query = connection.query('insert into message set ?', obj, function(err, result) {
        if (err) throw err;
        fn && fn(result);
    });

    connection.end();
}
var DB = {
    query: query,
    insert: insert
};

module.exports = DB;