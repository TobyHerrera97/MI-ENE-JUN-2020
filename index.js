const express = require('express');
const mysql = require('mysql');
const app = express();

var conn = mysql.createConnection({
    host: "m7nj9dclezfq7ax1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "c3yxm56xoiva8nz1",
    password: "om1hjmtbl3qcxgcs",
    database: "o4dti14tbvvdeb98",
    port: "3306"
});


conn.connect();
app.get('/db', function (req, res) {
    //console.log('Usuario es: ', req.query.user);
    //console.log('Password es: ', req.query.pass);
    //res.send(`Usuario: ${req.query.user},
    //Password: ${req.query.pass}`);

    try {
        conn.query("SELECT * FROM mi01", function (err, rows, fields) {
            if (err) throw err;

            for (i = 0; i < rows.length; i++) {
                if (rows[i].username == req.query.user && rows[i].password == req.query.pass){
                    res.send(rows[i]);
                    throw 0;
                }
            }
            res.send('No se pudo chavo');
        });
        
    }
    catch (err) {
        console.error("ERROR: " + err);
    }
    finally {
       // conn.end();
    }

});

app.post('/saludos', function (req, res) {
    res.send('Saludos POST');
});

app.get('/saludos', function (req, res) {
    res.send('Saludos GET');
});


app.get('/', function (req, res) {
    res.send('Hola Pianola');
});

app.listen(3000, () => {
    console.log('El servidor esta inicializado en el puerto 3000');
});
