const mongoose = require('mongoose');
mongooseURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongooseURI, ()=>{
        console.log('successfully connected to the mongodb server');
    })
}

module.exports = connectToMongo; 