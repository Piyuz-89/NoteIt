const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

connectDB();

app.use("/api/user",userRouter);

app.use("/api/notes",noteRouter);


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started on port 3000");
});