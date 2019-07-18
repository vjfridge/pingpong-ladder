import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/';

export default class CreateChallenge extends Component {

    constructor(props) {
        super(props);

        this.onChangeP1_id = this.onChangeP1_id.bind(this);
        this.onChangeP2_id = this.onChangeP2_id.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            p1_id: '',
            p2_id: '',
            winner: null,
            players: []
        }
    }

    componentDidMount() {
        axios.get(URL+'players/')
            .then(response => {
                this.setState({players: response.data});
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    onChangeP1_id(e) {
        this.setState({
            p1_id: e.value
        });
    }

    onChangeP2_id(e) {
        this.setState({
            p2_id: e.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); //prevent default submit behavior
        const newChallenge = {
            p1_id: this.state.p1_id,
            p2_id: this.state.p2_id,
            winner: this.state.winner
        };
        console.log(JSON.stringify(newChallenge));
        axios.post(URL+'challenges/add', newChallenge)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            });

        this.setState({
            p1_id: '',
            p2_id: ''
        });
    }

    playersDropdown(isP1, this_CreateChallenge) {
        var nameOptionsList = [];
        this.state.players.forEach(function(currentPlayer) {
            nameOptionsList.push({ label:currentPlayer.name, value: currentPlayer._id });
        });
        return (
            <Select 
                onChange={e => {(isP1)? this_CreateChallenge.onChangeP1_id(e) : this_CreateChallenge.onChangeP2_id(e)}}
                options={nameOptionsList} />
        );
        
    }

    render() {
        const this_CreateChallenge = this;
        return (
            <div>
                <h3>Create New Challenge</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Player 1 Name: </label>
                        {this.playersDropdown(true, this_CreateChallenge)}
                    </div>
                    <div className="form-group">
                        <label>Player 2 Name: </label>
                        {this.playersDropdown(false, this_CreateChallenge)}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Challenge" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}