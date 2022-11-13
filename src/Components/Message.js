import React, {Component} from 'react';
import FrontendDataService from './DataService/FrontendDataService';
import Swal from "sweetalert2";

import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from './DataService/AuthenticationService';

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',           
            hasLoginFailed: false,
            showSuccessMsg: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearData = this.clearData.bind();
    }

    componentDidMount() {

        const loggedUser = AuthenticationService.loggedUserName();
        this.setState({
            username: loggedUser
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
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
            })
        } else {
            console.log(this.state.message)

            const formData = new FormData();
            formData.append('content', this.state.message)
            formData.append('sender', this.state.username)
            formData.append('audiencetype', "private")

            const config = {
                headers: {
                    "Authorization": "Bearer xxxx-xxxx-xxxx" //include token
                }
            }

            // FrontendDataService.sendMessage(formData, config)
            //     .then( res => {
            //         // if success

            //         Swal.fire({
            //             icon: 'success',
            //             title: 'Message sent successfully',
            //             background: '#fff',
            //             confirmButtonColor: '#3aa2e7',
            //             iconColor: '#60e004'
            //         })
            //        this.clearData()
            //     })            
            //     .catch(err => {
            //         console.log(err.data)
            //     })
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