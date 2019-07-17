import React, { Component } from 'react';
import axios from 'axios';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/';

export default class CreateChallenge extends Component {

    constructor(props) {
        super(props);

        this.onChangeP1Name = this.onChangeP1Name.bind(this);
        this.onChangeP2Name = this.onChangeP2Name.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            p1Name: '',
            p2Name: '',
            winner: null
        }
    }

    onChangeP1Name(e) {
        this.setState({
            p1Name: e.target.value
        });
    }

    onChangeP2Name(e) {
        this.setState({
            p2Name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); //prevent default submit behavior
        const newChallenge = {
            p1Name: this.state.p1Name,
            p2Name: this.state.p2Name,
            winner: this.state.winner
        };

        axios.post(URL+'challenges/add', newChallenge)
            .then(res => console.log(res.data));

        this.setState({
            p1Name: '',
            p2Name: ''
        });
    }

    render() {
        return (
            <div>
                <h3>Create New Challenge</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Player 1 Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.p1Name}
                                onChange={this.onChangeP1Name}
                                />
                    </div>
                    <div className="form-group">
                        <label>Player 2 Name: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.p2Name}
                                onChange={this.onChangeP2Name}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Challenge" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}