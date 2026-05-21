import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, resp) => {
    resp.send({
        name: "Ram",
        age: "25",
        email: "ram@gmail.com",
        department: "BEIT"
    })
})

app.listen(3200);