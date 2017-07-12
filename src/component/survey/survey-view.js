import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SurveyView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{padding: 10}}>
                <img style={styles.faceImage} src={this.props.imageURL}></img>
                <hr/>
                <p>
                    <button type="button" className="btn btn-primary btn-lg" style={styles.button}
                            onClick={this.props.onLikeClick}>좋아요</button>
                    <button type="button" className="btn btn-default btn-lg" style={styles.button}
                            onClick={this.props.onDislikeClick}>별로에요</button>
                </p>
            </div>
        );
    }
}

SurveyView.propTypes = {
    imageURL: PropTypes.string,
    onLikeClick: PropTypes.func,
    onDislikeClick: PropTypes.func
};

const styles = {
    faceImage: {
        maxHeight: 400,
        maxWidth: 400
    },
    button: {marginRight: 5}
};
