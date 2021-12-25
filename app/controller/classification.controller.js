const classModel = require("../../db/models/classification.model")
class classification{
    static add = async(req,res)=>{
        try{
            const classification = new classModel(req.body)
            await classification.save()
            res.status(200).send({apiStatus:true, message:"classification Added", data: classification})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error adding classification", data: e.message})
        }
    }
    static showAll = async(req,res) =>{
        try{
            const classifications = await classModel.find()
            res.status(200).send({apiStatus:true, message:"classification Fetched", data: classifications})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error Fetching classifications", data: e.message})
        }
    }
    static showSingle=async(req,res)=>{
        try{
            const classifications = await classModel.findById(req.params.id)
            if(!classifications) throw new Error("invalid classification id")
            res.status(200).send({apiStatus:true, message:"classification Fetched", data: classifications})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error Fetching classifications", data: e.message})
        }
    }
    static deleteAll=async(req,res)=>{
        try{
            const classifications = await classModel.remove()
            res.status(200).send({apiStatus:true, message:"classification Fetched", data: classifications})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error Fetching classifications", data: e.message})
        }

    }
    static delete=async(req,res)=>{
        try{
            const classifications = await classModel.findByIdAndRemove(req.params.id)
            res.status(200).send({apiStatus:true, message:"classification Fetched", data: classifications})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error Fetching classifications", data: e.message})
        }
    }
    // static edit=async(req,res)=>{
    //     try{
    //         const classifications = await classModel.findOne({name:(req.params.classificationName).toLowerCase()})
    //         if(!classifications) throw new Error("invalid classification name")
    //         classifications.name=req.body.name
    //         await classifications.save()
    //         res.status(200).send({apiStatus:true, message:"classification Fetched", data: classifications})
    //     }
    //     catch(e){
    //         res.status(500).send({ apiStatus:false, message:"error Editing classifications", data: e.message})
    //     }

    // }
    static addItem = async(req, res)=>{
        try{
            const item = req.body
            const classification = await classModel.findById(req.params.id)
            const founded = classification.items.findIndex(singleItem=> singleItem.label == item.label)
            if(founded!=-1) throw new Error("label used before")
            classification.items.push(item) 
            await classification.save()
            res.status(200).send({apiStatus:true, message:"item Added", data: classification})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error adding classification", data: e.message})
        }
    }
}
module.exports = classification