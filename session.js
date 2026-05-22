import express from "express";
import session from "express-session";
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "dinosaur",
}))

app.get("/login", (req, res) => {
    res.render("cookies/login");
});

app.post("/profile", (req, res) => {
    req.session.data = req.body;
    console.log(req.session.data);
    res.render("cookies/profile");
});

app.get("/", (req, res) => {
    const data = req.session.data;  
    console.log(data);
    res.render("cookies/home", { name: req.session.data.username });
});

app.listen(3200);