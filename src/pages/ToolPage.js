
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

var baseURL = window.location.href;

if (!baseURL.includes('localhost')) {
    var rx = /^([http|https]+\:\/\/[a-z]+)(.*)/;
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
    data: [],
    id: '',
    type: '',
    name: '',
    description: '',
    rating: '',
    link: '',
    tags: [],
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
        data: res.data.data, 
        id: res.data.data[0].id, 
        type: res.data.data[0].type,
        name: res.data.data[0].name,
        description: res.data.data[0].description,
        rating: res.data.data[0].rating,
        link: res.data.data[0].link,
        tags: res.data.data[0].tags,
        isLoading: false 
      });
    })
  };

  render() {
    const {data, id, type, name, description, rating, link, tags, isLoading } = this.state;
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    
    return (
      <Container>
        <SearchBar />
        <ToolTitle id={id} type={type} name={name} description={description} rating={rating} link={link} tags={tags} />
        
        <Row className="mt-4">
          <Col sm={1} lg={1} />
          <Col sm={10} lg={10}>
            <span className="Black500-16px">Reviews</span>
            <span className="Gray500-13px">
              <span className="reviewTitleGap">·</span>
              150 reviews
              <span className="reviewTitleGap">·</span>
              4.2 average</span>
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
        <Project data={data} id={id} type={type} name={name} description={description} rating={rating} link={link} tags={tags}  />
        
      </Container>
    );
  }
}

export default ToolDetail;