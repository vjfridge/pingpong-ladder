import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/';

const Player = props => (
    <tr>
        <td>{props.player.rank}</td>
        <td>{props.player.name}</td>
        <td>{props.player.points}</td>
        <td>
            <Link to={'/edit/'+props.player._id}>Edit</Link>
        </td>
    </tr>
);

const Challenge = props => {
    console.log('challenge:'+JSON.stringify(props.challenge));
    var winner;
    if(props.challenge.winner == null) {
        winner = (<td>
            <Select 
                defaultValue={{ value: null, label: 'Pending...' }}
                onChange={e => {props.this_HomePage.onChangeChallengeWinner(e, props.challenge)}}
                options={[
                    { value: null, label: 'Pending...' },
                    { value: props.challenge.p1, label: props.challenge.p1.name },
                    { value: props.challenge.p2, label: props.challenge.p2.name }
                ]} />
        </td>);
    } else {
        var winnerName = (props.challenge.winner == props.challenge.p1._id)? props.challenge.p1.name : props.challenge.p2.name;
        winner = <td>{winnerName}</td>;
    }
    return (
        <tr>
            <td>{props.challenge.p1.name}</td>
            <td>{props.challenge.p2.name}</td>
            {winner}
        </tr>
    )
};

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        this.onChangeChallengeWinner = this.onChangeChallengeWinner.bind(this);

        this.state = {
            players: [], 
            challenges: []
        };
    }

    componentDidMount() {
        axios.get(URL+'players/')
            .then(response => {
                this.setState({players: response.data});
            })
            .catch(function(error) {
                console.log(error);
            });
        axios.get(URL+'challenges/')
            .then(response => {
                this.setState({challenges: response.data});
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    updatePlayerPoints(e, currentChallenge) {
        var p1WinValue = (e.value._id === currentChallenge.p1._id)? 1:0; // 1 means that player1 won, 0 means they lost

        var p1OrigPoints = currentChallenge.p1.points;
        var p2OrigPoints = currentChallenge.p2.points;

        var p1WinProbability = (1.0 / (1.0 + Math.pow(10, ((p1OrigPoints - p2OrigPoints) / 400))));
        var p2WinProbability = (1.0 / (1.0 + Math.pow(10, ((p2OrigPoints - p1OrigPoints) / 400))));

        /* K is a constant. If K is of a lower value, then the rating is changed by a small 
        fraction but if K is of a higher value, then the changes in the rating are significant. 
        Different organizations set a different value of K. */
        var K = 30;

        var p1NewPoints = p1OrigPoints + K*(p1WinValue - p1WinProbability);
        var p2NewPoints = p2OrigPoints + K*((1-p1WinValue) - p2WinProbability);

        const editedP1 = {
            name: currentChallenge.p1.name,
            rank: currentChallenge.p1.rank,
            points: p1NewPoints
        };

        const editedP2 = {
            name: currentChallenge.p2.name,
            rank: currentChallenge.p2.rank,
            points: p2NewPoints
        };

        console.log('editedP1+'+JSON.stringify(editedP1));
        axios.post(URL+'players/update/'+currentChallenge.p1._id, editedP1)
            .then(res => console.log(res.data));

        axios.post(URL+'players/update/'+currentChallenge.p2._id, editedP2)
            .then(res => console.log(res.data));
    }

    onChangeChallengeWinner(e, currentChallenge) {
        this.updatePlayerPoints(e, currentChallenge);

        const editedChallenge = {
            p1_id: currentChallenge.p1._id,
            p2_id: currentChallenge.p2._id,
            winner: e.value
        };
        
        axios.post(URL+'challenges/update/'+currentChallenge._id, editedChallenge)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            });
    }

    playersRanking() {
        return this.state.players.map(function(currentPlayer, i) {
            return <Player player={currentPlayer} key={i} />;
        });
    }

    challengesList(this_HomePage) {
        return this.state.challenges.map(function(currentChallenge, i) {
            return <Challenge challenge={currentChallenge} key={i} this_HomePage={this_HomePage} />
        });
    }

    render() {
        const this_HomePage = this;
        return (
            <div>
                <h3>Leaderboard</h3>
                <table className='table table-striped' style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Points</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.playersRanking() }
                    </tbody>
                </table>
                <h3>Challenges</h3>
                <table className='table table-striped' style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Player 1</th>
                            <th>Player 2</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.challengesList(this_HomePage) }
                    </tbody>
                </table>
            </div>
        )
    }
}