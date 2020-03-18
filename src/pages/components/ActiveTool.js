import React, { useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NotFound from './NotFound';
import Modal from 'react-bootstrap/Modal'
import Loading from './Loading'

var baseURL = require('./../../BaseURL').getURL();

class ActiveTool extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        data: [],
        userState: [],
        isLoading: true
    };

    componentDidMount() {
        this.doSearchCall();
    }

    doSearchCall() {
        if (this.state.userState[0].role === "Admin") {
            axios.get(baseURL + '/api/accountsearchadmin?type=tool&toolState=active')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/accountsearch?type=tool&id=' + this.state.userState[0].id + '&toolState=active')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }

    }

    render() {
        const { data, isLoading } = this.state;





        if (isLoading) {
            return <Loading />;
        }

        return (
            <Row className="mt-1">
                <Col>
                    {data.length <= 0 ? <NotFound word="tools" /> : data.map((dat) => {
                            return (<div className="Rectangle mt-1">
                            <Row>
                                <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/tool/'+dat.id} >{dat.name}</a></Col>
                                <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                {dat.persons <= 0 ? 'Author not listed': dat.persons.map((person) => {
                                    return  <span>{person.firstname} {person.lastname} <br /></span>
                                })}
                                </Col>
                                
                                
                                <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                    <DeleteButton id={dat.id} />
                                    <Button variant='white' href={'/edittool/' + dat.id} className="AccountButtons" >
                                        Edit
                            </Button>
                                </Col>
                            </Row>
                        </div>)
                    })}






                </Col>
            </Row>
        );
    }


}

function DeleteButton(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteObject = () => {
        axios.delete(baseURL + '/api/accountdelete', {
            data: {
                id: props.id
            },
        })
            .then((res) => {
                window.location.href = '/account?tab=tools&toolDeleted=true';
            });
    }

    return (
        <>
            <Button variant="light" id="ArchiveButton" className="mr-2" onClick={handleShow}>
                Delete
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this tool?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This tool will be completely removed from the directory and cannot be retrieved.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No, nevermind</Button>
                    <Button variant="primary" onClick={deleteObject}>Yes, delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ActiveTool;