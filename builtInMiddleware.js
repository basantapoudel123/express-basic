import express from 'express';
import path from 'path';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public/css/")));

app.get('/', (req, res) => {
    const filePath = path.resolve("view/home.html");
    res.sendFile(filePath);
});


app.get('/login', (req, res) => {
    res.send(`<form action="/submit" method="post">
        <input type='text' name='username' placeholder='Username'><br><br>
        <input type='password' name='password' placeholder='Password'><br><br>
        <button type='submit'>Login</button>
        </form>`);
});


app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send(`<h1>Form submitted</h1> <br><br>
    <a href='/'>Go to Home Page</a>`);
});


app.get('/admin', (req, res) => {
    res.send("<h1>Admin Page</h1>");
});


app.get('/user', (req, res) => {
    res.send("<h1>User Page</h1>");
});


app.listen(3200);