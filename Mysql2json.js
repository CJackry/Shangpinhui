var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'goods'
});
connection.connect();

var sql = 'select * from dependency_info';
connection.query(sql, function (err, results) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }

    if (results) {
        for (var i = 0; i < results.length; i++) {
            console.log("%d\t%s\t%s", i, results[i].project_name, results[i].dependency);
            break;
        }
    }
});
connection.end();