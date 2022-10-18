var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.set(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
    );
    next();
});

var port = process.env.PORT || 3000;

var con = mysql.createConnection({
    host: "h1.host.filess.io",
    user: "Myproject_accurateme",
    password: "2147798b0ad94fdddbc20bf54708f7f408cb3bf0",
    database: "Myproject_accurateme",
});

app.get("/", function (req, res) {
    res.json({
        status: "success",
    });
});

app.get("/Myporject", function (req, res) {
    var sql = "SELECT * FROM `Myporject`";
    con.query(sql, function (err, row) {
        if (err) throw err;
        res.json({
            status: "success",
            data: row,
        });
    });
});

app.get("/Myporject/:id", function (req, res) {
    var sql = "SELECT * FROM `Myporject` WHERE `id`=" + req.params.id;
    con.query(sql, function (err, row) {
        if (err) throw err;
        res.json({
            status: "success",
            data: row[0],
        });
    });
});

app.post("/Myporject/", function (req, res) {
    var sql = "INSERT INTO `Myporject`(`fullname`, `P_number`) VALUES (?,?)";
    con.query(sql, [req.body.fullname, req.body.P_number], function (err) {
        if (err) throw err;
        res.json({
            status: "success",
            data: "Add data success",
        });
    });
});

app.put("/Myporject/:id", function (req, res) {
    var sql =
        "UPDATE `Myporject` SET `fullname`=?,`P_number`=? WHERE `id`=" +
        req.params.id;
    con.query(sql, [req.body.fullname, req.body.P_number], function (err) {
        if (err) throw err;
        res.json({
            status: "success",
            data: "Update data success",
        });
    });
});

app.delete("/Myporject/:id", function (req, res) {
    var sql = "DELETE FROM `Myporject` WHERE `id`=" + req.params.id;
    con.query(sql, function (err) {
        if (err) throw err;
        res.json({
            status: "success",
            data: "Delete data success",
        });
    });
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
