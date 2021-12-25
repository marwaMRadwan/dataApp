const roleModel = require("../../db/models/role.model")
class Role{
    static add=async(req,res)=>{
        try{
            const role = new roleModel({...req.body, owner: req.user._id})
            await role.save()
            res.status(200).send({apiStatus:true, message:"Role Added", data: role})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error adding role", data: e.message})
        }
    }
    static showAll = async(req,res) =>{
        try{
            const roles = await roleModel.find()
            res.status(200).send({apiStatus:true, message:"Role Fetched", data: roles})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error Fetching roles", data: e.message})
        }
    }
    static showSingle=async(req,res)=>{
        try{
            const roles = await roleModel.findOne({name:(req.params.roleName).toLowerCase()})
            if(!roles) throw new Error("invalid role name")
            res.status(200).send({apiStatus:true, message:"Role Fetched", data: roles})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error Fetching roles", data: e.message})
        }
    }
    static deleteAll=async(req,res)=>{
        try{
            const roles = await roleModel.remove()
            res.status(200).send({apiStatus:true, message:"Role Fetched", data: roles})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error Fetching roles", data: e.message})
        }

    }
    static delete=async(req,res)=>{
        try{
            const roles = await roleModel.remove({name:(req.params.roleName).toLowerCase()})
            res.status(200).send({apiStatus:true, message:"Role Fetched", data: roles})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error Fetching roles", data: e.message})
        }
    }
    static edit=async(req,res)=>{
        try{
            const roles = await roleModel.findOne({name:(req.params.roleName).toLowerCase()})
            if(!roles) throw new Error("invalid role name")
            roles.name=req.body.name
            await roles.save()
            res.status(200).send({apiStatus:true, message:"Role Fetched", data: roles})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, message:"error Editing roles", data: e.message})
        }

    }
}
module.exports = Role