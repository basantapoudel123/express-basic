import express from "express";
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
    res.setHeader("Set-Cookie", [
        "isLoggedIn=true",
        "username=" + req.body.username
    ]);
    res.render("cookies/profile");
});

app.get("/", (req, res) => {
    let cookiesData = req.get("cookie");
    cookiesData = cookiesData.split(";");
    cookiesData = cookiesData[1].split("=");
    console.log(cookiesData[1]);
    res.render("cookies/home", { name: cookiesData[1] });
});

app.listen(3200);