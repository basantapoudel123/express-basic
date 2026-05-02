import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    // res.render("home");
    res.render("home", { title: "Home Page", description: "This is home page description" });
});

app.get('/add-user', (req, res) => {
    res.render('addUser');
});


app.get('/users', (req, res) => {
    const users = ["Basanta", "Suman", "Sujan", "Sushil"];
    res.render('users', { users, isLoggedIn: false });
});

app.post('/submit-user', (req, res) => {
    console.log("Response:", req.body);
    res.render('submitUser', req.body);
});

app.listen(3200);