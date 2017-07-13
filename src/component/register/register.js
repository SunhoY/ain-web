import React, {Component} from 'react';
import RegisterView from "./register-view";
import 'whatwg-fetch';
import {apiHeaders} from '../../api/ainApiHeaders';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onImageChange = this.onImageChange.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.setS3FileNameState = this.setS3FileNameState.bind(this);

        this.state = {
            file: "",
            previewURL: "",
            s3FileName: ""
        }
    }

    onImageChange(selectEvent) {
        let file = selectEvent.target.files[0];
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                file: file,
                previewURL: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    onUploadClick() {
        let base64String = this.state.previewURL.split(",")[1];
        let input = JSON.stringify({
            base64Image: base64String,
            fileType: this.state.file.type
        });

        return fetch("https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/faceimage", {
            mode: 'cors',
            headers: apiHeaders,
            method: 'POST',
            body: input
        }).then(response => response.json()).then(this.setS3FileNameState);
    }

    onSubmitClick() {
        const {s3FileName} = this.state;
        const requestBody = JSON.stringify({fileName: s3FileName});

        return fetch("https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/facebase", {
            mode: 'cors',
            headers: apiHeaders,
            method: 'POST',
            body: requestBody
        });
    }

    setS3FileNameState({storedFileName}) {
        this.setState({
            s3FileName: storedFileName
        });
    }

    render() {
        return (
            <RegisterView
                previewURL={this.state.previewURL}
                onImageChange={this.onImageChange}
                onUploadClick={this.onUploadClick}
                onSubmitClick={this.onSubmitClick}
                uploadEnabled={this.state.file !== ""}
                submitEnabled={this.state.s3FileName !== ""}
            />
        )
    }
}

