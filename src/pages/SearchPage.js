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
import FilterButtons from './components/FilterButtons';
import ProgrammingLanguageFilter from './components/ProgrammingLanguageFilter';
import CategoryFilter from './components/CategoryFilter';
import FeaturesFilter from './components/FeaturesFilter';
import TopicsFilter from './components/TopicsFilter';

var baseURL = require('./../BaseURL').getURL();

class SearchPage extends React.Component {

    state = {
        searchString: null,
        typeString: null,
        data: [],
        summary: [],
        combinedLanguages:[],
        languageSelected: [],
        combinedCategories:[],
        categoriesSelected: [],
        combinedFeatures:[],
        featuresSelected: [],
        combinedTopic: [],
        topicsSelected: [],
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
            this.doSearchCall(values.search, values.type, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
            //this.doGetLanguagesCall();
            //this.doGetCategoriesCall();
            //this.doGetFeaturesCall();
            //this.doGetTopicsCall();
            this.setState({ searchString: values.search });
            this.setState({ typeString: values.type });
        }
        else {
            //this.doGetLanguagesCall();
            //this.doGetCategoriesCall();
            //this.doGetFeaturesCall();
            //this.doGetTopicsCall();
            this.setState({ data: [], searchString: '', typeString: 'all', isLoading: true });
            this.doSearchCall("", "all", [], [], [], []);
        }
    }

    componentWillReceiveProps() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            if (values.search != this.state.searchString
                || values.type != this.state.typeString) {
                this.doSearchCall(values.search, values.type, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
                this.setState({searchString: values.search});
                this.setState({typeString: values.type});
            }
        }
        else {
            this.setState({ data: [], searchString: '', typeString: 'all', isLoading: true });
            this.doSearchCall("", "all", [], [], [], []);
        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {

            if (!!this.state.searchString && !!this.state.typeString ) {
                this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&toolCategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
                this.doSearchCall(this.state.searchString, this.state.typeString, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
            }
            else if (!!this.state.searchString && !this.state.typeString ) {
                this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=all' + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
                this.doSearchCall(this.state.searchString, "", this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
            }
        }
    }

    callTypeString = (typeString) => {
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + typeString + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
        this.doSearchCall(this.state.searchString, typeString, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
    } 

    doSearchCall(searchString, typeString, languageSelected, categoriesSelected, featuresSelected, topicsSelected) {
        
        var searchURL = baseURL + '/api/search?search=' + searchString + '&type=' + typeString;
        
        languageSelected.map(language => {
        
            searchURL += '&programmingLanguage=' + language;
        });

        console.log('categories selected in search page: ' + categoriesSelected)

        categoriesSelected.map(category => {
        
            searchURL += '&category=' + category;
        });

        console.log('features selected in search page: ' + featuresSelected)

        featuresSelected.map(features => {
        
            searchURL += '&features=' + features;
        });

        
        console.log('topicss selected in search page: ' + topicsSelected)

        topicsSelected.map(topics => {
        
            searchURL += '&topics=' + topics;
        });

        this.setState({ isLoading: true });
        axios.get(searchURL)
            .then((res) => {
                if (res.data.data.length > 0) {
                    var tempCategoriesArray = [];
                    var tempProgrammingLanguageArray = [];
                    var tempFeaturesArray = [];
                    var tempTopicsArray = [];
                    
                    res.data.data.map((dat) => { 
                        if (dat.categories && dat.categories.category && dat.categories.category !== '' && !tempCategoriesArray.includes(dat.categories.category)) {
                            tempCategoriesArray.push(dat.categories.category);
                        }
                        
                        if (dat.categories &&  dat.categories.programmingLanguage && dat.categories.programmingLanguage.length > 0) {
                            dat.categories.programmingLanguage.map((pl) => { 
                                if (!tempProgrammingLanguageArray.includes(pl) && pl !== '') {
                                    tempProgrammingLanguageArray.push(pl);
                                }
                            });
                        }

                        if (dat.tags.features && dat.tags.features.length > 0) {
                            dat.tags.features.map((fe) => { 
                                if (!tempFeaturesArray.includes(fe) && fe !== '') {
                                    tempFeaturesArray.push(fe);
                                }
                            });
                        }
                        
                        if (dat.tags.topics && dat.tags.topics.length > 0) {
                            dat.tags.topics.map((to) => { 
                                if (!tempTopicsArray.includes(to) && to !== '') {
                                    tempTopicsArray.push(to);
                                }
                            });
                        }
                    });
                }
                
                this.setState({combinedCategories: tempCategoriesArray, combinedLanguages: tempProgrammingLanguageArray, combinedFeatures: tempFeaturesArray, combinedTopic:tempTopicsArray});
                this.setState({ data: !res.data.data ? '' : res.data.data, summary: !res.data.summary ? '' : Object.entries(res.data.summary), isLoading: false }); 
            });
    }

    
    doGetLanguagesCall(){
        axios.get(baseURL+'/api/getAllLanguages/tool')
        .then((res) =>{
            this.setState({combinedLanguages: res.data.data});
            console.log("test3: " + JSON.stringify(res.data.data));
        });
    }

    doGetCategoriesCall(){
        axios.get(baseURL+'/api/getAllCategories/tool')
        .then((res) =>{
            //this.setState({combinedCategories: res.data.data});
            console.log("test5: " + JSON.stringify(res.data.data));
        });
    }

    doGetFeaturesCall(){
        axios.get(baseURL+'/api/getAllFeatures/tool')
        .then((res) =>{
            this.setState({combinedFeatures: res.data.data});
            console.log("test2: " + JSON.stringify(res.data.data));
        });
      }

      doGetTopicsCall() {
        axios.get(baseURL+'/api/getAllTopics/tool')
        .then((res) =>{
            this.setState({combinedTopic: res.data.data}); 
            console.log("test1: " + JSON.stringify(res.data.data));
        });
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    updateTypeString = (typeString) => {
        this.setState({ typeString: typeString });
    }

    updateCombinedLanguages = (languageSelected) => {
        this.setState({languageSelected: languageSelected});
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString,  languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
    }

    updateCombinedCategories = (categoriesSelected) => {
        this.setState({categoriesSelected: categoriesSelected});
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&toolcategory=' + categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString,  this.state.languageSelected, categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
    }

    updateCombinedFeatures = (featuresSelected) => {
        this.setState({featuresSelected: featuresSelected});
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + featuresSelected + '&topics=' + this.state.topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString,  this.state.languageSelected, this.state.categoriesSelected, featuresSelected, this.state.topicsSelected);
    }

    updateCombinedTopics = (topicsSelected) => {
        this.setState({topicsSelected: topicsSelected});
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString,  this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, topicsSelected);
    }

    render() {
        const { searchString, typeString, data, summary, userState, isLoading, combinedLanguages, languageSelected, combinedCategories, categoriesSelected, combinedFeatures, featuresSelected, combinedTopic, topicsSelected } = this.state;
        
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
                            <CategoryFilter combinedCategories={combinedCategories} doUpdateCombinedCategories={this.updateCombinedCategories} categoriesSelected={categoriesSelected} />
                            <ProgrammingLanguageFilter combinedLanguages={combinedLanguages} doUpdateCombinedLanguages={this.updateCombinedLanguages} languageSelected={languageSelected}/>
                            <FeaturesFilter combinedFeatures={combinedFeatures} doUpdateCombinedFeatures={this.updateCombinedFeatures} featuresSelected={featuresSelected}/>
                            <TopicsFilter combinedTopic={combinedTopic} doUpdateCombinedTopics={this.updateCombinedTopics} topicsSelected={topicsSelected}/>
                        </Col>
                        
                        <Col sm={12} md={12} lg={9}>
                            {summary.length > 0 ? <SearchSummary data={summary} /> :''}

                            {data.length <= 0 ? <NotFound word='results' /> : data.map((dat) => {                            
                                if (dat.type === 'tool') {
                                    return <Tool key={dat.id} data={dat} />
                                }
                                else if (dat.type === 'project') {
                                    return <Project key={dat.id} data={dat} />
                                }
                                else if (dat.type === 'person') {
                                    return <Person key={dat.id} data={dat} />
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