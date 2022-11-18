import React, {Component} from 'react';
import FrontendDataService from './DataService/FrontendDataService';
import Swal from "sweetalert2";

import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from './DataService/AuthenticationService';

export default class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            file: undefined,
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
                // .then( res => {
                //     console.log(res)
            // Swal.fire({
            //     icon: 'success',
            //     title: 'File sent successfully',
            //     background: '#fff',
            //     confirmButtonColor: '#3aa2e7',
            //     iconColor: '#60e004'
            // })
            // this.clearData()
            //     })
            //     .catch(err => {
            //         console.log(err.data)
            //     })
        }
    }

    clearData() {
        this.setState({
            file: undefined,
        })
    }

    render() {
        return (
            <Card border='light'>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>

                        <Card.Title>Send a file</Card.Title>
                        <Card.Text className={"text-muted"}>Please upload your file here</Card.Text>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" required onChange={this.handleChange} />
                        </Form.Group>

                        <Button type="submit" variant="outline-success" className={"py-2 px-4"}>
                            Send &nbsp; <FontAwesomeIcon icon={faPaperPlane} />
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
        );
    }
}