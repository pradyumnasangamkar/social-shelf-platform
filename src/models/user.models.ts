import mongoose,{models,model, Schema} from "mongoose";


export interface IUser {
    _id?:mongoose.Types.ObjectId;
    fullname:string;
    email:string;
    password:string;
    role:string;
    createdAt?:Date;
    updatedAt?:Date;
}


const userSchema = new Schema<IUser>({
    fullname:{
        type:String,
        required:[true,"Please Provide a username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please Provide a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please Provide a email"],
    },
    role:{
        type:String,
        required:[true,"Please provide a Valid User-Type !"]
    }
    
},{timestamps:true});

const User = models?.users || model<IUser>("users",userSchema);

export default User;