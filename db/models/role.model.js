const mongoose = require("mongoose");
const roleSchema =  new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:[true, "role name is required"],
        minlength:[3, "role name must be more than 3 characters"],
        maxlength:[20, "role name must be less than 20 characters"],
        unique:[true, "role name used before"],
        lowercase:true
    },
    description:{
        type:String
    },
    rolePermissions:{
        ManageSubscription:{type:Boolean, default:false},
        ChangeOrganizationProfile:{type:Boolean, default:false},
        ManageRoles:{type:Boolean, default:false},
        ManageAPITokens:{type:Boolean, default:false},
        CreateRecords:{type:Boolean, default:false},
        EditRecords:{type:Boolean, default:false},
        AssignRecords:{type:Boolean, default:false},
        ChangeStatus:{type:Boolean, default:false},
        ChangeProject:{type:Boolean, default:false},
        RemoveRecords:{type:Boolean, default:false},
        ImportRecords:{type:Boolean, default:false},
        ExportRecords:{type:Boolean, default:false},
        RunReports:{type:Boolean, default:false},
        ManageMembers:{type:Boolean, default:false},
        ManageApps:{type:Boolean, default:false},
        ManageProjects:{type:Boolean, default:false},
        ManageChoiceLists:{type:Boolean, default:false},
        ManageClassificationSets:{type:Boolean, default:false},
        ManageLayers:{type:Boolean, default:false}
    },
    owner:{
        type:mongoose.Types.ObjectId
    }
})
const Role = mongoose.model("Role",roleSchema);
module.exports = Role;