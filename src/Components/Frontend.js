import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './Login';
import Home from './Home';

export default class Frontend extends Component {

    render() {
        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/home" exact component={Home} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}