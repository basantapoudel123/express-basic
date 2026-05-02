// import express from 'express';
// import morgan from 'morgan';
// const app = express();

// app.use(morgan('dev'));
// app.get('/', (req, res) => {
//     res.send("<h1>Home Page</h1>");
// });

// app.get('/user', (req, res) => {
//     res.send("<h1>User Page</h1>");
// });


// app.get('/wait', (req, res) => {
//     setTimeout(() => {
//         res.send("<h1>Result after 1 second</h1>");
//     }, 1000);
// });

// app.listen(3200);


// Error handling middleware
import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get('/user', (req, res) => {
    res.send1("<h1>User Page</h1>");
});


app.get('/error', (req, res, next) => {
    const err = new Error("This is a custom error");
    err.status = 404;
    next(err);
});

// function errorHandler(err, req, res, next) {
//     console.error(err.stack);
//     res.status(err.status || 500).send("<h1>Something went wrong!</h1>");
// }

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send("<h1>Something went wrong!</h1>");
});
app.listen(3200);
