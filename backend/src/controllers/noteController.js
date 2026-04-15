import Note from "../models/Note.js"
export  async function getAllNodes(req,res){
    try{
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);

    }
    catch(error){
        console.error("Error in getAll", error)
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createNode(req,res){
    try{
        const {title,content} = req.body;
        const note = new Note({title, content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } 
    catch(error){
        console.error("Error in createNode",error);
        res.status(500).json({message:"Internal server error"});

    }
}

export async function getNodeById(req,res){
    try{
        const node = await Note.findById(req.params.id);
        if(!node) return res.status(404).json({message: "Note not found"});
        res.json(node);
    }
    catch(error){
        console.error("Error in getAllNodes controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function updateNode(req,res){
    try{
        const {title,content} = req.body;
        const updateNode = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
            new:true,
            }
        );

        if(!updateNode) return res.status(404).json({message:"Note not found"});

        res.status(200).json(updateNode) ;
    }
    catch(error){
        console.error("Error in updateNote", error);
        res.status(500).json({message:"Internal server error"})
    }
}

export async function deleteAllNodes(req,res){
   try{
    const deleteAllNodes = await Note.findByIdAndDelete(req.params.id)
    if(!deleteAllNodes) return res.status(404).json({message: " Note Not Found"});
    res.status(200).json({message:"Note Deleted Successfully"});
   }
   catch(error){
    console.error("Error in deleteNode", error);
    res.status(500).json({message:"Internal server error"})
   }
}