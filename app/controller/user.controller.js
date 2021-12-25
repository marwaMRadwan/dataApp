const Role = require('../../db/models/role.model')
const User = require('../../db/models/user.model')
const responseCreator = require("../helper/response.helper")
sendActivationEmail = require("../helper/sendMail.helper")
class UserControl{
    static register = async(req, res)=>{
        try{
            let userData = new User(req.body)
            let ownerRole= new Role({
                name:"Owner", 
                rolePermissions:{
                    ManageSubscription:true,
                    ChangeOrganizationProfile:true,
                    ManageRoles:true,
                    ManageAPITokens:true,
                    CreateRecords:true,
                    EditRecords:true,
                    AssignRecords:true,
                    ChangeStatus:true,
                    ChangeProject:true,
                    RemoveRecords:true,
                    ImportRecords:true,
                    ExportRecords:true,
                    RunReports:true,
                    ManageMembers:true,
                    ManageApps:true,
                    ManageProjects:true,
                    ManageChoiceLists:true,
                    ManageClassificationSets:true,
                    ManageLayers:true
                },
                owner:userData._id
            })
            let mangerRole= new Role({
                name:"Manager", 
                rolePermissions:{
                    CreateRecords:true,
                    EditRecords:true,
                    AssignRecords:true,
                    ChangeStatus:true,
                    ChangeProject:true,
                    RemoveRecords:true,
                    ImportRecords:true,
                    ExportRecords:true,
                    RunReports:true,
                    ManageMembers:true,
                    ManageApps:true,
                    ManageProjects:true,
                    ManageChoiceLists:true,
                    ManageClassificationSets:true,
                    ManageLayers:true
                },
                owner:userData._id

            })
            let standardRole= new Role({
                name:"Standard User", 
                rolePermissions:{
                    CreateRecords:true,
                    EditRecords:true,
                    AssignRecords:true,
                    ChangeStatus:true,
                    ChangeProject:true,
                    RemoveRecords:true
                },
                owner:userData._id

            })
            await userData.save()
            await ownerRole.save()
            await mangerRole.save()
            await standardRole.save()
            // sendActivationEmail(userData.email, `Congatralation you are registered`)
            const response = responseCreator(true, userData, "data inserted")
            res.status(200).send(response)
        }
        catch(e){
            const response = responseCreator(false, e.message, "error inserting data")
            res.status(500).send(response)
        }
    }
    static login = async(req, res)=>{
            try{
                const userData = await User.findByCredintials(req.body.email, req.body.password)
                const token = await userData.generateToken()
                res.status(200).send(responseCreator(true, {userData, token}, "Logged in"))
            }
            catch(e){
                const response = responseCreator(false, e.message, "Unauthorized")
                res.status(500).send(response)
            }
    }
    static me = async(req,res)=>{
        res.status(200).send({
            apiStatus: true,
            date: req.user,
            message: "data featched"
        })
    }
    static logout = async(req,res)=>{
        try{     
            req.user.tokens = req.user.tokens.filter(ele=>{
                return ele.token!= req.token
            })
            await req.user.save()
            res.status(200).send(responseCreator(true, {}, "Logged out"))
        }
        catch(e){
            const response = responseCreator(false, e.message, "error inserting data")
            res.status(500).send(response)
        }
    }
    static logoutAll=async(req,res)=>{
            try{     
                req.user.tokens = []
                await req.user.save()
                res.status(200).send(responseCreator(true, {}, "Logged out"))
            }
            catch(e){
                const response = responseCreator(false, e.message, "error inserting data")
                res.status(500).send(response)
            }
    }
    static updateProfileImage = async (req,res)=>{
        
        try{     
            req.user.image = req.file.path
            await req.user.save()
            res.status(200).send(responseCreator(true, {}, "Done"))
        }
        catch(e){
            const response = responseCreator(false, e.message, "error inserting data")
            res.status(500).send(response)
        }
    }
}
module.exports = UserControl