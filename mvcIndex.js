import express from 'express';
import { handleUsers } from './controller/userController.js';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/users', handleUsers);

app.listen(3200);