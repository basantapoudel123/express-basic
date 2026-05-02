// vanilla node js importing style ("type": "commonjs" in package.json)
// const express = require("express");
// import { home } from "./pages/home.js";

// change type to "module" in package.json to use ES6 import style
import express from "express";
import { home } from "./pages/home.js";
import login from "./pages/login.js";
import { submit } from "./pages/submit.js";

const app = express();

// middleware function
// function checkRoute(req, res, next) {
//     console.log("Route accessed: " + req.url);
//     next();
// }
// app.use(checkRoute);

app.use((req, res, next) => {
    console.log("Route accessed: " + req.url);
    next();
})

app.get("/", (req, res) => {
    res.send(home());
});

app.get("/login", (req, res) => {
    res.send(login());
});

app.post("/submit", (req, res) => {
    submit(req, res)
});

app.listen(3200);