import mongoose from "mongoose";
import studentSchema from "../mongooseSchema/studentSchema.js";

const studentModel = mongoose.model("students", studentSchema);

export default studentModel;