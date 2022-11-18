import React, {Component} from 'react';
import FrontendDataService from './DataService/FrontendDataService';
import { withRouter} from 'react-router-dom';
import Swal from "sweetalert2";

import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from './DataService/AuthenticationService';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            token: '',
            message: '',
            hasLoginFailed: false,
            showSuccessMsg: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearData = this.clearData.bind();
    }

    componentDidMount() {

        this.setState({
            username: AuthenticationService.loggedUserName(),
            token: AuthenticationService.loggedUserToken(),
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

                    if (res.status === 200 && res.data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Message sent successfully',
                            background: '#fff',
                            confirmButtonColor: '#3aa2e7',
                            iconColor: '#60e004'
                        })
                        this.clearData()

                    } else if (res.status === 401) {
                        // token expired
                        Swal.fire({
                            icon: 'warning',
                            title: 'Session Timeout',
                            background: '#fff',
                            confirmButtonColor: '#7a7a7a',
                            iconColor: '#e0b004'
                        })
                    }

                })
                .catch(err => {
                    console.log(err.data)
                })
        }
    }

    clearData() {
        this.setState({
            message: '',
        })
    }

    render() {
        return (
            <Card border='light'>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>

                        <Card.Title>Send a message</Card.Title>
                        <Card.Text className='pt-2'>
                        <textarea name="username" className="form-control" placeholder={"Type your message here..."}
                                  value={this.state.message} required onChange={this.handleChange}/>
                        </Card.Text>
                        <Button type="submit" variant="outline-success" className={"py-2 px-4"} >
                            Send &nbsp; <FontAwesomeIcon icon={faPaperPlane} />
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(Message);