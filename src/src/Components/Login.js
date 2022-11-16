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

    loginClicked(event) {
        event.preventDefault();

        if (this.state.username === '' || this.state.password === '' || this.state.role === '') {
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
                        AuthenticationService.successfulLogin(res.data.username, res.data.role, res.data)

                        Swal.fire({
                            icon: 'success',
                            title: 'Login successfully',
                            background: '#fff',
                            confirmButtonColor: '#7a7a7a',
                            iconColor: '#479600'
                        })

                        this.props.history.push("/home");
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