import React, {Component} from 'react';

export default class UploadView extends Component {
    constructor(props) {
        super(props);
        this.onImageChange = this.onImageChange.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    onImageChange(e) {
        let file = e.target.files[0];

        this.props.onImageChange(file);
    }

    onUploadClick(e) {
        e.preventDefault();

        this.props.onUploadClick();
    }

    onSubmitClick(e) {
        e.preventDefault();

        this.props.onSubmitClick();
    }

    render() {
        console.log(this.props.submitEnabled);
        return (
            <div style={{padding: 10}}>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="fileUpload">Image Upload</label>
                        <input type="file" id="fileUpload" onChange={this.onImageChange}></input>
                        <p className="help-block">선글라스나 모자를 쓰지 않은 정면 사진을 올려주세요.</p>
                    </div>
                    <button className="btn btn-primary btn-lg" style={styles.button} disabled={!this.props.uploadEnabled}
                            onClick={this.onUploadClick}>UPLOAD</button>
                    <button className="btn btn-primary btn-lg" style={styles.button} disabled={!this.props.submitEnabled}
                            onClick={this.onSubmitClick}>SUBMIT</button>
                    <hr/>
                </form>
                <img src={this.props.previewUrl} className="img-rounded" style={styles.preview}></img>
            </div>
        )
    }
}

const styles = {
    preview: {
        maxHeight: 400,
        maxWidth: 400
    },
    button: {
        marginRight: 10
    }
};