import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const dbName = "college";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');


// async function connectToMongoDB() {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection('students');
//     const result = await collection.find().toArray();
//     console.log(result);
// }

// connectToMongoDB();


// app.set('view engine', 'ejs');

// // make api to fetch data from mongoDB and render it in ejs template
// app.get('/', async (req, res) => {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection('students');
//     const studentData = await collection.find().toArray();
//     res.render("studentView", { students: studentData });
// });

client.connect().then((connection) => {
    console.log("Connected to MongoDB");
    const db = connection.db(dbName);

    app.get('/', async (request, response) => {
        const collection = db.collection('students');

        const students = await collection.find().toArray();
        response.send(students);
    })

    app.get('/ui', async (request, response) => {
        const collection = db.collection('students');

        const students = await collection.find().toArray();
        response.render("studentView", { students: students });
    })

    app.get('/add', async (request, response) => {
        response.render("add-student");
    })

    app.post('/add-student', async (request, response) => {
        console.log(request.body)
        const collection = db.collection('students');

        const result = await collection.insertOne(request.body);
        console.log(result)
        response.send("Student added successfully");
    })

    app.post("/add-student-api", async (request, response) => {
        console.log(request.body);
        const { name, age, email, department } = request.body;

        if (!name || !age || !email || !department) {
            response.send({ message: "All fields are required", success: false });
            return;
        }
        const collection = db.collection('students');

        const result = await collection.insertOne(request.body);
        response.send({ "message": "data stored", success: true, result: result });
    })

    app.delete("/delete/:id", async (request, response) => {
        const { id } = request.params;
        console.log(id)

        // check id before delete
        if (!ObjectId.isValid(id)) {
            return response.send({
                message: "Invalid ID",
                success: false
            });
        }

        const collection = db.collection('students');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result) {
            response.send({ "message": "data deleted", success: true, result: result });
        } else {
            response.send({ "message": "data not found, try again later", success: false });
        }
    })

    // delete data using get method by id
    app.get("/ui/delete/:id", async (request, response) => {
        const { id } = request.params;
        console.log(id)

        // check id before delete
        if (!ObjectId.isValid(id)) {
            return response.send({
                message: "Invalid ID",
                success: false
            });
        }

        const collection = db.collection('students');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result) {
            response.send("<h1>Data deleted successfully</h1><a href='/ui'>Go back to UI</a>");
        } else {
            response.send("<h1>Data not found, try again later</h1><a href='/ui'>Go back to UI</a>");
        }
    })

    // populate data in update form
    app.get("/ui/student/:id", async (request, response) => {
        const { id } = request.params;
        console.log(id)

        // check id before delete
        if (!ObjectId.isValid(id)) {
            return response.send({
                message: "Invalid ID",
                success: false
            });
        }

        const collection = db.collection('students');
        const student = await collection.findOne({ _id: new ObjectId(id) });
        response.render("updateStudent", { student: student });
    })

    // get student by id and send it as response
    app.get("/student/:id", async (request, response) => {
        const { id } = request.params;
        console.log(id)

        // check id before delete
        if (!ObjectId.isValid(id)) {
            return response.send({
                message: "Invalid ID",
                success: false
            });
        }

        const collection = db.collection('students');
        const result = await collection.findOne({ _id: new ObjectId(id) });
        response.send({ "message": "data found", success: true, result: result });
    })

    // update student by id
    app.post("/ui/update/:id", async (request, response) => {
        const { id } = request.params;
        console.log(id, request.body)

        // check id before update
        if (!ObjectId.isValid(id)) {
            return response.send({
                message: "Invalid ID",
                success: false
            });
        }

        const collection = db.collection('students');
        const filter = { _id: new ObjectId(id) };
        const updateData = { $set: request.body };
        const result = await collection.updateOne(filter, updateData);

        if (result) {
            response.send("<h1>Data updated successfully</h1><a href='/ui'>Go back to UI</a>");
        } else {
            response.send("<h1>Data not found, try again later</h1><a href='/ui'>Go back to UI</a>");
        }
    })

    // actual update api to update student by id
    // update student by id
    app.put("/update/:id", async (request, response) => {
        const { id } = request.params;
        console.log(id, request.body)

        // check id before update
        if (!ObjectId.isValid(id)) {
            return response.send({
                message: "Invalid ID",
                success: false
            });
        }

        const collection = db.collection('students');
        const filter = { _id: new ObjectId(id) };
        const updateData = { $set: request.body };
        const result = await collection.updateOne(filter, updateData);

        if (result) {
            response.send({ "message": "data updated", success: true, result: request.body });
        } else {
            response.send({ "message": "data not updated, try again later", success: false });
        }
    })
})

app.listen(3200);