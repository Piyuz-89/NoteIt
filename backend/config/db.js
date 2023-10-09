const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser : true});

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true})
            .then(()=> console.log("MongoDb connected to server"))
            .catch(err => console.log(err));
}

module.exports = connectDB ;