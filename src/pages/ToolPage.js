
// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
import Reviews from './components/Reviews';
import Project from './components/Project';
import ToolTitle from './components/ToolTitle';
import SearchBar from './components/SearchBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Rating from 'react-rating';
import { ReactComponent as EmptyStarIconSvg} from '../images/starempty.svg';
import { ReactComponent as FullStarIconSvg} from '../images/star.svg';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import DataSet from '../pages/components/DataSet';
import PersonTitle from '../pages/components/PersonTitle';
import ToolsUsed from './components/ToolsUsed';


var baseURL = window.location.href;

if (!baseURL.includes('localhost')) {
    var rx = /^([http|https]+\:\/\/[a-z]+)([^/]*)/;
    var arr = rx.exec(baseURL);
    if (arr.length > 0) {
        //add -api to the sub domain for API requests
        baseURL = arr[1]+'-api'+arr[2]
    }

} else {
    baseURL = 'http://localhost:3001'
}

class ToolDetail extends Component {

  // initialize our state
  state = {
    id: '',
    data: [],
    key:'Reviews',
    activeKey: false,
    selectedItem: 'tab-1',
    isLoading: true
  };

  constructor(props) {
    super(props);
  }

  // on loading of tool detail page
  componentDidMount() {
    this.getDataSearchFromDb();
  }


  // on loading of tool detail page were id is different
  componentDidUpdate() {
    if (this.props.match.params.toolID != this.state.id && this.state.id != '' && !this.state.isLoading) {
      this.getDataSearchFromDb();
    }
  }

  getDataSearchFromDb = () => {
    //need to handle error if no id is found
    this.setState({ isLoading: true });
    axios.get(baseURL+'/api/tool/'+this.props.match.params.toolID)
    .then((res) => {
      this.setState({ 
        data: res.data.data[0],
        isLoading: false 
      });
    })
  };

  render() {
    const {data, isLoading } = this.state;
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    
    return (
      <div>
        <SearchBar />
        <Container className="mb-5">
          <ToolTitle data={data} />
          <PersonTitle data={data} />

            {/* <Row className="mt-3">

              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <div>
                  
                  <Tabs selectedItem={this.state.selectedItem} onChange={selectedItem => this.setState({ selectedItem })}
                  activeKey={this.state.key}
                  onSelect={key => this.setState({ key })}>
                    <TabList className="TabsBackground Gray700-13px">
                    <Tab item='tab-1' id="TabDesign">
                      Reviews
                    </Tab>
                    <Tab item='tab-2'>
                      Research Projects
                    </Tab>
                    </TabList>
                    <TabPanel item='tab-1'>
                      <Reviews />
                    </TabPanel>
                    <TabPanel item='tab-2'>
                      <Project data={data} />
                    </TabPanel>
                  </Tabs>
                </div>
              </Col>
              <Col sm={1} lg={1} />
            </Row> */}

            
            <Row  className="mt-3">

            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <div>
                <Tabs className='TabsBackground Gray700-13px'>
                  <Tab eventKey="Reviews" title="Reviews (54)">
                    <Reviews />
                  </Tab>
                  <Tab eventKey="Data sets" title="Data sets (1)">
                      <DataSet />
                  </Tab>
                  <Tab eventKey="Projects" title="Projects (2)">
                    <Project data={data} />
                  </Tab>
                </Tabs>
              </div>
            </Col>
            <Col sm={1} lg={1} />
            </Row>
                         
          

          {/* <Row className="mt-4">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <span className="Black500-16px">Reviews</span>
              <span className="Gray500-13px">
                <span className="reviewTitleGap">·</span>
                150 reviews
                <span className="reviewTitleGap">·</span>
                4.2 average
              </span>
              <span className="reviewStarsGap"></span>
              <Rating emptySymbol={<EmptyStarIconSvg />} fullSymbol={<FullStarIconSvg />} placeholderSymbol={<FullStarIconSvg />} placeholderRating={4.3} />
            </Col>
            <Col sm={1} lg={10} />
          </Row>
          <Reviews />
          
          <Row className="mt-4">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <span className="Black500-16px">Research projects using it (5)</span>
            </Col>
            <Col sm={1} lg={10} />
          </Row>
          <Project data={data}  /> */}
          
        </Container>
      </div>
    );
  }
}

export default ToolDetail;