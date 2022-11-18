import React, {Component} from 'react';
import FrontendDataService from './DataService/FrontendDataService';
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock} from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from './DataService/AuthenticationService';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            token: '',
            role: '',
            message: '',
            hasLoginFailed: false,
            showSuccessMsg: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this);
        this.gotofile = this.gotofile.bind(this)
        this.clearData = this.clearData.bind(this);
    }

    componentDidMount() {

        this.setState({
            username: AuthenticationService.loggedUserName(),
            token: AuthenticationService.loggedUserToken(),
            role: AuthenticationService.loggedUserRole(),
        });
    }

    handleChange(event) {
        this.setState({
            message: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        const msg = this.state.message;

        if (msg.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Message cannot be empty',
                background: '#fff',
                confirmButtonColor: '#7a7a7a',
                iconColor: '#e0b004'
            })
        } else {

            const sendMsg = {
                "Id": "",
                "content": msg,
                "sender": this.state.username,
                "audienceType": "Private",
                "receivers": null
            }

            const config = {
                "Authorization": "Bearer " + this.state.token,
                "Content-Type": "application/json"
            }

            FrontendDataService.sendMessage(sendMsg, config)
                .then( res => {

                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Message sent successfully',
                            background: '#fff',
                            confirmButtonColor: '#3aa2e7',
                            iconColor: '#60e004'
                        })
                        this.clearData()

                    }
                    // else if (res.status === 401) {
                    //     // token expired
                    //     Swal.fire({
                    //         icon: 'warning',
                    //         title: 'Session Timeout',
                    //         background: '#fff',
                    //         confirmButtonColor: '#7a7a7a',
                    //         iconColor: '#e0b004'
                    //     })
                    // }

                })
                .catch(err => {
                    console.log(err.data)
                })
        }
    }

    logoutClicked() {
        AuthenticationService.logout();

        // redirect to log in
        this.props.history.push("/");
    }

    gotofile(e) {
        // redirect
        this.props.history.push("/upload");
    }

    clearData(e) {
        this.setState({
            message: '',
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row no-gutter">

                    <div className="col-md-6 d-none d-md-flex msg-bg-image"/>

                    <div className="col-md-6 bg-light">


                        <Button variant={"dark"} className={"py-2 px-3 mx-3 mt-3"} onClick={this.logoutClicked}><FontAwesomeIcon icon={faLock} /></Button>


                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-10 col-xl-7 mx-auto">
                                        <h3 className="display-4">Message</h3>
                                        <p className="text-muted mb-4">Please type your message here</p>
                                        <form className={"mt-5"} onSubmit={this.handleSubmit}>
                                            <div className="form-group mb-3">
                                                <textarea name="username" className="form-control border-0 shadow-sm px-4 py-3" placeholder={"Type your message here..."}
                                                          value={this.state.message} required onChange={this.handleChange}/>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <button type="submit"
                                                            className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm px-4 py-2">Send
                                                    </button>
                                                </div>
                                                {
                                                    this.state.role === "Manager" ?
                                                        <div className="col-4">
                                                            <button type="button" onClick={this.gotofile}
                                                                    className="btn btn-info btn-block text-uppercase mb-2 rounded-pill shadow-sm px-4 py-2">Upload
                                                            </button>
                                                        </div> : ''
                                                }

                                            </div>
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

export default withRouter(Message);