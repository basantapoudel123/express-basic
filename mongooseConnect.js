import express from "express";
import mongoose from "mongoose";
import studentModel from "./mongooseModel/studentModel.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// async function dbConnection(){
//     await mongoose.connect("mongodb://localhost:27017/college")
//     const schenma = new mongoose.Schema({
//         name: String,
//         email: String,
//         age: Number,
//         department: String
//     })

//     const studentModel = mongoose.model("students", schenma);
//     const result = await studentModel.find()
//     console.log(result);
// }

// dbConnection();

await mongoose.connect("mongodb://localhost:27017/college").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


app.get('/', async (request, response) => {
    const studentData = await studentModel.find();
    response.send(studentData);
})

app.post("/save", async (request, response) => {
    console.log(request.body);
    const { name, email, age, department } = request.body;

    if (!name || !email || !age || !department) {
        response.send({
            message: "Data not stored",
            success: false
        })
        return false;
    }

    const studentData = await studentModel.create(request.body);
    response.send({
        message: "Data received successfully",
        success: true,
        data: studentData
    })
})

app.put("/update/:id", async (request, response) => {
    const { id } = request.params;
    console.log(id, request.body)

    const studentData = await studentModel.findByIdAndUpdate(id, { ...request.body });

    response.send({
        message: "Data updated successfully",
        success: true,
        data: studentData
    })
})


app.delete("/delete/:id", async (request, response) => {
    const { id } = request.params;

    const studentData = await studentModel.findByIdAndDelete(id);

    response.send({
        message: "Data deleted successfully",
        success: true,
        data: studentData
    })
})

app.listen(3200)