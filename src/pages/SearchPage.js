import React from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Project from './components/Project';
import Tool from './components/Tool';
import Person from './components/Person';
import NotFound from './components/NotFound'
import SearchSummary from './components/SearchSummary'
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import ToolTitle from './components/ToolTitle';
import FilterButtons from './components/FilterButtons';
import ProgrammingLanguageFilter from './components/ProgrammingLanguageFilter';

var baseURL = require('./../BaseURL').getURL();

class SearchPage extends React.Component {

    state = {
        searchString: null,
        typeString: null,
        data: [],
        summary: [],
        combinedLanguages:[],
        isLoading: true,
        userState: [{
            loggedIn: false,
            role: "Reader",
            id: null,
            name: null
        }]
    }

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
    }

    componentDidMount() { //fires on first time in or page is refreshed/url loaded
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            this.doSearchCall(values.search, values.type);
            this.doGetLanguagesCall();
            this.setState({ searchString: values.search });
            this.setState({ typeString: values.type });
        }
        else {
            this.setState({ data: [], searchString: '', typeString: 'all', isLoading: true });
            this.doSearchCall("", "all");
            this.doGetLanguagesCall();
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
            this.setState({ data: [], searchString: '', typeString: 'all', isLoading: true });
            this.doSearchCall("", "all");
        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString && !!this.state.typeString) {
                this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString)
                this.doSearchCall(this.state.searchString, this.state.typeString);
            }
            else if (!!this.state.searchString && !this.state.typeString) {
                this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=all')
                this.doSearchCall(this.state.searchString, "");
            }
        }
    }

    callTypeString = (typeString) => {
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + typeString)
        this.doSearchCall(this.state.searchString, typeString);
    } 

    doSearchCall(searchString, typeString) {
        //var searchURL - build url here? loop through langauge array and append any (&programmingLanguage=languageValue) if they exist?
        var searchURL = baseURL + '/api/search?search=' + searchString + '&type=' + typeString;
        //UPDATE TO COMBINED LANGUAGES ARRAY ONCE MULTISELECT WORKS
  /*       var tempCombinedLanguages = ['Java', 'Python'];
        tempCombinedLanguages.map(language => {
            searchURL += '&programmingLanguage=' + language;
        }); */
        this.setState({ isLoading: true });
        // axios.get(baseURL + '/api/search?search=' + searchString + '&type=' + typeString)
        axios.get(searchURL)
            .then((res) => {
                this.setState({ data: res.data.data, summary: Object.entries(res.data.summary), isLoading: false });
            });
    }

    
    doGetLanguagesCall(){
        axios.get(baseURL+'/api/getAllLanguages/tool')
        .then((res) =>{
            this.setState({combinedLanguages: res.data.data});
            this.setState({isLoading: false}); 
            console.log("test3: " + JSON.stringify(res.data.data));
        });
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    updateTypeString = (typeString) => {
        this.setState({ typeString: typeString });
    }

    updateCombinedLanguages = (combinedLanguages) => {
        this.setState({combinedLanguages});
    }

    render() {
        const { searchString, typeString, data, summary, userState, isLoading, combinedLanguages } = this.state;
        
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (

            <div>
                <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />

                <Container>
                    <Row>
                        <Col sm={12} md={12} lg={3}>
                            <FilterButtons typeString={typeString} doUpdateTypeString={this.updateTypeString} doCallTypeString={this.callTypeString} />
                            {/* <ProgrammingLanguageFilter combinedLanguages={combinedLanguages} doUpdateCombinedLanguages={this.updateCombinedLanguages} doCallTypeString={this.callTypeString}/> */}
                            <ProgrammingLanguageFilter combinedLanguages={combinedLanguages} />

                        </Col>
                        
                        <Col sm={12} md={12} lg={9}>
                            {summary.length > 0 ? <SearchSummary data={summary} /> :''}

                            {data.length <= 0 ? <NotFound word='results' /> : data.map((dat) => {                            
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