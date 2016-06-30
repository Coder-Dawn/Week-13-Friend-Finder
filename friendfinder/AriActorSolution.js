//Instructions

//Create a favoriteShow_db database with an actors table.

//The actors table will have a column for id (PRIMARY KEY AUTO_INCREMENT int), name (varchar), coolness_points (int), and attitude (varchar)
//Add in four actors with different names, coolness_points, and attitudes

//Create a Node Application with Express, MySQL, and Body Parser with three Express routes...

//Create a '/cast' route that will display all the actors and their data ordered by their id

//Create a '/coolness-chart' route that will display all the actors and their data ordered by their coolness points

//Create a '/attitude-chart/:att' route that will display all the actors for a specific type of attitude


var express     = require('express');
var mysql     = require('mysql');
var app         = express();
var PORT    = 8080;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.argv[2],
    database: 'favoriteShow_db'
});

connection.connect(function(err){
    if (err) {
        console.error('error connection:', err.stack);
        return
    }
    console.log('connected!')
});

app.get('/cast', function(req, res){
    connection.query('SELECT * FROM actors', function(err, result){
        var html = "<h1>Cast of Rick and Morty!</h1>"
        html += '<ul>'
        result.forEach(function(charResult){
            html+= "<li><u>id:</u> "+ charResult.id+ "<br><u> Name:</u> " +charResult.name + "<br> <u>coolness_points:</u> " + charResult.coolness_points + "<br> <u>attitude:</u> " + charResult.attitude + "</li><br>"
        });
        res.send(html);
    });
});

app.get('/coolness-chart', function(req, res){
    connection.query('SELECT * FROM actors ORDER BY coolness_points DESC', function(err, result){
        if (err) {
            throw err
        }

        var html = "<h1>Cast of Rick and Morty! by Coolness Points</h1>"
        html += '<ul>'
        result.forEach(function(charResult){
            html+= "<li><u>id:</u> "+ charResult.id+ "<br><u> Name:</u> " +charResult.name + "<br> <u>coolness_points:</u> " + charResult.coolness_points + "<br> <u>attitude:</u> " + charResult.attitude + "</li><br>"
        });

        res.send(html);
    });
});

app.get('/attitude-chart/:att', function(req, res){
    connection.query('SELECT * FROM actors WHERE ?', {attitude: req.params.att}, function(err, result){
        console.log(result)
        var html = "<h1>"+ result[0].name +"'s Page</h1>"
        html+= "<h3>Attitude: " + result[0].attitude + "</h3>"
        html+= "<h3>id: " + result[0].id + "</h3>"
        html+= "<h3>Coolness Points: " + result[0].coolness_points + "</h3>"
        res.send(html);
    });
});

app.listen(PORT, function(){
console.log("listening on", PORT)
});



____________________________________

CREATE DATABASE favoriteShow_db;

USE favoriteShow_db;


CREATE TABLE actors (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    coolness_points INTEGER(30) NOT NULL,
    attitude VARCHAR(30),
    -- Sets id as this table's primary key which means all data contained within it will be unique --
    PRIMARY KEY (id)
);

INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Rick Sanchez",100,"Drunk");
INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Morty Smith",70,"Worried");
INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Birdperson",90,"Stoic");
INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Jerry Smith",10,"Insecure");