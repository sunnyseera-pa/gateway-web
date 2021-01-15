import React, { Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Loading from '../commonComponents/Loading';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import Iframe from 'react-iframe';
import './AboutPage.scss';

class AboutPage extends React.Component {

    doSearch = e => {
        //fires on enter on searchbar
        if (e.key === 'Enter') window.location.href = '/search?search=' + this.state.searchString;
    };

    updateSearchString = searchString => {
        this.setState({ searchString: searchString });
    };

    toggleDrawer = () => {
        this.setState(prevState => {
            if (prevState.showDrawer === true) {
                this.searchBar.current.getNumberOfUnreadMessages();
            }
            return { showDrawer: !prevState.showDrawer };
        });
    };

    state = {
        userState: [],
        footer: ''
        ,
        isLoading: true
    };

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
    }

    // async componentDidMount() {
    //     const { t } = this.props;
    //  axios
    //      .get(t('aboutPageUrl') , { withCredentials: false })
    //      .then(res => {
    //          this.setState({
    //              footer: res.data,
    //              isLoading: false,
    //          });
    //      })
    //      .catch(error => {
    //          this.setState({
    //              isLoading: false,
    //          });
    //      });
    // }

    render() {
        const {
            userState,
            isLoading,
            footer
        } = this.state;

        // if (isLoading) {
        //  return (
        //      <Row className='mt-4'>
        //          <Col xs={1}></Col>
        //          <Col xs={10}>
        //              <Loading data-testid='isLoading' />
        //          </Col>
        //          <Col xs={1}></Col>
        //      </Row>
        //  );
        // }


        return (
            <div class='resource-card-row row' >
                    <Col>
                            <div className='collection-rectangle'>      
                            <Row className='noMargin'>
                                <div className='pad-left-24 pad-right-24 pad-top-24 pad-bottom-16 col-lg-12 col-sm-12' dangerouslySetInnerHTML={{ __html: footer }} />
                                    <Iframe url="https://icoda-research.org/icoda-gateway/"
                                    width="100%"
                                    height="900px"
                                    id="aboutIframe"
                                    frameBorder="0"
                                    display="initial"
                                    position="relative"
                                    />
                                <div />
                            </Row>
                            </div>
                    </Col>
                    {/* <Col sm={1} lg={10} /> */}
            </div>
            
            
        );
    }
}

export default AboutPage;



