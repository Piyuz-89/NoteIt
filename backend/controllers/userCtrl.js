const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) =>{

    try{
        const {email, uname, pass} = req.body;

        const user = await User.findOne({email: email});
        if(user){
            return res.status(400).json({msg: "Email already exist"});
        }

        const name = await User.findOne({username: uname});     
        if(name){
            return res.status(400).json({msg: "Username already exist"});
        }

        const hashpass = await bcrypt.hash(pass, 10);

        await User.create({
            username: uname,
            email: email,
            password: hashpass
        });

        res.status(200).json({msg: "Registration Successfull!"});

    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Registration Failed!"});
    }
}

const loginUser = async (req, res) =>{
    try{
        const {email, pass} = req.body;

        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400).json({msg:"Invalid Email!"});
        }

        const isValid = await bcrypt.compare(pass, user.password);
        if(!isValid){
            return res.status(400).json({msg:"Invalid Passsword"});
        }

        const payload = {id: user._id};
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"});

        res.status(200).json({token, uname: user.username});

    }catch(err){
        res.status(400).json({msg: "Login Failed!"});
    }

}

const verifyUser = async (req, res) =>{
    try{
        const token = req.header("Authorization");

        if(!token) return res.status(400).send(null);

        jwt.verify(token, process.env.TOKEN_SECRET, async(err, verified)=>{

            if(err) return res.status(400).send(null);

            const user = await User.findById(verified.id);

            if(!user) return res.status(400).send(null);

            return res.status(200).json(user.username);
        })
    }catch(err){
        res.status(400).send(null);
    }
}

module.exports = { loginUser, registerUser, verifyUser };