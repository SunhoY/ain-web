import React, {Component} from 'react';
import SurveyView from "./survey-view";

export default class Survey extends Component {
    constructor(props) {
        super(props);
        this.onLikeClick = this.onLikeClick.bind(this);
        this.onDislikeClick = this.onDislikeClick.bind(this);
    }

    onLikeClick() {

    }

    onDislikeClick() {

    }

    render() {
        return (
            <SurveyView onLikeClick={this.onLikeClick} onDislikeClick={this.onDislikeClick} />
        );
    }
}
