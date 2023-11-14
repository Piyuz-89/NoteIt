const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) =>{

    try{

        console.log(req.body);
        // const {name, email, password} = req.body;
        // const user = User.findOne({email: email});
        // if(user){
        //     return res.status(400).json({msg: "Email already exist"});
        // }

        // const hashpass = await bcrypt.hash(password, 10);
        // await User.create({
        //     username: name,
        //     email: email,
        //     password: hashpass
        // });

        res.status(200).json({msg: "Registration Successfull!"});

    }catch(err){
        return res.status(500).json({msg: "Registration Failed!"});
    }
}

const loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400).json({msg:"Invalid Email!"});
        }

        const isValid = bcrypt.compare(password, user.password);
        if(!isValid){
            return res.status(400).json({msg:"Invalid Passsword"});
        }

        const payload = {id: user._id, name: user.username};
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"});

        res.status(200).json({token, uname: user.username});

    }catch(err){
        res.status(400).json({msg: "Login Failed!"});
    }

}

const verifyUser = async (req, res) =>{
    try{
        const token = req.header("Authorization");
        if(!token)return res.send(false);

        jwt.verify(token, process.env.TOKEN_SECRET, async(err, verified)=>{
            if(err) return res.send(false);

            const user = await User.findById(verified.id);

            if(!user) return res.send(null);

            return res.json(verified.name);
        })
    }catch(err){
        res.status(400).send(null);
    }
}

module.exports = { loginUser, registerUser, verifyUser };