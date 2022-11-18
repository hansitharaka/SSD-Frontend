import React, {Component} from 'react';
import FrontendDataService from './DataService/FrontendDataService';
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock} from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from './DataService/AuthenticationService';

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            token: '',
            role: '',
            file: undefined,
            hasLoginFailed: false,
            showSuccessMsg: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.gotoMsg = this.gotoMsg.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this);
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
            file: event.target.files
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        const uploadFile = this.state.file[0];

        if (uploadFile === undefined) {
            Swal.fire({
                icon: 'warning',
                title: 'File cannot be empty',
                background: '#fff',
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
            })
        } else {
            console.log(this.state.file[0])

            const formData = new FormData();
            formData.append('file', uploadFile)

            const config = {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + this.state.token
            }

            FrontendDataService.uploadFile(formData, config)
                .then( res => {
                    if (res.status === 200 && res.data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'File sent successfully',
                            background: '#fff',
                            confirmButtonColor: '#3aa2e7',
                            iconColor: '#60e004'
                        })

                        this.clearData();
                    }
                })
                .catch(err => {
                    console.log(err.data)
                })
        }
    }

    clearData(e) {
        this.setState({
            file: undefined,
        })
    }

    logoutClicked() {
        AuthenticationService.logout();

        // redirect to log in
        this.props.history.push("/");
    }

    gotoMsg(e) {
        // redirect
        this.props.history.push("/message");
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
                                        <h3 className="display-4">File Upload</h3>
                                        <p className="text-muted mb-4">Please upload your file here</p>

                                        <form className={"mt-5"} onSubmit={this.handleSubmit}>
                                            <div className="form-group mb-3">
                                                <Form.Group controlId="formFile" className="form-control border-0 shadow-sm px-4 py-3" >
                                                    <Form.Control type="file" required onChange={this.handleChange} />
                                                </Form.Group>
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
                                                            <button type="button" onClick={this.gotoMsg}
                                                                    className="btn btn-info btn-block text-uppercase mb-2 rounded-pill shadow-sm px-4 py-2">Message
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

export default withRouter(FileUpload);