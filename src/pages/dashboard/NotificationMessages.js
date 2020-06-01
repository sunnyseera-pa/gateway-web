import React from 'react';
import axios from 'axios';
import Loading from '../commonComponents/Loading'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NotFound from '../commonComponents/NotFound';
import SVGIcon from "../../images/SVGIcon";
import Dropdown from 'react-bootstrap/Dropdown';
import { ReactComponent as RadioSVG } from '../../images/radio.svg';


var baseURL = require('../commonComponents/BaseURL').getURL();

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
        isLoading: true,
        isRead: false
    };

    componentDidMount() {
        this.doMessagesCall();
    }

    doMessagesCall() {
        var apiToCall = '/api/v1/messages/' + this.state.userState[0].id;
        if (this.state.userState[0].role === "Admin") {
            apiToCall = '/api/v1/messages/admin/' + this.state.userState[0].id;
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

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return (
            <>

                <Row>
                    <Col>
                        {newData.length <= 0 ? <NotFound word='No notficiations yet' /> : newData.slice(0, 48).map((dat) => {
                            if (!dat.tool[0]) {
                                return (<></>);
                            }

                            return (
                                <div >
                                    {/* <div className="Rectangle mt-1"> */}
                                    {/* <Dropdown.Item href={'/' + dat.tool[0].type + '/' + dat.tool[0].id} style={{ display: "inline-block", wordBreak: "break-word", maxWidth: "180px" }}> */}
                                    <Dropdown.Item href={'/' + dat.tool[0].type + '/' + dat.tool[0].id} style={{ width: "372px", paddingLeft: "0px", paddingRight: "0px", paddingTop: "0px", paddingBottom: "0px" }}>
                                        <Col style={{ width: "360px" }}>
                                            {(() => {
                                                let messageDate = new Date(dat.messageSent);
                                                let messageDateString = messageDate.getDate() + " " + monthNames[messageDate.getMonth()] + " " + messageDate.getFullYear() + " " + messageDate.getHours() + ":" + messageDate.getMinutes();

                                                if (dat.messageType === 'add') {
                                                    return <><Row ><Col className="NotificationDate">{messageDateString + '\n'} </Col>
                                                        <Col >{!this.state.isRead ? <SVGIcon name="newnotificationicon" width={20} height={20} visble='true' style={{ float: "right", fill: "#2c8267", paddingRight: "0px" }} fill={"#2c8267"} stroke='none' /> : null}
                                                        </Col> </Row>
                                                        <Row width="100px"><Col width="100px" >
                                                            <a href={'/' + dat.tool[0].type + '/' + dat.tool[0].id}
                                                                style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", width: "310px" }}
                                                                class="NotificationInfo"> The {dat.tool[0].type} {dat.tool[0].name} is now available for review.</a>
                                                        </Col ></Row></>
                                                }
                                                else if (dat.messageType === 'approved') {
                                                    if (dat.messageTo === 0) {
                                                        return <><Row><Col className="NotificationDate">{messageDateString + '\n'}</Col>
                                                            <Col >{!this.state.isRead ? <SVGIcon name="newnotificationicon" width={20} height={20} visble='true' style={{ float: "right", fill: "#2c8267", paddingRight: "0px" }} fill={"#2c8267"} stroke='none' /> : null}
                                                            </Col></Row>
                                                            <Row ><Col><a href={'/' + dat.tool[0].type + '/' + dat.tool[0].id} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", width: "310px" }} class="NotificationInfo">The {dat.tool[0].type} {dat.tool[0].name} has been approved.</a>
                                                            </Col></Row></>
                                                    }
                                                    else {
                                                        return <><Row><Col className="NotificationDate">{messageDateString + '\n'}</Col>
                                                            <Col >{!this.state.isRead ? <SVGIcon name="newnotificationicon" width={20} height={20} visble='true' style={{ float: "right", fill: "#2c8267", paddingRight: "0px" }} fill={"#2c8267"} stroke='none' /> : null}
                                                            </Col></Row>
                                                            <Row ><Col><a href={'/' + dat.tool[0].type + '/' + dat.tool[0].id} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", width: "310px" }} class="NotificationInfo">Your {dat.tool[0].type} {dat.tool[0].name} has been approved.</a>
                                                            </Col><Col></Col></Row></>
                                                    }
                                                }
                                                else if (dat.messageType === 'rejected') {
                                                    if (dat.messageTo === 0) {
                                                        return <><Row><Col className="NotificationDate">{messageDateString + '\n'}</Col>
                                                            <Col >{!this.state.isRead ? <SVGIcon name="newnotificationicon" width={20} height={20} visble='true' style={{ float: "right", fill: "#2c8267", paddingRight: "0px" }} fill={"#2c8267"} stroke='none' /> : null}
                                                            </Col></Row>
                                                            <Row ><Col><a href={'/' + dat.tool[0].type + '/' + dat.tool[0].id} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", width: "310px" }} class="NotificationInfo">The {dat.tool[0].type} {dat.tool[0].name} has been rejected.</a>
                                                            </Col><Col></Col></Row></>
                                                    }
                                                    else {
                                                        return <><Row><Col className="NotificationDate">{messageDateString + '\n'}</Col>
                                                            <Col >{!this.state.isRead ? <SVGIcon name="newnotificationicon" width={20} height={20} visble='true' style={{ float: "right", fill: "#2c8267", paddingRight: "0px" }} fill={"#2c8267"} stroke='none' /> : null}
                                                            </Col></Row>
                                                            <Row ><Col><a href={'/' + dat.tool[0].type + '/' + dat.tool[0].id} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", width: "310px" }} class="NotificationInfo">Your {dat.tool[0].type} {dat.tool[0].name} has been rejected.</a>
                                                            </Col><Col></Col></Row></>
                                                    }
                                                }
                                            })()}
                                        </Col>
                                    </Dropdown.Item>
                                </div>)
                        })}
                    </Col>
                </Row>
            </>
        );
    }
}

export default YourAccount;