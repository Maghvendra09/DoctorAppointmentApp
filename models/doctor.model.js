import mongoose,{Schema} from 'mongoose';

const doctorSchema = new Schema({
    userId:{
        type:String
    },
    firstName:{
        type:String,
        required:[true,'first name is required']
    },
    lastName:{
        type:String,
        required:[true,'last name is required']
    },
    phone:{
        type:String,
        required:[true,'Phone No is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    specialization:{
        type:String,
        required:[true,'specialization is required']
    },
    experience:{
        type:String,
        required:[true,'experience is required']
    },
    feesPerCunsultation:{
        type:Number,
        required:[true,'fees is required']
    },
    status:{
        type:String,
        default:'pending'
    },
    timings:{
        type:Object,
        required:[true,'word time is required']
    }
},{timestamps:true})

export const doctorModel = mongoose.model("doctors",doctorSchema)