const Note = require("../models/noteModel");

const getAllNotes = async (req, res) =>{
    try{

        const notes = await Note.find({user_id: req.user.id});
        res.status(200).json(notes);

    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const addNote = async (req, res) =>{
    try{
        const {title, body} = req.body;
        
        await Note.create({
            title: title,
            body: body,
            user_id: req.user.id
        });

        res.status(200).json({msg: "Note Created Successfully"});
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const getNote = async (req, res) =>{
    try{
        const note = await Note.findById(req.params.id);
        res.status(200).json(note);
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const updateNote = async (req, res) =>{
    try{
        const {title, body} = req.body;
        await Note.findByIdAndUpdate({_id:req.params.id},{
            title: title,
            body: body
        });
        res.status(200).json({msg: "Note Updated Successfully"});
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const deleteNote = async (req, res) =>{
    try{
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "Note Deleted Successfully"});
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}


module.exports = { getAllNotes, addNote, getNote, updateNote, deleteNote };