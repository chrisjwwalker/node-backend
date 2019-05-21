const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const mongoose = require('mongoose');

let Account = require('./accounts.model');

mongoose.connect('mongodb://127.0.0.1:32768/node-backend-db', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

const accountsRoutes = express.Router();

accountsRoutes.route('/add').post(function(req, res) {
    let todo = new Account(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/accounts', accountsRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
