import express from "express";
import multer from "multer";

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage});

app.get("/", (req, resp) => {
    resp.send(`
        <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="myfile" />
        <button>Upload File</button>
        </form>
        `)
})

app.post("/upload", upload.single("myfile"), (req, resp) => {
    resp.send({
        message: "File Uploaded",
        info: req.file
    })
})

app.listen(3200);