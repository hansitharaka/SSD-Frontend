import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {Form, Button, Card, Container, Row, Col} from 'react-bootstrap';
import AuthenticationService from './DataService/AuthenticationService';
import FrontendDataService from './DataService/FrontendDataService';
import Swal from "sweetalert2";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: '',
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

    loginClicked() {
        if (this.state.username === '' || this.state.password === '' || this.state.role === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Fileds cannot be empty',
                background: '#fff',
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
            })
        } else {
            const formData = new FormData();
            formData.append('username', this.state.username)
            formData.append('password', this.state.password)

            this.props.history.push("/home");
            AuthenticationService.successfulLogin(this.state.username, this.state.role)
        //     FrontendDataService.authenticateUser(formData)
        //         .then(
        //             response => {
        //                 if (response.data != null) {
        //                     if (true) {
                                // AuthenticationService.successfulLogin(response.data.username, response.data.role)
                                
        // this.props.history.push("/message")
        //                     } else {
        //                         Swal.fire({
        //                             icon: 'error',
        //                             title: 'Wrong username or password',
        //                             background: '#041c3d',
        //                             iconColor: '#e00404',
        //                             confirmButtonColor: '#3aa2e7'
        //                         })
        //                     }
        //                 } else {
        //                     Swal.fire({
        //                         icon: 'error',
        //                         title: 'Wrong username or password',
        //                         background: '#041c3d',
        //                         iconColor: '#e00404',
        //                         confirmButtonColor: '#3aa2e7'
        //                     })
        //                 }
        //             }
        //         )
        }

    }

    render() {
        return (
            <Container fluid className='mt-5 pt-5'>
                <Row className="justify-content-md-center mt-5 pt-5">
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Card style={{ border: '2px solid #eeeeee', borderRadius: '10px' }}>
                            <Card.Body>
                                <Form onSubmit={this.loginClicked}>
                                    <div className={"mb-3"}>
                                        <label htmlFor="username" className="grey-text pb-2">
                                            Username
                                        </label>
                                        <input type="text" name="username" className="form-control" placeholder={"ex: John Mayer"}
                                            value={this.state.username} required onChange={this.handleChange}/>
                                    </div>

                                    <div className={"mb-3"}>
                                        <label htmlFor="password" className="grey-text ">
                                            Password
                                        </label>
                                        <input type="password" name="password" className="form-control" placeholder="Password"
                                            value={this.state.password} required onChange={this.handleChange}/>
                                    </div>

                                    <div className={"mb-3 text-center"}>
                                        <Row>
                                            <Col xs={4}>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="role" defaultChecked={this.state.role === "worker"} value="worker" onChange={this.handleChange} /> Worker
                                                    </label>
                                                </div>
                                            </Col>
                                            <Col xs={4}>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="role" defaultChecked={this.state.role === "manager"} value="manager" onChange={this.handleChange} /> Manager
                                                    </label>
                                                </div>
                                            </Col>
                                            <Col xs={4}>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="role" defaultChecked={this.state.role === "admin"} value="admin" onChange={this.handleChange} /> Admin
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                    </div>

                                    <div className={"mb-3 mt-4"}>
                                        <Button type="submit" variant="primary" className={"py-2 px-4"}>Login</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}></Col>
                </Row>


            </Container>
        );
    }
}

export default withRouter(Login)