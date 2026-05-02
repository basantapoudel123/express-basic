import express from 'express';
import path from 'path';

const app = express();
const absPath = path.resolve("view/");
const stylePath = path.resolve("public/css");

app.use(express.static(stylePath));

app.get('/', (req, res) => {
    // for type: "commonjs" in package.json
    // console.log(__dirname);

    res.sendFile(absPath + "/home.html");
});

app.get('/login', (req, res) => {
    res.sendFile(absPath + "/login.html");
});

app.get('/about', (req, res) => {
    res.sendFile(absPath + "/about.html");
});

app.post('/submit', (req, res) => {
    res.send(`<h1>Form submitted</h1> <br><br>
        <a href='/'>Go to Home Page</a>`);
});

app.use((req, res) => {
    res.status(404).sendFile(absPath + "/pageNotFound.html");
});

app.listen(3200);