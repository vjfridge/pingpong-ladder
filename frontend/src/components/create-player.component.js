import React, { Component } from 'react';
import axios from 'axios';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/';

export default class CreatePlayer extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            points: 1000
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); //prevent default submit behavior
        const newPlayer = {
            name: this.state.name,
            points: this.state.points
        };

        axios.post(URL+'players/add', newPlayer)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
        });
    }

    render() {
        return (
            <div>
                <h3>Create New Player</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Player" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}