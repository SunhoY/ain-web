import React, {Component} from 'react';
import UploadView from "./upload-view";
import 'whatwg-fetch';

export default class Upload extends Component {
    constructor(props) {
        super(props);

        this.onImageChange = this.onImageChange.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

        this.state = {
            file: "",
            previewUrl: ""
        }
    }

    onUploadClick() {
        let reader = new FileReader();

        reader.onloadend = () => {
            this.uploadImage(reader.result, this.state.file.type);
        };

        reader.readAsDataURL(this.state.file);
    }

    uploadImage(dataURL, fileType) {
        let base64String = dataURL.split(",")[1];
        let input = JSON.stringify({
            base64Image: base64String,
            fileType: fileType
        });

        let body = JSON.stringify({
            input: input,
            name: "firstExecution",
            stateMachineArn: "arn:aws:states:us-east-1:516159972358:stateMachine:upload-face-image"
        });

        console.log(body);

        fetch("https://bclbxxk175.execute-api.us-east-1.amazonaws.com/test/faceimage", {
            mode: 'cors',
            headers: {
                "X-Api-Key": "o5F4feDYQHUzmkpQcOdH7cE7Gv3TpJ7606S8uLs1",
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: body
        });
    }

    onImageChange(imageFile) {
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                file: imageFile,
                previewUrl: reader.result
            });
        };

        reader.readAsDataURL(imageFile);
    }

    render() {
        return (
            <UploadView
                previewUrl={this.state.previewUrl}
                onImageChange={this.onImageChange}
                onUploadClick={this.onUploadClick}
            />
        )
    }
}

