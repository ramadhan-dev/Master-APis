const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim:true,
            required: [true, "name is required"],
            minLength: [3, "name must be minimum 3 characters"],
            maxLength: [31, "name must be maximum 31 characters"],
        },
        lastName: {
            type: String,
            trim:true,
            required: [true, "name is required"],
            minLength: [3, "name must be minimum 3 characters"],
            maxLength: [31, "name must be maximum 31 characters"],
        },
        email: {
            type: String,
            required: [true, "email is required and should be unique"],
            unique: true,
            trim:true,
            lowercase:true
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: [6, "password must be minimum 6 characters"],
            maxlength: [64, "password must be maximum 64 characters"],
        },
        role:{
            type:String,
            default:"user",
            enum:["user", "admin"]
        },
        isBanned: {
            type:Boolean,
            default:false
        }
    },
    { timestamps: true, versionKey:false}
)


UserSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret.password;
        delete ret._id;
        return ret;
    }
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;