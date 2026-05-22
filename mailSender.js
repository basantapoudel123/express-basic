import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

app.get("/email", (req, res) => {
    res.render("email/mail");
});

app.post("/send-email", (req, res) => {
    console.log(req.body);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: req.body.subject,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send("Error sending email: " + error);
        } else {
            res.send("Email sent successfully!!");
        }
    })
});

app.listen(3200);