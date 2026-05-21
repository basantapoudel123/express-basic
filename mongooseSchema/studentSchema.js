import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    department: String
})

export default studentSchema;