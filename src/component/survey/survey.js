import React, {Component} from 'react';
import SurveyView from "./survey-view";
import 'whatwg-fetch';
import PropTypes from 'prop-types';
import {apiHeaders} from '../../api/ainApiHeaders';

export const S3_URL = "https://s3.amazonaws.com";
export const AIN_IMAGES_BUCKET = "ain-images";
const FACE_BASE_API_URL = "https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/facebase";
const PREFERENCE_API_URL = "https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/preference";

export default class Survey extends Component {
    constructor(props) {
        super(props);

        this.onLikeClick = this.onLikeClick.bind(this);
        this.onDislikeClick = this.onDislikeClick.bind(this);
        this.showNextImage = this.showNextImage.bind(this);
        this.storePreference = this.storePreference.bind(this);

        this.state = {
            showingIndex: -1,
            showingFaceBase: {
                fileName: "",
                fileURL: ""
            },
            faceBases: [],
            preferences: [],
            surveyDone: false
        };
    }

    componentWillMount() {
        return fetch(`${FACE_BASE_API_URL}?gender=${this.props.gender}`, {
            mode: 'cors',
            headers: apiHeaders,
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
            });
    }

    submitPreferences() {
        let {preferences} = this.state;

        fetch(PREFERENCE_API_URL, {
            headers: apiHeaders,
            mode: "cors",
            body: JSON.stringify({preferences})
        });
    }

    onLikeClick() {
        this.storePreference(true);
        this.showNextImage();
    }

    onDislikeClick() {
        this.storePreference(false);
        this.showNextImage();
    }

    showNextImage() {
        const {showingIndex, faceBases, surveyDone} = this.state;

        if(surveyDone) {
            return;
        }

        this.setState({
            showingIndex: showingIndex + 1,
            showingFaceBase: faceBases[showingIndex + 1],
        });
    }

    storePreference(preference) {
        if(surveyDone) {
            return;
        }

        const {showingFaceBase: {faceData}, preferences, faceBases} = this.state;
        const surveyDone = preferences.length + 1 === faceBases.length;

        this.setState({
            preferences: [...preferences, Object.assign({}, {faceData}, { preference: preference})],
            surveyDone: surveyDone
        });
    }

    render() {
        return (
            <SurveyView
                onLikeClick={this.onLikeClick}
                onDislikeClick={this.onDislikeClick}
                imageURL={this.state.showingFaceBase.fileURL}
                submitEnabled={this.state.surveyDone}
            />
        );
    }
}

Survey.propTypes = {
    gender: PropTypes.string.isRequired
};
