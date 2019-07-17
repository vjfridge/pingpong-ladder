import React, { Component } from 'react';
import axios from 'axios';
const URL = process.env.URL || 'http://localhost:4000/';

export default class EditPlayer extends Component {

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

    componentDidMount() {
        axios.get(URL+'players/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    rank: response.data.rank
                });
            })
            .catch(function(error) {
                console.log(error);
            })
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
        e.preventDefault();
        const editedPlayer = {
            name: this.state.name,
            rank: this.state.rank
        };

        axios.post(URL+'players/update/'+this.props.match.params.id, editedPlayer)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Player</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Name: </label>
                        <input type='text'
                                className='form-control'
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className='form-group'>
                        <label>Rank: </label>
                        <input type='text'
                                className='form-control'
                                value={this.state.rank}
                                onChange={this.onChangeRank}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Player" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}