import React, {Component} from "react";
import LoginView from "./login-view";
import 'whatwg-fetch';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onGoClick.bind(this);
    }

    onGoClick(email, gender) {

    }

    render() {
        return (<LoginView onGoClick={this.onGoClick}/>);
    }
}