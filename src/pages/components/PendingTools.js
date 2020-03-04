import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SearchNotFound from '../components/SearchNotFound';

var baseURL = require('./../../BaseURL').getURL();

class PendingTools extends React.Component{
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

        return(
        <Row className="mt-2">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
            {data.length <= 0 ? <SearchNotFound />: data.map((dat) => {
                return(<div className="Rectangle">
                     <Row>
                        <Col xs={4} lg={4} className="ml-2 mt-2 Gray800-14px-bold"> {dat.name} </Col>
                        <Col xs={3} lg={3} className="ml-2 mt-2 Gray800-14px-bold"> ToolAuthor </Col>
                        <Col xs={4} lg={4} className="ml-5">
                            <Button variant='white' href={'/edittool/' + dat.id} className="AccountButtons mr-2">
                                Edit
                            </Button>
                            <Button variant='white' className="AccountButtons mr-2">
                                Reject
                            </Button>
                            <Button variant='white' className="AccountButtons ">
                                Approve
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

export default PendingTools;