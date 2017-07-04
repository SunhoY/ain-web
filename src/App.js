import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './component/login/login';
import Upload from "./component/upload/upload";
import Survey from "./component/survey/survey";

const App = () => (
    <Router>
        <div>
            <h1>AIN</h1>
            <hr/>

            <Route exact path="/" component={Login} />
            <Route path="/uploadImage" component={Upload} />
            <Route path="/survey" component={Survey} />
        </div>
    </Router>
);

export default App;