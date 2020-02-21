import React from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Project from './components/Project';
import Tool from './components/Tool';
import Person from './components/Person';
import SearchNotFound from './components/SearchNotFound'
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
            this.doSearchCall(values.search, values.type);
            this.setState({ searchString: values.search});
            this.setState({ typeString: values.type});
        }
        else {
            this.doSearchCall("","all");
        }
    }

    componentWillReceiveProps() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            if (values.search != this.state.searchString 
                || values.type != this.state.typeString) {
                this.doSearchCall(values.search, values.type);
                this.state.searchString = values.search;
                this.state.typeString = values.type;
            }
        }
        else {
            this.setState({ data: [], searchString: '', typeString: '', isLoading: true});
            this.doSearchCall("","all");
        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString && !!this.state.typeString) {
                this.props.history.push(window.location.pathname+'?search='+this.state.searchString + '&type='+ this.state.typeString)
                this.doSearchCall(this.state.searchString, this.state.typeString);
            }
            else if(!!this.state.searchString && !this.state.typeString){
                this.props.history.push(window.location.pathname+'?search='+this.state.searchString + '&type=all')
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

            <div>
                 <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} />
                
                <Container>
                    <Row>
                        <Col sm={12} md={12} lg={3}>
                            <FilterButtons typeString={typeString} doUpdateTypeString={this.updateTypeString} doCallTypeString={this.callTypeString} />
                        </Col>
                        <Col sm={12} md={12} lg={9}>
                            {data.length <= 0 ? <SearchNotFound />: data.map((dat) => {
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
            </div>


            
            
        );
    }
}

export default SearchPage;