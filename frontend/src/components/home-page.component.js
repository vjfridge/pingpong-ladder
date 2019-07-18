import React, { Component } from 'react';
import Select from 'react-select'
import { Link } from 'react-router-dom';
import axios from 'axios';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/';
console.log('URL:'+URL);

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
        <td>{props.challenge.p1Name}</td>
        <td>{props.challenge.p2Name}</td>
        
        <td>
            <Select 
                defaultValue={{ value: null, label: 'Pending...' }}
                options={[
                    { value: null, label: 'Pending...' },
                    { value: props.challenge.p1Name, label: props.challenge.p1Name },
                    { value: props.challenge.p2Name, label: props.challenge.p2Name }
                ]} />
        </td>
    </tr>
);

export default class HomePage extends Component {

    constructor(props) {
        super(props);
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

    // componentDidUpdate() {
    //     axios.get(URL+'players/')
    //         .then(response => {
    //             this.setState({players: response.data});
    //         })
    //         .catch(function(error) {
    //             console.log(error);
    //         });
    //     axios.get(URL+'challenges/')
    //         .then(response => {
    //             this.setState({challenges: response.data});
    //         })
    //         .catch(function(error) {
    //             console.log(error);
    //         });
    // }

    playersRanking() {
        return this.state.players.map(function(currentPlayer, i) {
            return <Player player={currentPlayer} key={i} />;
        });
    }

    challengesList() {
        return this.state.challenges.map(function(currentChallenge, i) {
            return <Challenge challenge={currentChallenge} key={i} />;
        });
    }

    render() {
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
                        { this.challengesList() }
                    </tbody>
                </table>
            </div>
        )
    }
}