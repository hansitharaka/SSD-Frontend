import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Message from "./Message";
import FileUpload from "./FileUpload";

export default class Frontend extends Component {

    render() {
        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/home" exact component={Home} />
                        <Route path="/message" exact component={Message} />
                        <Route path="/upload" exact component={FileUpload} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}