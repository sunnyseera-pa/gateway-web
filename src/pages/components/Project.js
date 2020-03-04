import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon"
import axios from 'axios';

var baseURL = require('./../../BaseURL').getURL();

class Project extends React.Component{
    // initialize our state
    state = {
        data: [],
        isLoading: true
    };

    constructor(props) {
        super(props)
        if (props.data) {
            this.state.data = props.data;
            this.state.isLoading = false;
        }
        else if (props.id) {
            this.state.id = props.id;
            this.getDataSearchFromDb()
        }
    }

    getDataSearchFromDb = () => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/project/' + this.state.id)
        .then((res) => {
            this.setState({
                data: res.data.data[0],
                isLoading: false
            });
        })
    };

    

    render(){
        const { data, isLoading } = this.state;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var updatedDate = new Date(data.updatedon);
        var updatedOnDate = monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear();
        
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return(
            <Row className="mt-2">
                <Col>
                    <a style={{ cursor: 'pointer' }} href={'/project/' + data.id} >
                        <div className="Rectangle">
                            <Row>
                                <Col xs={2} lg={1} className="iconHolder">
                                    <SVGIcon name="projecticon" width={20} height={24} fill={'#3db28c'} />
                                </Col>
                                <Col xs={10} lg={8}>
                                    <p>
                                        <span className="Black-16px">{data.name}</span>
                                        <br />
                                        <span className="Gray800-14px">Suvasini Sharma, Manjari Tripathi</span>
                                    </p>
                                    <p className="Gray800-14px">
                                        1 dataset 
                                        <span className="Purple-14px ml-2">
                                            NIHR HIC Locality : Critical Care
                                        </span>
                                    </p>

                                    <p className="Gray800-14px">
                                    <span> 4 tools</span>
                                    {/* <span className="mr-1">
                                            {data.toolids.length}
                                        </span>
                                        <span>
                                            {data.toolids.length > 1 ? "tools" : "tool"}
                                        </span> */}

                                        <span className="Purple-14px ml-2">
                                            Tableau, Alpha data parser, Panda R library, Sareen
                                        </span>

                                        {/* DISPLAYS TOOL IDS ATTACHED TO PROJECT */}
                                        {/* <span className="Purple-14px ml-2">
                                            { data.toolids.length <= 0 ? 'NO SEARCH RESULT' :  data.toolids.map((toolid) => {
                                                if(!!toolid){
                                                    return <span className="Purple-14px ml-1"> {toolid} </span>
                                                }
                                            })}
                                        </span> */}


                                        {/* <span className="Purple-14px ml-2">
                                            { data.toolids.length <= 0 ? 'NO SEARCH RESULT' :  data.toolids.map((toolid) => {
                                                if(!!toolid){
                                                    return <span className="Purple-14px ml-1"> {data.name} </span>
                                                }
                                            })}
                                        </span> */}
                                    </p>
                                </Col>
                                <Col xs={{span:12,order:1}} lg={{span:3,order:0}} className="dateHolder mt-2">
                                    <span className="Gray700-13px pr-1">
                                        Updated
                                    </span>
                                    <span className="Gray700-13px pr-1"> 
                                        {updatedOnDate}
                                    </span>
                                </Col>
                            
                                <Col xs={{span:12,order:0}} lg={{span:12,order:1}}>

                                    {!data.tags.features || data.tags.features.length <= 0 ? '' :  data.tags.features.map((feature) => {
                                        return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2">{feature}</div>
                                    })} 

                                    {!data.tags.topics || data.tags.topics.length <= 0 ? '' :  data.tags.topics.map((topic) => {
                                        return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2">{topic}</div>
                                    })} 
                                </Col>
                            </Row>
                        </div>
                    </a>
                </Col>
            </Row>
        );
    }   
}

export default Project;
