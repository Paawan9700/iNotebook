const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true
    }, 
    description : {
        type : String, 
        required : true, 
    }, 
    tag : {
        type : String, 
        default : "General"
    }, 
    Date : {
        type : Date, 
        default : Date.now
    }
});

const Note = mongoose.model('Note', NotesSchema);
module.exports = Note