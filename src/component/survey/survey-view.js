import React, {Component} from 'react';

export default class SurveyView extends Component {
    constructor(props) {
        super(props);

        this.onLikeClick = this.onLikeClick.bind(this);
        this.onDislikeClick = this.onDislikeClick.bind(this);
    }

    onLikeClick(e) {
        e.preventDefault();

        this.props.onLikeClick();
    }

    onDislikeClick(e) {
        e.preventDefault();

        this.props.onDislikeClick();
    }

    render() {
        return (
            <div style={{padding: 10}}>
                <img src={this.props.imageUrl}></img>
                <hr/>
                <p>
                    <button type="button" className="btn btn-primary btn-lg" onClick={this.onLikeClick}>좋아요</button>
                    <button type="button" className="btn btn-default btn-lg" onClick={this.onDislikeClick}
                            style={{marginLeft: 5}}>별로에요</button>
                </p>
            </div>
        );
    }
}
