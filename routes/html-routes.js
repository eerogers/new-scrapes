var path = require('path')
module.exports = function(app) {
app.get('/', function (req, res) {
   // request('https://www.npr.org/', function(e,r,html){
   //     if(e) throw e
        // console.log(html)
   //     var $ = cheerio.load(html)
   //     var array = []
   //     $('h3.title').each(function (i, element){
   //         var newentry = {title: $(element).html(),
   //             link: $(element).closest('a').attr('href')}
   //         array.push(newentry)    
   //     })
    //    console.log(array)
        res.sendFile(path.join(__dirname, "../public/main.html"));
   // })
})
}