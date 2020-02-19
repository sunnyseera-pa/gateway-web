import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon"

class Project extends React.Component{
    constructor(props) {
        super(props)
        this.state.data = props.data;
        this.state.id = props.id;
        this.state.type = props.type;
        this.state.name = props.name;
        this.state.description = props.description;
        this.state.rating = props.rating;
        this.state.link = props.link;
        this.state.tags = props.tags;
    }

    // initialize our state
    state = {
        data: [],
        id: '',
        type: '',
        name: '',
        description: '',
        rating: '',
        link: '',
        tags: []
      };

    render(){
        const { data, id, type, name, description, rating, link, tags } = this.state;
        return(
            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <a style={{ cursor: 'pointer' }} href={'/project/' + data.id} >
                        <div className="Rectangle">
                            <Row>
                                <Col xs={2} md={1} className="iconHolder">
                                    <SVGIcon name="projecticon" width={20} height={24} fill={'#3db28c'} />
                                </Col>
                                <Col xs={10} md={9}>
                                    <p>
                                        <span className="Black-16px">{name}</span>
                                        <br />
                                        <span className="Gray800-14px">Suvasini Sharma, Manjari Tripathi</span>
                                    </p>
                                    <p className="Gray800-14px">
                                        4 tools used 
                                        <span className="Purple-13px ml-2">
                                            Tableau, Alpha data parser, Panda R library, Sareen
                                        </span>
                                    </p>
                                </Col>
                                <Col xs={{span:12,order:1}} md={{span:2,order:0}} className="dateHolder mt-2">
                                    <span className="Gray700-13px">
                                        Updated Aug 2018
                                    </span>
                                </Col>
                            
                                <Col xs={{span:12,order:0}} md={{span:12,order:1}}>
                                    {tags.length <= 0 ? 'NO SEARCH RESULT' : tags.map((tag) => {
                                        return <div className="mr-2 Gray800-14px tagBadges mb-2">{tag}</div>
                                    })}
                                </Col>
                            </Row>
                        </div>
                    </a>
                </Col>
                <Col sm={1} lg={10}/>
            </Row>
        );
    }   
}

export default Project;
