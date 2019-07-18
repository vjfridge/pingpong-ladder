import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/';

const Player = props => (
    <tr>
        <td>{props.player.rank}</td>
        <td>{props.player.name}</td>
        <td>
            <Link to={'/edit/'+props.player._id}>Edit</Link>
        </td>
    </tr>
);

const Challenge = props => (
    <tr>
        <td>{props.challenge.p1.name}</td>
        <td>{props.challenge.p2.name}</td>
        
        <td>
            <Select 
                defaultValue={(props.challenge.winner == null)? { value: null, label: 'Pending...' } : { value: props.challenge.winner, label: props.challenge.winner }}
                onChange={e => {props.this_HomePage.onChangeChallengeWinner(e, props.challenge)}}
                options={[
                    { value: null, label: 'Pending...' },
                    { value: props.challenge.p1.name, label: props.challenge.p1.name },
                    { value: props.challenge.p2.name, label: props.challenge.p2.name }
                ]} />
        </td>
    </tr>
);

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

    onChangeChallengeWinner(e, currentChallenge) {
        const editedChallenge = {
            p1Name: currentChallenge.p1Name,
            p2Name: currentChallenge.p2Name,
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