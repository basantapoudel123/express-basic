import express from 'express';
import { MongoClient } from 'mongodb';

const dbName = "college";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
const app = express();
app.use(express.urlencoded({ extended: true }));
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
})

app.listen(3200);