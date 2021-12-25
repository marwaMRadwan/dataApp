const User = require('../../db/models/user.model')
const jwt = require('jsonwebtoken')
const auth = async(req,res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWTSECURITY)
        const user = await User.findOne({_id:decodedToken._id, 'tokens.token':token})
        if(!user) throw new Error('please authintcate')
        // if(!user.status) throw new Error('please activate your acc')
        req.user=user
        req.token = token
        next()        
    }
    catch(e){
        res.status(500).send({
            apistatus:false,
            data:e.message,
            message:"not authorized"
        })
    }
}

module.exports = auth