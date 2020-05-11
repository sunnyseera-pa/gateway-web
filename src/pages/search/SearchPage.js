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
import DatasetFilterPublisher from './DatasetFilterPublisher';
import DatasetFilterLicense from './DatasetFilterLicense';
import DatasetFilterGeoCoverage from './DatasetFilterGeoCoverage';
import DatasetFilterAgeBand from './DatasetFilterAgeBand';
import DatasetFilterSampleAvailability from './DatasetFilterSampleAvailability';
import DatasetFilterKeywords from './DatasetFilterKeywords';
import NoResultsTool from '../commonComponents/NoResultsTools';
import NoResultsProjects from '../commonComponents/NoResultsProjects';
import NoResultsPeople from '../commonComponents/NoResultsPeople';
import NoResultsDatasets from '../commonComponents/NoResultsDatasets';
import { stat } from 'fs';

import About from '../commonComponents/About';
import SearchPageTools from './SearchPageTools';

var baseURL = require('../commonComponents/BaseURL').getURL();

class SearchPage extends React.Component {

    state = {
        searchString: null,
        typeString: null,
        data: [],

        datasetData: [],
        key: "Datasets",

        publisherData: [],
        licenseData: [],
        geographicCoverageData: [],
        ageBandData: [],
        physicalSampleAvailabilityData: [],
        keywordsData:[],

        summary: [],
        combinedLanguages: [],
        languageSelected: [],
        combinedCategories: [],
        categoriesSelected: [],
        combinedFeatures: [],
        featuresSelected: [],
        combinedTopic: [],
        topicsSelected: [],
        publishersSelected: [],
        publishersFilter: '',
        licensesSelected: [],
        licensesFilter: '',
        geoCoverageSelected: [],
        geoCoverageFilter: '',
        sampleAvailabilitySelected: [],
        sampleAvailabilityFilter: '',
        keywordsSelected: [],
        keywordsFilter: '',
        ageBandsSelected: [],
        ageBandsFilter: '',
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
            this.getDatasetFilters(values.search);
        }
        else {
            this.setState({ data: [], searchString: '', typeString: 'all', isLoading: true });
            this.doSearchCall("", "all", [], [], [], []);
            this.getDatasetFilters(values.search);
        }

    }

    getDatasetFilters = (searchString) => {

        axios.get(baseURL + '/api/datasetfilters?search=' + searchString)
            .then((res) => {
                this.setState({
                    publisherData: res.data.data.publisher,
                    licenseData: res.data.data.license,
                    geographicCoverageData: res.data.data.geographicCoverage,
                    ageBandData: res.data.data.ageBand,
                    physicalSampleAvailabilityData: res.data.data.physicalSampleAvailability,
                    keywordsData: res.data.data.keywords
                });
            })
      };

    componentWillReceiveProps() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            if (values.search !== this.state.searchString
                || values.type !== this.state.typeString) {
                this.doSearchCall(values.search, values.type, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
                this.setState({ searchString: values.search });
                this.setState({ typeString: values.type });
                this.getDatasetFilters(values.search);

            }
        }
        else {
            this.setState({ data: [], searchString: '', typeString: 'all', isLoading: true });
            this.doSearchCall("", "all", [], [], [], []);
            this.getDatasetFilters(this.state.searchString);

        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {

            if (!!this.state.searchString && !!this.state.typeString) {
                this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&tab=' + this.state.key + '&toolCategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
                this.doSearchCall(this.state.searchString, this.state.typeString, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
                this.getDatasetFilters(this.state.searchString);
            }
            else if (!!this.state.searchString && !this.state.typeString) {
                this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=all' + '&tab=' + this.state.key +'&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
                this.doSearchCall(this.state.searchString, "", this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
                this.getDatasetFilters(this.state.searchString);
            }
        }
    }

    callTypeString = (typeString) => {
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + typeString + '&tab=' + this.state.key + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
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

                axios.get(baseURL + '/api/datasets/filteredsearch?search=' + this.state.searchString + this.state.publishersFilter + this.state.licensesFilter + this.state.geoCoverageFilter + this.state.sampleAvailabilityFilter + this.state.keywordsFilter + this.state.ageBandsFilter)
                .then((res) => {
                    var TempDataSetData = res.data.data.results;
                    
                    if(!!res.data.data.results){
                            TempDataSetData.forEach((dat) => {
                            this.state.data.push(dat)
                        })
                    }
                    this.setState({ datasetData: !res.data.data.results ? '' : res.data.data.results , isLoading: false });
                })
            })
    }

    // doDatasetSearch(searchString) { 
    //     axios.get(baseURL + '/api/datasets/search?search=' + this.state.searchString)
    //         .then((res) => {
    //             var TempDataSetData = res.data.data.items;

    //             if (!!res.data.data.items) {
    //                 TempDataSetData.forEach((dat) => {
    //                     this.state.data.push(dat)
    //                 })
    //             }

    //             this.setState({datasetData: !res.data.data.items ? '' : res.data.data.items , isLoading: false
    //             });
    //         })
    // }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    updateTypeString = (typeString) => {
        this.setState({ typeString: typeString });
    }

    updateCombinedLanguages = (languageSelected) => {
        this.setState({ languageSelected: languageSelected });
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&tab=' + this.state.key + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString, languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
    }

    updateCombinedCategories = (categoriesSelected) => {
        this.setState({ categoriesSelected: categoriesSelected });
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&tab=' + this.state.key + '&toolcategory=' + categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + this.state.topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString, this.state.languageSelected, categoriesSelected, this.state.featuresSelected, this.state.topicsSelected);
    }

    updateCombinedFeatures = (featuresSelected) => {
        this.setState({ featuresSelected: featuresSelected });
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&tab=' + this.state.key + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + featuresSelected + '&topics=' + this.state.topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString, this.state.languageSelected, this.state.categoriesSelected, featuresSelected, this.state.topicsSelected);
    }

    updateCombinedTopics = (topicsSelected) => {
        this.setState({ topicsSelected: topicsSelected });
        this.props.history.push(window.location.pathname + '?search=' + this.state.searchString + '&type=' + this.state.typeString + '&tab=' + this.state.key + '&toolcategory=' + this.state.categoriesSelected + '&programminglanguage=' + this.state.languageSelected + '&features=' + this.state.featuresSelected + '&topics=' + topicsSelected)
        this.doSearchCall(this.state.searchString, this.state.typeString, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, topicsSelected);
    }

    updatePublisher = (publishersSelected) => {
        this.setState({publishersSelected: publishersSelected})

        this.filteredSearch(this.state.searchString, publishersSelected, this.state.licensesSelected, this.state.geoCoverageSelected, this.state.sampleAvailabilitySelected, this.state.keywordsSelected, this.state.ageBandsSelected);

    }
    updateLicenses = (licensesSelected) => {
        this.setState({licensesSelected: licensesSelected})

        this.filteredSearch(this.state.searchString, this.state.publishersSelected, licensesSelected, this.state.geoCoverageSelected, this.state.sampleAvailabilitySelected, this.state.keywordsSelected, this.state.ageBandsSelected);

    }
    updateGeoCoverage = (geoCoverageSelected) => {
        this.setState({geoCoverageSelected: geoCoverageSelected})

        this.filteredSearch(this.state.searchString, this.state.publishersSelected, this.state.licensesSelected, geoCoverageSelected, this.state.sampleAvailabilitySelected, this.state.keywordsSelected, this.state.ageBandsSelected);
    }

    updateSampleAvailability = (sampleAvailabilitySelected) => {
        this.setState({sampleAvailabilitySelected: sampleAvailabilitySelected})

        this.filteredSearch(this.state.searchString, this.state.publishersSelected, this.state.licensesSelected, this.state.geoCoverageSelected, sampleAvailabilitySelected, this.state.keywordsSelected, this.state.ageBandsSelected);
    }

    updateKeywords = (keywordsSelected) => {
        this.setState({keywordsSelected: keywordsSelected})

        this.filteredSearch(this.state.searchString, this.state.publishersSelected, this.state.licensesSelected, this.state.geoCoverageSelected, this.state.sampleAvailabilitySelected, keywordsSelected, this.state.ageBandsSelected);
    }

    updateAgeBands = (ageBandsSelected) => {
        this.setState({ageBandsSelected: ageBandsSelected})

        this.filteredSearch(this.state.searchString, this.state.publishersSelected, this.state.licensesSelected, this.state.geoCoverageSelected, this.state.sampleAvailabilitySelected, this.state.keywordsSelected, ageBandsSelected);
    }

    filteredSearch = (searchString, publishersSelected, licensesSelected, geoCoverageSelected, sampleAvailabilitySelected, keywordsSelected, ageBandsSelected) => {
    
        // this.setState({publishersSelected: publishersSelected})
        // this.setState({licensesSelected: licensesSelected})

        var publishersFilter = "";
        var licensesFilter = "";
        var geoCoverageFilter = "";
        var sampleAvailabilityFilter = "";
        var keywordsFilter = "";
        var ageBandsFilter = "";

        publishersSelected.map((pub) => {
                publishersFilter = publishersFilter + '&publisher=' + pub;
        })

        licensesSelected.map((lic) => {
            licensesFilter = licensesFilter + '&license=' + lic;
         })

         geoCoverageSelected.map((geo) => {
            geoCoverageFilter = geoCoverageFilter + '&geographicCoverage=' + geo;
         })

         sampleAvailabilitySelected.map((samp) => {
            sampleAvailabilityFilter = sampleAvailabilityFilter + '&physicalSampleAvailability=' + samp;
         })

         keywordsSelected.map((key) => {
            keywordsFilter = keywordsFilter + '&keywords=' + key;
         })

         ageBandsSelected.map((age) => {
            ageBandsFilter = ageBandsFilter + '&ageBand=' + age;
         })

        this.setState({publishersFilter: publishersFilter})
        this.setState({licensesFilter: licensesFilter})
        this.setState({geoCoverageFilter: geoCoverageFilter})
        this.setState({sampleAvailabilityFilter: sampleAvailabilityFilter})
        this.setState({keywordsFilter: keywordsFilter})
        this.setState({ageBandsFilter: ageBandsFilter})

        this.doSearchCall(this.state.searchString, this.state.typeString, this.state.languageSelected, this.state.categoriesSelected, this.state.featuresSelected, this.state.topicsSelected, publishersFilter, licensesFilter, geoCoverageFilter, sampleAvailabilityFilter, keywordsFilter, ageBandsFilter);
  }

    handleSelect = (key) => {
        this.setState({ key: key });
        // this.props.history.push(window.location.pathname + '?tab=' + key);
    }

    render() {
        const { searchString, typeString, data, key, summary, userState, isLoading, combinedLanguages, languageSelected, combinedCategories, categoriesSelected, combinedFeatures, featuresSelected, combinedTopic, topicsSelected, datasetData, publishersSelected, licensesSelected, geoCoverageSelected, sampleAvailabilitySelected, keywordsSelected, ageBandsSelected, publisherData, licenseData, geographicCoverageData, ageBandData, physicalSampleAvailabilityData, keywordsData } = this.state;

        var toolCount = 0;
        var projectCount = 0;
        var personCount = 0;



        // if (!combinedCategories || combinedCategories.length === 0) {
        //     return (<></>);
        // }

        if (!!data && (data.length-datasetData.length) > 0) {
            data.map((dat) => {
                if (data && dat.type === 'tool') {
                    toolCount++
                }
                else if (data && dat.type === 'project') {
                    projectCount+=1

                }
                else if (data && dat.type === 'person') {
                    personCount++

                }
            })
        }


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
                                <Tabs className='TabsBackground Gray700-13px' activeKey={this.state.key} onSelect={this.handleSelect}>

                                    <Tab eventKey="Datasets" title={'Datasets (' + datasetData.length + ')'}>
                                        {/* <About data={data} /> */}
                                        
                                    </Tab>
{/* TODO */}
                                    <Tab eventKey="Tools" title={'Tools (' + toolCount + ')'}>
                                      {/* {data.projectids.length <= 0 ? <NotFound word="projects" /> : data.projectids.map(id => <Project id={id} />)} */}
                                    </Tab>

                                    <Tab eventKey="Projects" title={'Projects (' + projectCount + ')'}>
                                        {/* {data.toolids.length <= 0 ? <NotFound word="tools" /> : data.toolids.map(id => <Tool id={id} />)} */}
                                    </Tab>

                                    <Tab eventKey="People" title={'People (' + personCount + ')'}>
                                        {/* <About data={data} /> */}
                                        
                                    </Tab>

                                </Tabs>
                            </div>
                        </Col>
                    </Row> 

                    <Row>
                        <Col>
                            {data && key === 'Tools' && toolCount <= 0 ? <NoResultsTool data={data} /> : ''}
                            {data && key === 'Projects' && projectCount <= 0 ? <NoResultsProjects /> : ''}
                            {data && key === 'People' && personCount <= 0 ? <NoResultsPeople /> : ''}
                            {data && key === 'Datasets' && datasetData.length <= 0 ? <NoResultsDatasets /> : ''}
                        </Col>
                    </Row>


                    <Row>
                        <Col sm={12} md={12} lg={3}>
                            {/* <FilterButtons typeString={typeString} doUpdateTypeString={this.updateTypeString} doCallTypeString={this.callTypeString} /> */}
                            {key === 'Tools' || key === 'Projects' ? <CategoryFilter combinedCategories={combinedCategories} doUpdateCombinedCategories={this.updateCombinedCategories} categoriesSelected={categoriesSelected} /> : ''}
                            {key === 'Tools' ? <ProgrammingLanguageFilter combinedLanguages={combinedLanguages} doUpdateCombinedLanguages={this.updateCombinedLanguages} languageSelected={languageSelected} /> : ''}
                            {key === 'Tools' ? <FeaturesFilter combinedFeatures={combinedFeatures} doUpdateCombinedFeatures={this.updateCombinedFeatures} featuresSelected={featuresSelected} /> : ''}
                            {key === 'Tools' ? <TopicsFilter combinedTopic={combinedTopic} doUpdateCombinedTopics={this.updateCombinedTopics} topicsSelected={topicsSelected} /> : ''}
                            {key === 'Datasets' ? <DatasetFilterLicense searchString={searchString} licenseData={licenseData} doFilteredSearch={this.updateLicenses} licensesSelected={licensesSelected}/> : ''}
                            {key === 'Datasets' ? <DatasetFilterSampleAvailability searchString={searchString} physicalSampleAvailabilityData={physicalSampleAvailabilityData} doFilteredSearch={this.updateSampleAvailability} sampleAvailabilitySelected={sampleAvailabilitySelected} /> : ''}
                            {key === 'Datasets' ? <DatasetFilterKeywords searchString={searchString} keywordsData={keywordsData} doFilteredSearch={this.updateKeywords} keywordsSelected={keywordsSelected} /> : ''}
                            {key === 'Datasets' ? <DatasetFilterPublisher searchString={searchString} publisherData={publisherData} doFilteredSearch={this.updatePublisher} publishersSelected={publishersSelected} /> : ''}
                            {key === 'Datasets' ? <DatasetFilterAgeBand searchString={searchString} ageBandData={ageBandData} doFilteredSearch={this.updateAgeBands} ageBandsSelected={ageBandsSelected} /> : ''}
                            {key === 'Datasets' ? <DatasetFilterGeoCoverage searchString={searchString} geographicCoverageData={geographicCoverageData} doFilteredSearch={this.updateGeoCoverage} geoCoverageSelected={geoCoverageSelected} /> : ''}
                        </Col>

                        <Col sm={12} md={12} lg={9}>
                            {/* {summary.length > 0 || datasetData.length > 0? <SearchSummary data={summary} datasetData={datasetData} /> : ''} */}

                            {/* {data && key === 'Tools' && toolCount <= 0 ? <NoResultsTool /> : ''}
                            {data && key === 'Projects' && projectCount <= 0 ? <NoResultsProjects /> : ''}
                            {data && key === 'People' && personCount <= 0 ? <NoResultsPeople /> : ''}
                            {data && key === 'Datasets' && datasetData.length <= 0 ? <NoResultsDatasets /> : ''} */}


                            {data.length <= 0 ?  ''
                            // <NotFound word='results' /> 
                            :        
                            data.map((dat) => {
                                if (dat.type === 'tool' && key === 'Tools' && toolCount >= 1) {
                                    return <Tool key={dat.id} data={dat} />
                                }
                                else if (dat.type === 'project' && key === 'Projects') {
                                    return <Project key={dat.id} data={dat} />
                                }
                                else if (dat.type === 'person' && key === 'People') {
                                    return <Person key={dat.id} data={dat} />
                                }
                                else if (dat.type === undefined && key === 'Datasets')
                                {
                                    return <DataSet key={dat.id} data={dat} />
                                }
                            })}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

// class SearchSummary extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state.data = props.data;
//         this.state.datasetData = props.datasetData;

//     }

//     // initialize our state
//     state = {
//         data: [],
//         datasetData: []
//     };

//     render() {
//         const { data, datasetData } = this.state;

//         var total = 0;
//         data.map(summ => total += summ[1]);
//         total += datasetData.length;
    
//         return (
//             <Row className="mt-2">
//                 <Col>
//                     <div className="Rectangle">
//                         <div className="Gray800-14px" style={{ textAlign: 'center' }}>
//                             Showing {data.map(summ => summ[1] + ' ' + summ[0] + (summ[1] > 1 ? 's' : '')).join(", ")} {data.length == 0 ? '' : ', '} {!datasetData ? '' : datasetData.length == 1 ? datasetData.length + ' dataset ' : datasetData.length + ' datasets '} ({total} total)
//                         </div>
//                     </div>
//                 </Col>
//             </Row>
//         )
//     }
// }

export default SearchPage;