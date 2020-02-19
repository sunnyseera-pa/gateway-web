import React from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Project from './components/Project';
import Tool from './components/Tool';
import Person from './components/Person';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
// import ToolTitle from './components/ToolTitle';
import FilterButtons from './components/FilterButtons';

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

class SearchPage extends React.Component{

    state = {
        searchString: null,
        typeString: null,
        data: [],
        isLoading: true
    }

    constructor(props) {
        super(props);
      }

    componentDidMount() { //fires on first time in or page is refreshed/url loaded
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            this.doSearchCall(values.search);
            this.setState({ searchString: values.search});
        }
        else {
            this.doSearchCall("");
        }
    }

    componentWillReceiveProps() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            if (values.search != this.state.searchString) {
                this.doSearchCall(values.search);
                this.setState({ searchString: values.search});
            }
        }
        else {
            this.setState({ data: [], searchString: '',   id: '', type: '', name: '', description: '', rating: '', link: '', tags: [], isLoading: true});
            this.doSearchCall("");
        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString && !!this.state.typeString) {
                this.props.history.push(window.location.pathname+'?search='+this.state.searchString + '&type='+ this.state.typeString)
                this.doSearchCall(this.state.searchString, this.state.typeString);
            }
            else if(!!this.state.searchString && !this.state.typeString){
                this.props.history.push(window.location.pathname+'?search='+this.state.searchString + '&type=')
                this.doSearchCall(this.state.searchString, "");
            }
        }
    }
    
    callTypeString = (typeString) =>{ 
        this.props.history.push(window.location.pathname+'?search='+this.state.searchString + '&type='+ typeString)
        this.doSearchCall(this.state.searchString, typeString);
    }

    doSearchCall(searchString, typeString) {
        axios.get(baseURL+'/api/search?search='+searchString + '&type='+ typeString)

        .then((res) => {
            this.setState({ data: res.data.data });
        });
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString});
    }

    updateTypeString = (typeString) =>{
        this.setState({ typeString: typeString});
    }


    render(){
        const { searchString, typeString, data} = this.state;

        return(
            <Container className="BackgroundColour">
                <Row className="WhiteBackground">
                    <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} />
                </Row>

                <Row className="mt-3"></Row>

                <Row>
                    <Col sm={4}>
                        <FilterButtons doUpdateTypeString={this.updateTypeString} doCallTypeString={this.callTypeString} />
                    </Col>

                    <Col sm={8}>
                        {data.length <= 0 ? 'NO DB ENTRIES YET' : data.map((dat) => {
                            if (dat.type == 'tool') {
                                return <Tool data={dat} />
                            }
                            else if (dat.type == 'project') {
                                return <Project data={dat} />
                            }
                            else if (dat.type == 'person') {
                                return <Person data={dat} />
                            }
                            else {
                                return null
                            }
                        })}
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default SearchPage;