import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import SearchBar from '../commonComponents/SearchBar';
import Project from '../commonComponents/Project';
import Tool from '../commonComponents/Tool';
import Person from '../commonComponents/Person';
import DataSet from '../commonComponents/DataSet';
import NotFound from '../commonComponents/NotFound'
import Loading from '../commonComponents/Loading'
import FilterButtons from './FilterButtons';
import ProgrammingLanguageFilter from './ProgrammingLanguageFilter';
import CategoryFilter from './CategoryFilter';
import FeaturesFilter from './FeaturesFilter';
import TopicsFilter from './TopicsFilter';
import { stat } from 'fs';

import About from '../commonComponents/About';

var baseURL = require('../commonComponents/BaseURL').getURL();

class SearchPageTools extends React.Component {

    state = {
        searchString: null,
        typeString: null,
        data: [],

        datasetData: [],

        summary: [],
        combinedLanguages: [],
        languageSelected: [],
        combinedCategories: [],
        categoriesSelected: [],
        combinedFeatures: [],
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
            this.setState({ searchString: values.search });
            this.setState({ typeString: values.type });
        }
        else {
            this.setState({ data: [], searchString: '', typeString: 'all', isLoading: true });
            this.doSearchCall("", "all", [], [], [], []);
        }
    }

    componentWillReceiveProps() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            if (values.search !== this.state.searchString
                || values.type !== this.state.typeString) {
                this.doSearchCall(values.search, values.type, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
                this.setState({ searchString: values.search });
                this.setState({ typeString: values.type });
            }
        }
        else {
            this.setState({ data: [], searchString: '', typeString: 'all', isLoading: true });
            this.doSearchCall("", "all", [], [], [], []);
        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {

            if (!!this.state.searchString && !!this.state.typeString) {
                this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&toolCategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
                this.doSearchCall(this.state.searchString, this.state.typeString, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
            }
            else if (!!this.state.searchString && !this.state.typeString) {
                this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=all&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
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

        languageSelected.forEach(language => {
            searchURL += '&programmingLanguage=' + language;
        });

        categoriesSelected.forEach(category => {

            searchURL += '&category=' + category;
        });

        featuresSelected.forEach(features => {

            searchURL += '&features=' + features;
        });

        topicsSelected.forEach(topics => {

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

                    res.data.data.forEach((dat) => {
                        if (dat.categories && dat.categories.category && dat.categories.category !== '' && !tempCategoriesArray.includes(dat.categories.category)) {
                            tempCategoriesArray.push(dat.categories.category);
                        }

                        if (dat.categories && dat.categories.programmingLanguage && dat.categories.programmingLanguage.length > 0) {
                            dat.categories.programmingLanguage.forEach((pl) => {
                                if (!tempProgrammingLanguageArray.includes(pl) && pl !== '') {
                                    tempProgrammingLanguageArray.push(pl);
                                }
                            });
                        }

                        if (dat.tags.features && dat.tags.features.length > 0) {
                            dat.tags.features.forEach((fe) => {
                                if (!tempFeaturesArray.includes(fe) && fe !== '') {
                                    tempFeaturesArray.push(fe);
                                }
                            });
                        }

                        if (dat.tags.topics && dat.tags.topics.length > 0) {
                            dat.tags.topics.forEach((to) => {
                                if (!tempTopicsArray.includes(to) && to !== '') {
                                    tempTopicsArray.push(to);
                                }
                            });
                        }
                    });
                }

                this.setState({ combinedCategories: tempCategoriesArray, combinedLanguages: tempProgrammingLanguageArray, combinedFeatures: tempFeaturesArray, combinedTopic: tempTopicsArray });
                this.setState({ data: !res.data.data ? '' : res.data.data, summary: !res.data.summary ? '' : Object.entries(res.data.summary ) });

                axios.get(baseURL + '/api/datasets/search?search=' + this.state.searchString)
                .then((res) => {
                    var TempDataSetData = res.data.data.items;

                    if(!!res.data.data.items){
                            TempDataSetData.forEach((dat) => {
                            this.state.data.push(dat)
                        })
                    }

                    this.setState({ datasetData: !res.data.data.items ? '' : res.data.data.items , isLoading: false });
                })
            })
    }

    doDatasetSearch(searchString) { 
        axios.get(baseURL + '/api/datasets/search?search=' + this.state.searchString)
            .then((res) => {
                var TempDataSetData = res.data.data.items;

                if (!!res.data.data.items) {
                    TempDataSetData.forEach((dat) => {
                        this.state.data.push(dat)
                    })
                }

                this.setState({datasetData: !res.data.data.items ? '' : res.data.data.items , isLoading: false
                });
            })
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    updateTypeString = (typeString) => {
        this.setState({ typeString: typeString });
    }

    updateCombinedLanguages = (languageSelected) => {
        this.setState({ languageSelected: languageSelected });
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString, languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
    }

    updateCombinedCategories = (categoriesSelected) => {
        this.setState({ categoriesSelected: categoriesSelected });
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&toolcategory=' + categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString, this.state.languageSelected, categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
    }

    updateCombinedFeatures = (featuresSelected) => {
        this.setState({ featuresSelected: featuresSelected });
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + featuresSelected + '&topics=' + this.state.topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString, this.state.languageSelected, this.state.categoriesSelected, featuresSelected, this.state.topicsSelected);
    }

    updateCombinedTopics = (topicsSelected) => {
        this.setState({ topicsSelected: topicsSelected });
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, topicsSelected);
    }

    render() {
        const { searchString, typeString, data, summary, userState, isLoading, combinedLanguages, languageSelected, combinedCategories, categoriesSelected, combinedFeatures, featuresSelected, combinedTopic, topicsSelected, datasetData } = this.state;

        if (isLoading) {
            return <Container><Loading /></Container>;
        }

        return (

            <div>
                <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />

                <Container>
                    <Row className="mt-1">
                        <Col sm={12} lg={12}>
                            <div>
                                <Tabs className='TabsBackground Gray700-13px'>

                                    <Tab eventKey="Datasets" title={'Datasets'}>
                                        <About data={data} />
                                    </Tab>

                                    <Tab eventKey="Tools" title={'Tools'}>
                                        {/* {data.projectids.length <= 0 ? <NotFound word="projects" /> : data.projectids.map(id => <Project id={id} />)} */}
                                    </Tab>

                                    <Tab eventKey="Projects" title={'Projects'}>
                                        {/* {data.toolids.length <= 0 ? <NotFound word="tools" /> : data.toolids.map(id => <Tool id={id} />)} */}
                                    </Tab>

                                </Tabs>
                            </div>
                        </Col>
                    </Row> 


                    <Row>
                        <Col sm={12} md={12} lg={3}>
                            <FilterButtons typeString={typeString} doUpdateTypeString={this.updateTypeString} doCallTypeString={this.callTypeString} />
                            <CategoryFilter combinedCategories={combinedCategories} doUpdateCombinedCategories={this.updateCombinedCategories} categoriesSelected={categoriesSelected} />
                            <ProgrammingLanguageFilter combinedLanguages={combinedLanguages} doUpdateCombinedLanguages={this.updateCombinedLanguages} languageSelected={languageSelected} />
                            <FeaturesFilter combinedFeatures={combinedFeatures} doUpdateCombinedFeatures={this.updateCombinedFeatures} featuresSelected={featuresSelected} />
                            <TopicsFilter combinedTopic={combinedTopic} doUpdateCombinedTopics={this.updateCombinedTopics} topicsSelected={topicsSelected} />
                        </Col>

                        <Col sm={12} md={12} lg={9}>
                            {/* {summary.length > 0 || datasetData.length > 0? <SearchSummary data={summary} datasetData={datasetData} /> : ''} */}

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
                                else if(dat.domainType === 'DataModel') {
                                    return <DataSet key={dat.id} data={dat} />
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

class SearchSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state.data = props.data;
        this.state.datasetData = props.datasetData;

    }

    // initialize our state
    state = {
        data: [],
        datasetData: []
    };

    render() {
        const { data, datasetData } = this.state;

        var total = 0;
        data.map(summ => total += summ[1]);
        total += datasetData.length;
    
        return (
            <Row className="mt-2">
                <Col>
                    <div className="Rectangle">
                        <div className="Gray800-14px" style={{ textAlign: 'center' }}>
                            Showing {data.map(summ => summ[1] + ' ' + summ[0] + (summ[1] > 1 ? 's' : '')).join(", ")} {data.length == 0 ? '' : ', '} {!datasetData ? '' : datasetData.length == 1 ? datasetData.length + ' dataset ' : datasetData.length + ' datasets '} ({total} total)
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default SearchPageTools;