import React, {Component} from 'react';
import SurveyView from "./survey-view";
import 'whatwg-fetch';
import PropTypes from 'prop-types';

export const S3_URL = "https://s3.amazonaws.com";
export const AIN_IMAGES_BUCKET = "ain-images";
const FACE_BASE_API_URL = "https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/facebase";

export default class Survey extends Component {
    constructor(props) {
        super(props);

        this.onLikeClick = this.onLikeClick.bind(this);
        this.onDislikeClick = this.onDislikeClick.bind(this);

        this.state = {
            showingIndex: -1,
            showingFaceBase: {
                fileName: "",
                fileURL: ""
            },
            faceBases: [],
            preferences: []
        };
    }

    componentWillMount() {
        return fetch(`${FACE_BASE_API_URL}?gender=${this.props.gender}`, {
            mode: 'cors',
            headers: {
                "X-Api-Key": "o5F4feDYQHUzmkpQcOdH7cE7Gv3TpJ7606S8uLs1",
                "Content-Type": "application/json"
            },
            method: 'GET'
        }).then(response => response.json())
            .then(faceBases => {
                const faceBasesWithURL = faceBases.map(faceImage =>
                    Object.assign({}, faceImage, {fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/${faceImage.fileName}`}));

                this.setState({
                    showingIndex: 0,
                    showingFaceBase: faceBasesWithURL[0],
                    faceBases: faceBasesWithURL
                });

                console.log(faceBasesWithURL);
            });
    }

    onLikeClick() {
        const {showingIndex, faceBases, showingFaceBase, preferences} = this.state;

        this.setState({
            showingIndex: showingIndex + 1,
            showingFaceBase: faceBases[showingIndex + 1],
            preferences: [...preferences, Object.assign({}, showingFaceBase, { preference: true})]
        });
    }

    onDislikeClick() {
        const {showingIndex, faceBases, showingFaceBase, preferences} = this.state;

        this.setState({
            showingIndex: showingIndex + 1,
            showingFaceBase: faceBases[showingIndex + 1],
            preferences: [...preferences, Object.assign({}, showingFaceBase, { preference: false})]
        });
    }

    render() {
        return (
            <SurveyView onLikeClick={this.onLikeClick} onDislikeClick={this.onDislikeClick} imageURL={this.state.showingFaceBase.fileURL}/>
        );
    }
}

Survey.propTypes = {
    gender: PropTypes.string.isRequired
};
