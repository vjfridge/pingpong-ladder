const express = require('express');
var passport = require('passport');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const playerRoutes = express.Router();
const challengeRoutes = express.Router();
const PORT = process.env.PORT || 4000;
const dbConnectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/players';
console.log('dbConnectionString:'+dbConnectionString);
const path = require("path");
require("dotenv").config();

let Player = require('./player.model');
let Challenge = require('./challenge.model');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static("client/build")); //dont need?
app.use(express.static(path.join(__dirname, "frontend", "build")));
app.use(passport.initialize()); 
require("./config/passport");

mongoose.connect(dbConnectionString, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
});



/* GET Google Authentication API. */
router.get(
    "auth/google", function (req, res) {
        console.log("/auth/google route handler");
        passport.authenticate("google", { scope: ["profile", "email"] }, function() {
            console.log('authenticate callback');
        })
    }
);

router.get(
    "auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    function(req, res) {
        console.log("/auth/google/callback authenticate");
        var token = req.user.token;
        res.redirect("http://localhost:3000?token=" + token);
    }
);

app.use(router);

playerRoutes.route('/').get(function(req, res) {
    Player.find(function(err, players) {
        if (err) {
            console.log(err);
        } else {
            res.json(players);
        }
    }).sort({points: -1}); //sort based on desending points
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
            player.points = req.body.points;

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

playerRoutes.route('/delete').delete(function(req, res) {
    Player.deleteMany({}, function(err, players) {
        if (err) return res.status(400).send(err); 
        const response = {
            message: "Players successfully deleted",
        };
        return res.status(200).send(response);
    });
});

app.use('/players', playerRoutes);

challengeRoutes.route('/').get(async function(req, res) {
    var challenges = await Challenge.find();
    //check for errors later?
    var frontendFormattedChallenges = [];
    for (var i = 0; i < challenges.length; i+=1) {
        let p1 = await Player.findById(challenges[i].p1_id);
        let p2 = await Player.findById(challenges[i].p2_id);
        frontendFormattedChallenges.push({
            p1: p1, 
            p2: p2, 
            winner: challenges[i].winner,
            _id: challenges[i]._id
        });
    }
    res.json(frontendFormattedChallenges);
    //.sort({date: 1}); 
});

challengeRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Challenge.findById(id, function(err, challenge) {
        res.json(challenge);
    });
});

challengeRoutes.route('/add').post(function(req, res) {
    let challenge = new Challenge(req.body);
    challenge.save()
        .then(challenge => {
            res.status(200).json({'challenge': 'challenge added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new challenge failed');
        });
});

challengeRoutes.route('/update/:id').post(function(req, res) {
    Challenge.findById(req.params.id, function(err, challenge) {
        if (!challenge) {
            res.status(404).send('data is not found');
        } else {
            challenge.p1_id = req.body.p1_id;
            challenge.p2_id = req.body.p2_id;
            challenge.winner = req.body.winner;

            challenge.save().then(challenge => {
                res.json('Challenge updated');
            })
            .catch(err => {
                res.status(400).send('Update not possible');
            });
        }
    });
});

challengeRoutes.route('/delete/:id').delete(function(req, res) {
    Challenge.findByIdAndDelete(req.params.id, function(err, challenge) {
        if (!challenge) return res.status(404).send('data is not found');
        if (err) return res.status(400).send(err);  
        const response = {
            message: "Challenge successfully deleted",
            id: challenge._id
        };
        return res.status(200).send(response);
    });
});

challengeRoutes.route('/delete').delete(function(req, res) {
    Challenge.deleteMany({}, function(err, challenges) {
        if (err) return res.status(400).send(err); 
        const response = {
            message: "Challenges successfully deleted",
        };
        return res.status(200).send(response);
    });
});

app.use('/challenges', challengeRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, function() {
    console.log(`Server is running on PORT: ${PORT}`);
});