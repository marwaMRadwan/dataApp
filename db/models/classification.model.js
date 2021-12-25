const mongoose = require("mongoose");
const classificationSchema =  new mongoose.Schema({
    listName: {
        type:String,
        trim:true,
        required:[true, "Classification name is required"],
        minlength:[3, "Classification name must be more than 3 characters"],
        maxlength:[50, "Classification name must be less than 20 characters"],
        unique:[true, "Classification name used before"]
    },
    description: {
        type:String,
        trim:true
    },
    items:[
        {
            label:{
                type:String,
                trim:true,
                required:[true, "label name is required"],
                minlength:[3, "label must be more than 3 characters"],
                maxlength:[50, "label must be less than 20 characters"],
                unique:[true, "label used before"]
            },
            value:{
                type:String,
                trim:true
            },
            level:{
                type:Number,
                default:0
            }
        }
    ]
})
const Classification = mongoose.model("Classification",classificationSchema);
module.exports = Classification;