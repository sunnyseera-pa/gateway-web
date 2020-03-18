import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NotFound from './NotFound';
import Loading from './Loading'

var baseURL = require('./../../BaseURL').getURL();

class PendingProjects extends React.Component {
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
            axios.get(baseURL + '/api/accountsearchadmin?type=project&toolState=review')
                .then((res) => {
                    console.log(res.data.data)
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/accountsearch?type=project&id=' + this.state.userState[0].id + '&toolState=review')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
    }

    rejectTool = (id) => {
        axios.delete(baseURL + '/api/accountdelete', {
            data: {
                id: id
            },
        })
            .then((res) => {
                window.location.href = '/account?tab=projects&projectRejected=true';
            });
    }

    approveTool = (id) => {
        axios.post(baseURL + '/api/accountstatusupdate', {
            id: id,
            activeflag: "active"
        })
            .then((res) => {
                window.location.href = '/account?tab=projects&projectApproved=true';
            });
    }


    render() {
        const { data, isLoading, userState } = this.state;
        
        if (isLoading) {
            return <Loading />;
        }
        return (
            <Row>
                <Col>
                    {data.length <= 0 ? <NotFound word='projects' /> : data.map((dat) => {
                        return (<a /* href={'/tool/'+dat.id} */>
                        <div className="Rectangle mt-1">
                            <Row>
                                <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/tool/'+dat.id} >{dat.name}</a></Col>
                                <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold"> 
                                {dat.persons <= 0 ? 'Author not listed': dat.persons.map((person) => {
                                    return  <span>{person.firstname} {person.lastname} <br /></span>
                                })}
                                </Col>
                                <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                    {userState[0].role === 'Admin' ?
                                        <div>
                                            <Button variant='white' href={'/editproject/' + dat.id} className="AccountButtons mr-2">
                                                Edit
                            </Button>
                                            <Button variant='white' onClick={() => this.rejectTool(dat.id)} className="AccountButtons mr-2">
                                                Reject
                            </Button>
                                            <Button variant='white' onClick={() => this.approveTool(dat.id)} className="AccountButtons ">
                                                Approve
                            </Button>
                                        </div> : ""}
                                </Col>
                            </Row>
                        </div>
                        </a>)
                    })}
                </Col>
            </Row>
        );
    }
}

export default PendingProjects;