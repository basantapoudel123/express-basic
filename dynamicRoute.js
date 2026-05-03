import express from 'express';
import userData from './users.json' with { type: 'json' };
const app = express();

// app.get('/', (req, res) => {
//     const users = ["basanta", "suman", "sujan", "sushil"];
//     let data = "<ul>";
//     for (let i = 0; i < users.length; i++) {
//         console.log(users[i]);
//         data += `<li><a href="/users/${users[i]}">${users[i][0].toUpperCase() + users[i].slice(1)}</a></li>`;
//     }
//     data += "</ul>";
//     res.send(data);
// });

// app.get('/users/:userId', (req, res) => {
//     const userId = req.params.userId;
//     res.send(`User Name: ${userId[0].toUpperCase() + userId.slice(1)}`);
// });

app.get("/", (req, res) => {
    res.send(userData);
});

app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    // const user = userData.find(u => u.id === parseInt(userId));
    const user = userData.filter(u => u.id === userId);

    if (user) {
        res.send(user);
    } else {
        res.send("No user exist with this id");
    }
})

app.get("/username/:name", (req, res) => {
    const name = req.params.name;
    const user = userData.filter(u => u.name.toLowerCase() === name.toLowerCase());

    if (user && user.length > 0) {
        res.send(user);
    } else {
        res.send("No user exist with this name");
    }
})

app.listen(3200);