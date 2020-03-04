import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SearchNotFound from '../components/SearchNotFound';

var baseURL = require('./../../BaseURL').getURL();

class ActiveTool extends React.Component{

    constructor(props) {
        super(props)
        // this.state.data = props.data;
      }
    
      // initialize our state
      state = {
        data: [],
        // isLoading: true 
      };

    componentDidMount() {
        this.doSearchCall();
    }

    doSearchCall() {
        axios.get(baseURL+'/api/search?search=&type=tool')
        .then((res) => {
            this.setState({ data: res.data.data });
            // this.isLoading = false;
        });

    }

    render(){

        const {data, isLoading} = this.state;
 
        // if (isLoading) {
        //     return <p>Loading ...</p>;
        // }

        return(
        <Row className="mt-1">
            <Col>
            {data.length <= 0 ? <SearchNotFound />: data.map((dat) => {
                return (<div className="Rectangle mt-1">
                     <Row>
                        <Col sm={12} lg={6} className="pl-2 pt-2 Gray800-14px-bold"> {dat.name} </Col>
                        <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold"> Author </Col>
                        <Col sm={12} lg={4} className="pl-5 activeToolsButtons">
                            <Button variant="light" id="ArchiveButton" className="mr-2">
                                Archive
                            </Button>
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

export default ActiveTool;