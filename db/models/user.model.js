const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        trim:true,
        required:true
    },
    lname:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email format')
        }
    }, 
    password:{
        type:String,
        trim:true, 
        required:true,
        min:6,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        validate(value){
            if(value.toLowerCase().includes('pass')||value.toLowerCase().includes('password')|| value.toLowerCase().includes(this.name))
                throw new Error('week pass')
        }
     },
    phone:{
        type:String,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('invalid phone number')
        }
    },
    image:{
        type:String,
        default:""
    }, 
    parent:{
        type:mongoose.Types.ObjectId,
        default:null
    },
    apps:[{
        type:mongoose.Types.ObjectId,
    }],
    role:{
        type:String,
        default: "Owner"
    },
    tokens:[
        { token:{type:String}}
    ]
}
,{timestamps:true}
)

//schema methods
//virtual populate
userSchema.virtual('userPosts', {
    ref:'Post',
    localField:"_id",
    foreignField:"userId"
})
//handle response
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    let deleted = ['password', 'tokens', '__v']
    deleted.forEach(item=>{
        delete user[item]
    })
    return user
}

//encrypt password 
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// login user
userSchema.statics.findByCredintials = async(email,password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error('invalid email')
    const isValidPass = await bcrypt.compare(password, user.password)
    if(!isValidPass) throw new Error('invalid password')
    if(user.tokens.length>=5) throw new Error('exceded number of logins')
    return user
}

//generate token
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id},process.env.JWTSECURITY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User