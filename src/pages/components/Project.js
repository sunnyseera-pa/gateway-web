import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon"
import axios from 'axios';

var baseURL = require('./../../BaseURL').getURL();

class Project extends React.Component {
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



    render() {
        const { data, isLoading } = this.state;

        if (typeof data.datasetids === 'undefined') {
            data.datasetids = [];
        }

        if (typeof data.toolids === 'undefined') {
            data.toolids = [];
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var updatedDate = new Date(data.updatedon);
        var updatedOnDate = monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear();

        return (
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
                                        <span className="Black-16px">{data.name.substr(0, 75) + (data.name.length > 75 ? '...' : '')}</span>
                                        <br />
                                        <span className="Gray800-14px">Suvasini Sharma, Manjari Tripathi</span>
                                    </p>
                                </Col>
                                <Col xs={{ span: 12, order: 2 }} lg={{ span: 3, order: 1 }} className="dateHolder mt-2">
                                    <span className="Gray700-13px pr-1">
                                        Updated
                                    </span>
                                    <span className="Gray700-13px pr-1">
                                        {updatedOnDate}
                                    </span>
                                </Col>

                                <Col xs={{ span: 2, order: 0 }} lg={{ span: 1, order: 2 }}></Col>
                                <Col xs={{ span: 10, order: 0 }} lg={{ span: 11, order: 2 }} >
                                    <p className="Gray800-14px">
                                        {!data.toolids.length ? '' :
                                            <span className="mr-1">
                                                <b>
                                                    {!data.toolids.length ? '' : data.toolids.length}
                                                    {data.toolids.length === 1 ? " tool" : " tools"}
                                                </b>
                                            </span>
                                        }

                                        {!data.datasetids.length ? '' :
                                            <span className="mr-1">
                                                {data.toolids.length ? ', ' : ''}
                                                <b>
                                                    {!data.datasetids.length ? '' : data.datasetids.length}
                                                    {data.datasetids.length === 1 ? " data set" : " data sets"}
                                                </b>
                                            </span>
                                        }

                                        {data.toolids.length || data.datasetids.length ?
                                            <span className="reviewTitleGap">·</span>
                                            : ''
                                        }

                                        {data.description.substr(0, 150) + (data.description.length > 150 ? '...' : '')}
                                    </p>
                                </Col>

                                <Col xs={{ span: 12, order: 1 }} lg={{ span: 12, order: 3 }}>
                                    {!data.categories.category ? '' : <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2">{data.categories.category}</div>}

                                    {!data.tags.features || data.tags.features.length <= 0 ? '' : data.tags.features.map((feature) => {
                                        return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2">{feature}</div>
                                    })}

                                    {!data.tags.topics || data.tags.topics.length <= 0 ? '' : data.tags.topics.map((topic) => {
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
