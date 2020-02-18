import React from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Project from './components/Project';
import Tool from './components/Tool';
import Person from './components/Person';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import ToolTitle from './components/ToolTitle';

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
        data: [],
        id: '',
        type: '',
        name: '',
        description: '',
        rating: '',
        link: '',
        tags: [],
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
        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString) {
                this.props.history.push(window.location.pathname+'?search='+this.state.searchString)
                this.doSearchCall(this.state.searchString);
            }
        }
    }
    
    doSearchCall(searchString) {
        axios.get(baseURL+'/api/search?search='+searchString)
        .then((res) => {
            this.setState({ data: res.data.data });
        });
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString});
    }

    render(){
        const { searchString, data, id, type, name, description, rating, link, tags, isLoading} = this.state;

        return(
            <Container className="BackgroundColour">
                <Row className="WhiteBackground">
        
                <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} />
                </Row>

                {data.length <= 0 ? 'NO DB ENTRIES YET': data.map((dat) => {
                    if (dat.type == 'tool') {
                        return <Tool data={dat} id={dat.id} type={dat.type} name={dat.name} description={dat.description} rating={dat.rating} link={dat.link} tags={dat.tags} />
                    } 
                    else if (dat.type == 'project') {
                        return <Project data={dat} id={dat.id} type={dat.type} name={dat.name} description={dat.description} rating={dat.rating} link={dat.link} tags={dat.tags} />
                    }
                    else if (dat.type == 'person') {
                        return <Person data={dat} id={dat.id} type={dat.type} name={dat.name} description={dat.description} rating={dat.rating} link={dat.link} tags={dat.tags} />
                    }
                    else {
                        return null
                    }
                })}

            </Container>
        );
    }
}

export default SearchPage;