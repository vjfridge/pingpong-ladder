import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/';

export default class Login extends Component {

    constructor(props) {
        super(props);

       

        this.state = {
            
        };
    }

    componentDidMount() {
        axios.get(URL+'auth/google/')
            .then(response => {
                console.log('Login route');
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        const this_HomePage = this;
        return (
            <div>
                <h3>Leaderboard</h3>
            </div>
        )
    }
}