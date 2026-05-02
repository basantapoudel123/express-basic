import express from 'express';

const app = express();

// Middleware 
// function ageCheck(req, res, next) {
//     const age = req.query.age;
//     if (age && age >= 18) {
//         next();
//     } else {
//         res.status(403).send("<h1>Access denied. You must be at least 18 years old.</h1>");
//     }
// }
// app.use(ageCheck);

// function ipCheck(req, res, next) {
//     const ip = req.socket.remoteAddress;
//     console.log("IP Address: " + ip);
//     if (ip.includes("192.168.1.99")) {
//         res.send("Alert! Access from this IP is not allowed.");
//     } else next();
// }
// app.use(ipCheck);


// Route middleware (multiple route middleware)
function checkAgeRouteMiddleware(req, res, next) {
    const age = req.query.age;
    if (age && age >= 18) {
        next();
    } else {
        res.status(403).send("<h1>Access denied. You must be at least 18 years old.</h1>");
    }
}

function checkURLRouteMiddleware(req, res, next) {
    const url = req.url;
    console.log("URL: " + url);
    if (url.includes("admin")) {
        res.send("Alert! Access to admin page is not allowed.");
    } else next();
}

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get('/users', checkURLRouteMiddleware, (req, res) => {
    res.send("<h1>Users Page</h1>");
});

app.get('/products', (req, res) => {
    res.send("<h1>Product Page</h1>");
});

app.get('/login', checkAgeRouteMiddleware, checkURLRouteMiddleware, (req, res) => {
    res.send("<h1>Login Page</h1>");
});

app.get('/admin', checkAgeRouteMiddleware, checkURLRouteMiddleware, (req, res) => {
    res.send("<h1>Admin Page</h1>");
});

app.listen(3200);