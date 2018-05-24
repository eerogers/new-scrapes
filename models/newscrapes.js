var mongoose = require('mongoose')

var Schema = mongoose.Schema

var newscrape = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    when: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        required: true
    }
})

newscrape.methods.changeSaved = function () {
    this.saved = true
    return this.saved
}

module.exports = mongoose.model('newscrape', newscrape)