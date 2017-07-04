import React, {Component} from 'react';

export default class LoginView extends Component {
    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onGoClick = this.onGoClick.bind(this);

        this.state = {
            selectedGender: "",
            email: ""
        };
    }

    onRadioChange(event) {
        this.setState({
            selectedGender: event.target.value
        });
    }

    onInputChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    onGoClick() {
        this.props.onGoClick(this.state.email, this.state.selectedGender);
    }

    render() {
        return (
            <div style={{padding: 10}}>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Email"
                               value={this.state.email} onChange={this.onInputChange}/>
                    </div>
                    <div className="radio-inline">
                        <label>
                            <input type="radio" name="gender" id="male" value="male"
                                   onChange={this.onRadioChange} checked={this.state.selectedGender === 'male'}/>Male
                        </label>
                    </div>
                    <div className="radio-inline">
                        <label>
                            <input type="radio" name="gender" id="female" value="female"
                                   onChange={this.onRadioChange} checked={this.state.selectedGender === 'female'}/>Female
                        </label>
                    </div>
                </form>
                <button className="btn btn-primary btn-lg" onClick={this.onGoClick}>렛츠 꼬우!</button>
            </div>
        );
    }
}

