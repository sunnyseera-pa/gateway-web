import React from 'react';
import axios from 'axios';
import Loading from './Loading'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NotFound from './NotFound';
import SVGIcon from "../../images/SVGIcon";

var baseURL = require('../../BaseURL').getURL();

class YourAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        newData: [],
        oldData: [],
        userState: [],
        isLoading: true
    };

    componentDidMount() {
        this.doMessagesCall();
    }

    doMessagesCall() {
        var apiToCall = '/api/messages/'+this.state.userState[0].id;
        if (this.state.userState[0].role === "Admin") {
            apiToCall = '/api/messagesadmin/'+this.state.userState[0].id;
        }

        axios.get(baseURL + apiToCall)
        .then((res) => {
            this.setState({
                newData: res.data.newData,
                isLoading: false
            });
        })
    }

    render() {
        const { newData, oldData, isLoading } = this.state;
        
        if (isLoading) {
            return <Loading />;
        }

        console.log(newData)

        return (
            <>  
                <Row className="mt-3">
                    <Col>
                        <span className="Black-16px ml-2">New notifications</span>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {newData.length <= 0 ? <NotFound word='notifications' /> : newData.map((dat) => {
                            if (!dat.tool[0]) {
                                return (<></>);
                            }

                            return (
                            <div className="Rectangle mt-1">
                                <Row>
                                    <Col xs={2} lg={1} className="iconHolder">
                                        {(() => {
                                            if (dat.tool[0].type==='tool') {
                                                return <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} />
                                            }
                                            else {
                                                return <SVGIcon name="projecticon" width={20} height={24} fill={'#3db28c'} />
                                            }
                                        })()}
                                    </Col>
                                    
                                    <Col xs={10} lg={11} className="pl-2 pt-2 Gray800-14px-bold">
                                        {(() => {
                                            if (dat.messageType==='add') {
                                                return <>The {dat.tool[0].type} <a href={'/'+dat.tool[0].type+'/'+dat.tool[0].id} >{dat.tool[0].name}</a> is now available for review.</>
                                            }
                                            else if (dat.messageType==='approved') {
                                                if (dat.messageTo===0) {
                                                    return <>The {dat.tool[0].type} <a href={'/'+dat.tool[0].type+'/'+dat.tool[0].id} >{dat.tool[0].name}</a> has been approved.</>
                                                }
                                                else {
                                                    return <>Your {dat.tool[0].type} <a href={'/'+dat.tool[0].type+'/'+dat.tool[0].id} >{dat.tool[0].name}</a> has been approved.</>
                                                }
                                            }
                                            else if (dat.messageType==='rejected') {
                                                if (dat.messageTo===0) {
                                                    return <>The {dat.tool[0].type} <a href={'/'+dat.tool[0].type+'/'+dat.tool[0].id} >{dat.tool[0].name}</a> has been rejected.</>
                                                }
                                                else {
                                                    return <>Your {dat.tool[0].type} <a href={'/'+dat.tool[0].type+'/'+dat.tool[0].id} >{dat.tool[0].name}</a> has been rejected.</>
                                                }
                                            }
                                        })()}  
                                    </Col> 
                                </Row>
                            </div>)
                        })}
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <span className="Black-16px ml-2">Notifications older than 7 days</span>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {oldData.length <= 0 ? <NotFound word='notifications' /> : oldData.map((dat) => {
                            return (
                            <div className="Rectangle mt-1">
                                <Row>
                                    <Col xs={2} lg={1} className="iconHolder">
                                        {(() => {
                                            if (dat.tool[0].type==='tool') {
                                                return <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} />
                                            }
                                            else {
                                                return <SVGIcon name="projecticon" width={20} height={24} fill={'#3db28c'} />
                                            }
                                        })()}
                                    </Col>
                                    
                                    <Col xs={10} lg={11} className="pl-2 pt-2 Gray800-14px-bold">
                                        {(() => {
                                            if (dat.messageType==='add') {
                                                return <>The {dat.tool[0].type} <a href={'/'+dat.tool[0].type+'/'+dat.tool[0].id} >{dat.tool[0].name}</a> is now available for review.</>
                                            }
                                            else {
                                                return <><a href={'/'+dat.tool[0].type+'/'+dat.tool[0].id} >{dat.tool[0].name}</a></>
                                            }
                                        })()}


                                        
                                    </Col> 
                                </Row>
                            </div>)
                        })}
                    </Col>
                </Row>
            </>
        );
    }
}

export default YourAccount;