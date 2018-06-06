var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var moment = require('moment')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
var mongoose = require('mongoose')
var db = require('./models')
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
//mongoose.connect('mongodb://localhost:27017/newscrapes', options).then(
//    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
//    err => { /** handle initial connection error */ }
//  );
var cheerio= require('cheerio')
var request = require('request')
var array = []
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api_json" }))
app.use(express.static("public"));
request('https://www.npr.org/', function(e,r,html){
    if(e) throw e
   // console.log(html)
    var $ = cheerio.load(html)
    array = []
    $('h3.title').each(function (i, element){
        var newentry = {title: $(element).html(),
            link: $(element).closest('a').attr('href')}
        array.push(newentry)    
    })
  //  console.log(array)
    postFunc()
})
console.log(moment())
function postFunc(){
    console.log("working")
//    app.post('/newscrape/new', function (req, res) {
        for (var i = 0; i<array.length; i++){
        db.newscrape.create({
            title: array[i].title,
            link: array[i].link,
            when: moment(),
            saved: false
    //        }).then(function (r) {
    //            res.send(r)
    //        }).catch(function (e) {
    //            res.send(e)
            })
        }
 //   })   
}
function getFunc(){
    app.get('/newscrape', function (req, res) {
        db.newscrape.find({}).then(function(r){
            res.send(r)
        }).catch(function(e) {
            res.send(e)
        })
    })
} getFunc()

function updateFunc(){
    app.put('/article', function (req, res) {
        db.article.find({}).then(function(r){
            res.send(r)
        }).catch(function(e) {
            res.send(e)
        })
    })
}// updateFunc()

//require("./routes/api-routes.js")(app)
require("./routes/html-routes.js")(app)

app.listen(3000, function(e){
    if(e)throw e
    console.log('Listening on 3000')
})