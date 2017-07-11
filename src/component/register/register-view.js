import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RegisterView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{padding: 10}}>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="fileUpload">Image Upload</label>
                        <input type="file" id="fileUpload" onChange={this.props.onImageChange}></input>
                        <p className="help-block">선글라스나 모자를 쓰지 않은 정면 사진을 올려주세요.</p>
                    </div>
                    <button type="button" className="btn btn-default btn-lg" style={styles.button} disabled={!this.props.uploadEnabled}
                            onClick={this.props.onUploadClick}>UPLOAD</button>
                    <button type="button" className="btn btn-primary btn-lg" style={styles.button} disabled={!this.props.submitEnabled}
                            onClick={this.props.onSubmitClick}>REGISTER</button>
                    <hr/>
                </form>
                <img src={this.props.previewURL} className="img-rounded" style={styles.preview}></img>
            </div>
        )
    }
}

RegisterView.propTypes = {
    uploadEnabled: PropTypes.bool,
    submitEnabled: PropTypes.bool,
    onUploadClick: PropTypes.func,
    onSubmitClick: PropTypes.func,
    onImageChange: PropTypes.func,
    previewURL: PropTypes.string
};

const styles = {
    preview: {
        maxHeight: 400,
        maxWidth: 400
    },
    button: {
        marginRight: 10
    }
};