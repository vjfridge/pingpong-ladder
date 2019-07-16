import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Player = props => (
    <tr>
        <td>{props.player.rank}</td>
        <td>{props.player.name}</td>
        <td>
            <Link to={'/edit/'+props.player._id}>Edit</Link>
        </td>
    </tr>
)

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {players: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/players/')
            .then(response => {
                this.setState({players: response.data});
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/players/')
            .then(response => {
                this.setState({players: response.data});
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    ranking() {
        return this.state.players.map(function(currentPlayer, i) {
            return <Player player={currentPlayer} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Ranking</h3>
                <table className='table table-striped' style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ranking() }
                    </tbody>
                </table>
            </div>
        )
    }
}