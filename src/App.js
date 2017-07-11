import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './component/login/login';
import Register from "./component/register/register";
import Survey from "./component/survey/survey";

const styles = {
    appTitle: {
        marginLeft: 10
    }
};

const App = () => (
    <Router>
        <div>
            <h1 style={styles.appTitle}>AIN</h1>

            <hr/>

            <Route exact path="/" component={Login} />
            <Route path="/uploadImage" component={Register} />
            <Route path="/survey" component={Survey} />
        </div>
    </Router>
);

export default App;