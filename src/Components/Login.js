import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import AuthenticationService from './DataService/AuthenticationService';
import FrontendDataService from './DataService/FrontendDataService';
import Swal from "sweetalert2";
import "./style.css"

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMsg: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    loginClicked(event) {
        event.preventDefault();

        if (this.state.username === '' || this.state.password === '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Fields cannot be empty',
                background: '#fff',
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
            })
        } else {

            const user = {
                "username": this.state.username,
                "password": this.state.password
            }

            FrontendDataService.authenticateUser(user)
                .then( res => {
                    if (res.status === 200 && res.data) {
                        AuthenticationService.successfulLogin(this.state.username, res.data.role, res.data.token)

                        Swal.fire({
                            icon: 'success',
                            title: 'Login successfully',
                            background: '#fff',
                            confirmButtonColor: '#7a7a7a',
                            iconColor: '#479600'
                        })

                        // this.props.history.push("/home");
                        this.props.history.push("/message");
                    }

                }).catch( error => {
                console.log(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    background: '#fff',
                    confirmButtonColor: '#7a7a7a',
                    iconColor: '#e00404'
                })
            })
        }

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row no-gutter">

                    <div className="col-md-6 d-none d-md-flex login-bg-image"/>

                    <div className="col-md-6 bg-light">

                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-10 col-xl-7 mx-auto">
                                        <h3 className="display-4">Login</h3>
                                        <p className="text-muted mb-4">Please login using your email and password</p>
                                        <form className={"mt-5"} onSubmit={this.loginClicked}>
                                            <div className="form-group mb-3">
                                                <input id="inputEmail" type="email" placeholder="Email address"
                                                       value={this.state.username} required onChange={this.handleChange} name="username"
                                                       className="form-control rounded-pill border-0 shadow-sm px-4 py-3"/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <input id="inputPassword" type="password" placeholder="Password" name="password"
                                                       value={this.state.password} required onChange={this.handleChange}
                                                       className="form-control rounded-pill border-0 shadow-sm px-4 py-3 text-primary"/>
                                            </div>
                                            <button type="submit"
                                                    className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm px-4 py-2">Sign In
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login)