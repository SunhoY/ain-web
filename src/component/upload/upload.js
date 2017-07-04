import React, {Component} from 'react';
import UploadView from "./upload-view";

export default class Upload extends Component {
    constructor(props) {
        super(props);

        this.onImageChange = this.onImageChange.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);

        this.state = {
            file: "",
            previewUrl: ""
        }
    }

    onUploadClick() {
        console.log(this.state.file, this.state.previewUrl);
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

