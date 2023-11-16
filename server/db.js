
import mongoose from "mongoose";

const MONGODB_URI =`mongodb://127.0.0.1:27017/merndb`

 const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`Connected to mongod: ${conn.connection.name}`)
        
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;

// mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//     useCreateIndex: true,

// })
// .then(() => {
//     console.log("connected to MongoDB");
// }).catch(err => {
//     console.log("error connecting to MongoDB", err.message);
// });