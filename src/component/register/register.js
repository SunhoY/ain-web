import React, {Component} from 'react';
import RegisterView from "./register-view";
import 'whatwg-fetch';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onImageChange = this.onImageChange.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.setS3FileNameAndEnableSubmit = this.setS3FileNameAndEnableSubmit.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

        this.state = {
            file: "",
            previewUrl: "",
            s3FileName: ""
        }
    }

    onImageChange(selectEvent) {
        let file = selectEvent.target.files[0];
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                file: file,
                previewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    onUploadClick(e) {
        e.preventDefault();

        let reader = new FileReader();

        reader.onloadend = () => {
            this.uploadImage(reader.result, this.state.file.type);
        };

        reader.readAsDataURL(this.state.file);
    }

    onSubmitClick(e) {
        e.preventDefault();

        const {s3FileName} = this.state;
        const requestBody = JSON.stringify({fileName: s3FileName});

        fetch("https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/facebase", {
            mode: 'cors',
            headers: {
                "X-Api-Key": "o5F4feDYQHUzmkpQcOdH7cE7Gv3TpJ7606S8uLs1",
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: requestBody
        })
    }

    uploadImage(dataURL, fileType) {
        let base64String = dataURL.split(",")[1];
        let input = JSON.stringify({
            base64Image: base64String,
            fileType: fileType
        });

        fetch("https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/faceimage", {
            mode: 'cors',
            headers: {
                "X-Api-Key": "o5F4feDYQHUzmkpQcOdH7cE7Gv3TpJ7606S8uLs1",
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: input
        }).then(response => response.json()).then(this.setS3FileNameAndEnableSubmit);
    }

    setS3FileNameAndEnableSubmit({storedFileName}) {
        this.setState({
            s3FileName: storedFileName
        });
    }

    render() {
        return (
            <RegisterView
                previewUrl={this.state.previewUrl}
                onImageChange={this.onImageChange}
                onUploadClick={this.onUploadClick}
                onSubmitClick={this.onSubmitClick}
                uploadEnabled={this.state.file !== ""}
                submitEnabled={this.state.s3FileName !== ""}
            />
        )
    }
}

