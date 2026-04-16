import mongoose,{models,model, Schema} from "mongoose";


export interface IEvent {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  capacity: number;
  category: string;
  createdAt?:Date;
  updatedAt?:Date;

}


const eventSchema = new Schema<IEvent>({
    title:{
        type:String,
        required:[true,"Please Provide a Title"],
        unique:true
    },
    description:{
        type:String,
        required:[true,"Please Provide a description"],
        unique:true
    },
    date:{
        type:String,
        required:[true,"Please Provide a Date"],
    },
    time:{
        type:String,
        required:[true,"Please provide a Time !"]
    },
    location:{
        type:String,
        required:[true,"Please provide a location !"]
    },
    imageUrl:{
        type:String,
        required:[true,"Please provide a imageUrl !"]
    },
    capacity:{
        type:Number,
        required:[true,"Please provide a Capacity !"]
    },
    category:{
        type:String,
        required:[true,"Please provide a Category !"]
    },
    
},{timestamps:true});

const Event = models?.events || model<IEvent>("events",eventSchema);

export default Event;