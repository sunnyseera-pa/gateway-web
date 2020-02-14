import React from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Project from './components/Project';
import Tool from './components/Tool';
import Person from './components/Person';
import queryString from 'query-string';

var baseURL = 'http://localhost:3001'; // need to be moved

class SearchPage extends React.Component{

    state = {
        searchString: null,
        data: [],
        firstLoad: false
    }

    componentDidMount() { //fires on first time in or page is refreshed/url loaded
        debugger
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            this.doSearchCall(values.search);
            this.setState({ searchString: values.search});
        }
    }

    componentWillReceiveProps() {
        debugger
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            if (values.search != this.state.searchString) {
                this.doSearchCall(values.search);
                this.setState({ searchString: values.search});
            }
        }
        else {
            this.setState({ data: [], searchString: ''});
        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            debugger
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
        debugger
        this.setState({ searchString: searchString});
    }

    render(){
        debugger
        const { searchString, data } = this.state;
        return(
            <div>
                <SearchBar searchString={this.state.searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} />
                
                {data.length <= 0 ? 'NO DB ENTRIES YET': data.map((dat) => {
                    if (dat.type == 'tool') {
                        return <Tool data={dat} />
                    } 
                    else if (dat.type == 'project') {
                        return <Project />
                    }
                    else if (dat.type == 'person') {
                        return <Person />
                    }
                    else {
                        return null
                    }
                })}

            </div>
        );
    }
}

export default SearchPage;