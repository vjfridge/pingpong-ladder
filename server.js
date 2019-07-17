const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const playerRoutes = express.Router();
const PORT = process.env.PORT || 4000;
const dbConnectionString = process.env.dbConnectionString || 'mongodb://127.0.0.1:27017/players';
const path = require("path");
require("dotenv").config();

let Player = require('./player.model');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend", "build")));

mongoose.connect(dbConnectionString, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
});

playerRoutes.route('/').get(function(req, res) {
    Player.find(function(err, players) {
        if (err) {
            console.log(err);
        } else {
            res.json(players);
        }
    });
});

playerRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Player.findById(id, function(err, player) {
        res.json(player);
    });
});

playerRoutes.route('/add').post(function(req, res) {
    let player = new Player(req.body);
    player.save()
        .then(player => {
            res.status(200).json({'player': 'player added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new player failed');
        });
});

playerRoutes.route('/update/:id').post(function(req, res) {
    Player.findById(req.params.id, function(err, player) {
        if (!player) {
            res.status(404).send('data is not found');
        } else {
            player.name = req.body.name;
            player.rank = req.body.rank;

            player.save().then(player => {
                res.json('Player updated');
            })
            .catch(err => {
                res.status(400).send('Update not possible');
            });
        }
    });
});

playerRoutes.route('/delete/:id').delete(function(req, res) {
    Player.findByIdAndDelete(req.params.id, function(err, player) {
        if (!player) return res.status(404).send('data is not found');
        if (err) return res.status(400).send(err);  
        const response = {
            message: "Player successfully deleted",
            id: player._id
        };
        return res.status(200).send(response);
    });
});

app.use('/players', playerRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, function() {
    console.log(`Server is running on PORT: ${PORT}`);
});