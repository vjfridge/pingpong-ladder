import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePlayer extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRank = this.onChangeRank.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            rank: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeRank(e) {
        this.setState({
            rank: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); //prevent default submit behavior
        const newPlayer = {
            name: this.state.name,
            rank: this.state.rank
        };

        axios.post('http://localhost:4000/players/add', newPlayer)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            rank: ''
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
                        <label>Rank: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.rank}
                                onChange={this.onChangeRank}
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