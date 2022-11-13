import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import AuthenticationService from './DataService/AuthenticationService';
import FileUpload from './FileUpload';
import Message from './Message';
import { Button, Tab, Tabs, Container, Row, Col} from 'react-bootstrap';

class Home extends Component {

    constructor(props) {
        super(props);      
        
        this.state = {
            role: ''
        }

        this.logoutClicked = this.logoutClicked.bind(this);
    }

    componentDidMount() {

        const loggedUserRole = AuthenticationService.loggedUserRole();
        this.setState({
            role: loggedUserRole
        });
    }

    logoutClicked() {
        AuthenticationService.logout();

        // redirect to login
        this.props.history.push("/");
    }

    render() {
        return (
            <Container fluid className='mt-5 pt-5' >
                <Row className="justify-content-md-center mt-3 pt-3">
                    <Col md={6} style={{ border: '2px solid #eeeeee', borderRadius: '10px' }}>
                        <div className='m-3'>
                            <Tabs
                                variant='pills'
                                defaultActiveKey="msg"
                                id="uncontrolled-tab-example"
                                className="mb-3 pt-3 px-3"
                                fill
                                justify
                                >
                                <Tab eventKey="msg" title="Messages">
                                    <Message />
                                </Tab>

                                {
                                    this.state.role === 'manager' || this.state.role === 'admin' ?

                                    <Tab eventKey="file" title="Files">
                                        <FileUpload />
                                    </Tab>
                                    : ''
                                }
                            </Tabs>
                            <Button variant="dark" className={"py-2 px-4 mx-3 mt-3"} onClick={this.logoutClicked}>Logout</Button>
                        </div>

                    </Col>     
                </Row>
            </Container>
        );
    }
}

export default withRouter(Home)