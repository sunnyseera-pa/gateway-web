import React from 'react';
import axios from 'axios';
import { PageView, initGA } from '../../tracking';
import queryString from 'query-string';

import { Container, Row, Col, Tabs, Tab, Pagination } from 'react-bootstrap';

import SearchBar from '../commonComponents/SearchBar';
import RelatedObject from '../commonComponents/RelatedObject';
import Loading from '../commonComponents/Loading'
import Filters from './Filters';
import NoResults from '../commonComponents/NoResults';

var baseURL = require('../commonComponents/BaseURL').getURL();

class SearchPage extends React.Component {

    state = {
        searchString: '',
        datasetIndex: 0,
        toolIndex: 0,
        projectIndex: 0,
        paperIndex: 0,
        personIndex: 0,
        datasetData: [],
        toolData: [],
        projectData: [],
        paperData: [],
        personData: [],
        filterOptions: [],
        allFilters: [],
        licensesSelected: [],
        sampleAvailabilitySelected: [],
        keywordsSelected: [],
        publishersSelected: [],
        ageBandsSelected: [],
        geoCoverageSelected: [],
        toolCategoriesSelected: [],
        languageSelected: [],
        featuresSelected: [],
        toolTopicsSelected: [],
        projectCategoriesSelected: [],
        projectFeaturesSelected: [],
        projectTopicsSelected: [],
        paperFeaturesSelected: [],
        paperTopicsSelected: [],
        summary: [],
        key: '',
        isLoading: true,
        isResultsLoading: true,
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
        this.state.searchString = props.searchString || null;
    }

    async componentDidMount() { //fires on first time in or page is refreshed/url loaded
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);

            await Promise.all([
                this.updateFilterStates(values)
            ])
            this.getFiltersCall()
            this.doSearchCall()
            initGA('UA-166025838-1');
            PageView();
        }
        else {
            this.setState({ data: [], searchString: '', isLoading: true });
            this.getFiltersCall()
            this.doSearchCall()
            initGA('UA-166025838-1');
            PageView();
        }
    }

    async componentWillReceiveProps() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);

            if (values.search !== this.state.searchString
                || (((typeof values.license === "undefined" && this.state.licensesSelected.length !== 0) || (typeof values.license !== "undefined" && this.state.licensesSelected.length === 0)) && !this.state.licensesSelected.includes(values.license))
                || (((typeof values.sampleavailability === "undefined" && this.state.sampleAvailabilitySelected.length !== 0) || (typeof values.sampleavailability !== "undefined" && this.state.sampleAvailabilitySelected.length === 0)) && !this.state.sampleAvailabilitySelected.includes(values.sampleavailability))
                || (((typeof values.keywords === "undefined" && this.state.keywordsSelected.length !== 0) || (typeof values.keywords !== "undefined" && this.state.keywordsSelected.length === 0)) && !this.state.keywordsSelected.includes(values.keywords))
                || (((typeof values.publisher === "undefined" && this.state.publishersSelected.length !== 0) || (typeof values.publisher !== "undefined" && this.state.publishersSelected.length === 0)) && !this.state.publishersSelected.includes(values.publisher))
                || (((typeof values.ageband === "undefined" && this.state.ageBandsSelected.length !== 0) || (typeof values.ageband !== "undefined" && this.state.ageBandsSelected.length === 0)) && !this.state.ageBandsSelected.includes(values.ageband))
                || (((typeof values.geographiccover === "undefined" && this.state.geoCoverageSelected.length !== 0) || (typeof values.geographiccover !== "undefined" && this.state.geoCoverageSelected.length === 0)) && !this.state.geoCoverageSelected.includes(values.geographiccover))
                
                || (((typeof values.toolcategories === "undefined" && this.state.toolCategoriesSelected.length !== 0) || (typeof values.toolcategories !== "undefined" && this.state.toolCategoriesSelected.length === 0)) && !this.state.toolCategoriesSelected.includes(values.toolcategories))
                || (((typeof values.programmingLanguage === "undefined" && this.state.languageSelected.length !== 0) || (typeof values.programmingLanguage !== "undefined" && this.state.languageSelected.length === 0)) && !this.state.languageSelected.includes(values.programmingLanguage))
                || (((typeof values.features === "undefined" && this.state.featuresSelected.length !== 0) || (typeof values.features !== "undefined" && this.state.featuresSelected.length === 0)) && !this.state.featuresSelected.includes(values.features))
                || (((typeof values.tooltopics === "undefined" && this.state.toolTopicsSelected.length !== 0) || (typeof values.tooltopics !== "undefined" && this.state.toolTopicsSelected.length === 0)) && !this.state.toolTopicsSelected.includes(values.tooltopics))
                
                || (((typeof values.projectcategories === "undefined" && this.state.projectCategoriesSelected.length !== 0) || (typeof values.projectcategories !== "undefined" && this.state.projectCategoriesSelected.length === 0)) && !this.state.projectCategoriesSelected.includes(values.projectcategories))
                || (((typeof values.projectfeatures === "undefined" && this.state.projectFeaturesSelected.length !== 0) || (typeof values.projectfeatures !== "undefined" && this.state.projectFeaturesSelected.length === 0)) && !this.state.projectFeaturesSelected.includes(values.projectfeatures))
                || (((typeof values.projecttopics === "undefined" && this.state.projectTopicsSelected.length !== 0) || (typeof values.projecttopics !== "undefined" && this.state.projectTopicsSelected.length === 0)) && !this.state.projectTopicsSelected.includes(values.projecttopics))
                
                || (((typeof values.paperfeatures === "undefined" && this.state.paperFeaturesSelected.length !== 0) || (typeof values.paperfeatures !== "undefined" && this.state.paperFeaturesSelected.length === 0)) && !this.state.paperFeaturesSelected.includes(values.paperfeatures))
                || (((typeof values.papertopics === "undefined" && this.state.paperTopicsSelected.length !== 0) || (typeof values.papertopics !== "undefined" && this.state.paperTopicsSelected.length === 0)) && !this.state.paperTopicsSelected.includes(values.papertopics))
                
                || (((typeof values.datasetIndex === "undefined" && this.state.datasetIndex !== 0) || (typeof values.datasetIndex !== "undefined" && this.state.datasetIndex === 0)) && this.state.datasetIndex !== values.datasetIndex)
                || (((typeof values.toolIndex === "undefined" && this.state.toolIndex !== 0) || (typeof values.toolIndex !== "undefined" && this.state.toolIndex === 0)) && this.state.toolIndex !== values.toolIndex)
                || (((typeof values.projectIndex === "undefined" && this.state.projectIndex !== 0) || (typeof values.projectIndex !== "undefined" && this.state.projectIndex === 0)) && this.state.projectIndex !== values.projectIndex)
                || (((typeof values.personIndex === "undefined" && this.state.personIndex !== 0) || (typeof values.personIndex !== "undefined" && this.state.personIndex === 0)) && this.state.personIndex !== values.personIndex)
            ) {
                await Promise.all([
                    this.updateFilterStates(values)
                ])
                this.doSearchCall(true);
            }
            else if (this.state.key !== values.tab) {
                this.setState({ key: values.tab });
            }
        }
        else {
            this.setState({ data: [], searchString: '', isLoading: true });
            this.doSearchCall();
        }
    }

    doSearch = async (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            
            this.setState({ isResultsLoading: true });
            await Promise.all([
                this.clearFilterStates(),
                this.getFiltersCall()
            ])
            
            this.doSearchCall();    
        }
    }

    doClear = async (e) => {
        this.setState({ isResultsLoading: true, searchString: '' });
        await Promise.all([
            this.clearFilterStates()
        ])
        this.doSearchCall();    
    }

    updateFilterStates(values) {
        values.search ? this.setState({ searchString: values.search }) : this.setState({ searchString: '' })

        values.license ? this.setState({ licensesSelected: values.license.split("::") }) : this.setState({ licensesSelected: [] })
        values.sampleavailability ? this.setState({ sampleAvailabilitySelected: values.sampleavailability.split("::") }) : this.setState({ sampleAvailabilitySelected: [] })
        values.keywords ? this.setState({ keywordsSelected: values.keywords.split("::") }) : this.setState({ keywordsSelected: [] })
        values.publisher ? this.setState({ publishersSelected: values.publisher.split("::") }) : this.setState({ publishersSelected: [] })
        values.ageband ? this.setState({ ageBandsSelected: values.ageband.split("::") }) : this.setState({ ageBandsSelected: [] })
        values.geographiccover ? this.setState({ geoCoverageSelected: values.geographiccover.split("::") }) : this.setState({ geoCoverageSelected: [] })

        values.toolcategories ? this.setState({ toolCategoriesSelected: values.toolcategories.split("::") }) : this.setState({ toolCategoriesSelected: [] })
        values.programmingLanguage ? this.setState({ languageSelected: values.programmingLanguage.split("::") }) : this.setState({ languageSelected: [] })
        values.features ? this.setState({ featuresSelected: values.features.split("::") }) : this.setState({ featuresSelected: [] })
        values.tooltopics ? this.setState({ toolTopicsSelected: values.tooltopics.split("::") }) : this.setState({ toolTopicsSelected: [] })

        values.projectcategories ? this.setState({ projectCategoriesSelected: values.projectcategories.split("::") }) : this.setState({ projectCategoriesSelected: [] })
        values.projectfeatures ? this.setState({ projectFeaturesSelected: values.projectfeatures.split("::") }) : this.setState({ projectFeaturesSelected: [] })
        values.projecttopics ? this.setState({ projectTopicsSelected: values.projecttopics.split("::") }) : this.setState({ projectTopicsSelected: [] })

        values.paperfeatures ? this.setState({ paperFeaturesSelected: values.paperfeatures.split("::") }) : this.setState({ paperFeaturesSelected: [] })
        values.papertopics ? this.setState({ paperTopicsSelected: values.papertopics.split("::") }) : this.setState({ paperTopicsSelected: [] })

        values.tab ? this.setState({ key: values.tab }) : this.setState({ key: '' })
        values.datasetIndex ? this.setState({ datasetIndex: values.datasetIndex }) : this.setState({ datasetIndex: 0 })
        values.toolIndex ? this.setState({ toolIndex: values.toolIndex }) : this.setState({ toolIndex: 0 })
        values.projectIndex ? this.setState({ projectIndex: values.projectIndex }) : this.setState({ projectIndex: 0 })
        values.personIndex ? this.setState({ personIndex: values.personIndex }) : this.setState({ personIndex: 0 })
    }

    clearFilterStates() {
        this.setState({ licensesSelected: [] })
        this.setState({ sampleAvailabilitySelected: [] })
        this.setState({ keywordsSelected: [] })
        this.setState({ publishersSelected: [] })
        this.setState({ ageBandsSelected: [] })
        this.setState({ geoCoverageSelected: [] })

        this.setState({ toolCategoriesSelected: [] })
        this.setState({ languageSelected: [] })
        this.setState({ featuresSelected: [] })
        this.setState({ toolTopicsSelected: [] })

        this.setState({ projectCategoriesSelected: [] })
        this.setState({ projectFeaturesSelected: [] })
        this.setState({ projectTopicsSelected: [] })
        
        this.setState({ paperFeaturesSelected: [] })
        this.setState({ paperTopicsSelected: [] })

        this.setState({ datasetIndex: 0 })
        this.setState({ toolIndex: 0 })
        this.setState({ projectIndex: 0 })
        this.setState({ paperIndex: 0 })
        this.setState({ personIndex: 0 })
    }

    updateOnFilter = async () => {
        await Promise.all([
            this.setState({ datasetIndex: 0 }),
            this.setState({ toolIndex: 0 }),
            this.setState({ projectIndex: 0 }),
            this.setState({ paperIndex: 0 }),
            this.setState({ personIndex: 0 })
        ])
        this.doSearchCall();
        this.setState({ isResultsLoading: true });
    }

    clearFilter = async (filter, filterGroup) => {
        if (filter === 'All') {
            await Promise.all([
                this.clearFilterStates()
            ])
        }
        else {
            this.state[filterGroup].splice(this.state[filterGroup].indexOf(filter), 1);
        }
        
        this.doSearchCall();
        this.setState({ isResultsLoading: true });
    }

    doSearchCall(skipHistory) {
        var searchURL = '';
        
        if (this.state.licensesSelected.length > 0) searchURL += '&license=' + encodeURIComponent(this.state.licensesSelected.toString().split(',').join('::'));
        if (this.state.sampleAvailabilitySelected.length > 0) searchURL += '&sampleavailability=' + encodeURIComponent(this.state.sampleAvailabilitySelected.toString().split(',').join('::'));
        if (this.state.keywordsSelected.length > 0) searchURL += '&keywords=' + encodeURIComponent(this.state.keywordsSelected.toString().split(',').join('::'));
        if (this.state.publishersSelected.length > 0) searchURL += '&publisher=' + encodeURIComponent(this.state.publishersSelected.toString().split(',').join('::'));
        if (this.state.ageBandsSelected.length > 0) searchURL += '&ageband=' + encodeURIComponent(this.state.ageBandsSelected.toString().split(',').join('::'));
        if (this.state.geoCoverageSelected.length > 0) searchURL += '&geographiccover=' + encodeURIComponent(this.state.geoCoverageSelected.toString().split(',').join('::'));

        if (this.state.toolCategoriesSelected.length > 0) searchURL += '&toolcategories=' + encodeURIComponent(this.state.toolCategoriesSelected.toString().split(',').join('::'));
        if (this.state.languageSelected.length > 0) searchURL += '&programmingLanguage=' + encodeURIComponent(this.state.languageSelected.toString().split(',').join('::'));
        if (this.state.featuresSelected.length > 0) searchURL += '&features=' + encodeURIComponent(this.state.featuresSelected.toString().split(',').join('::'));
        if (this.state.toolTopicsSelected.length > 0) searchURL += '&tooltopics=' + encodeURIComponent(this.state.toolTopicsSelected.toString().split(',').join('::'));

        if (this.state.projectCategoriesSelected.length > 0) searchURL += '&projectcategories=' + encodeURIComponent(this.state.projectCategoriesSelected.toString().split(',').join('::'));
        if (this.state.projectFeaturesSelected.length > 0) searchURL += '&projectfeatures=' + encodeURIComponent(this.state.projectFeaturesSelected.toString().split(',').join('::'));
        if (this.state.projectTopicsSelected.length > 0) searchURL += '&projecttopics=' + encodeURIComponent(this.state.projectTopicsSelected.toString().split(',').join('::'));
        
        if (this.state.paperFeaturesSelected.length > 0) searchURL += '&paperfeatures=' + encodeURIComponent(this.state.paperFeaturesSelected.toString().split(',').join('::'));
        if (this.state.paperTopicsSelected.length > 0) searchURL += '&papertopics=' + encodeURIComponent(this.state.paperTopicsSelected.toString().split(',').join('::'));

        if (this.state.datasetIndex > 0) searchURL += '&datasetIndex=' + encodeURIComponent(this.state.datasetIndex);
        if (this.state.toolIndex > 0) searchURL += '&toolIndex=' + encodeURIComponent(this.state.toolIndex);
        if (this.state.projectIndex > 0) searchURL += '&projectIndex=' + encodeURIComponent(this.state.projectIndex);
        if (this.state.paperIndex > 0) searchURL += '&paperIndex=' + encodeURIComponent(this.state.paperIndex);
        if (this.state.personIndex > 0) searchURL += '&personIndex=' + encodeURIComponent(this.state.personIndex);

        if (!skipHistory) {
            if (this.state.key) {
                this.props.history.push(`${window.location.pathname}?search=${this.state.searchString}&tab=${this.state.key}` + searchURL);
            }
            else {
                this.props.history.push(`${window.location.pathname}?search=${this.state.searchString}` + searchURL);
            }
        } 
        
        
        axios.get(baseURL + '/api/v1/search?search=' + this.state.searchString + searchURL)
            .then((res) => {
                this.setState({
                    datasetData: res.data.datasetResults || [],
                    toolData: res.data.toolResults || [],
                    projectData: res.data.projectResults || [],
                    paperData: res.data.paperResults || [],
                    personData: res.data.personResults || [],
                    summary: res.data.summary || [],
                    filterOptions: res.data.filterOptions || [],
                    isLoading: false,
                    isResultsLoading: false
                });
            })
    }

    getFiltersCall () {
        axios.get(baseURL + '/api/v1/search/filter/'+this.state.searchString)
            .then((res) => {
                this.setState({
                    allFilters: res.data.allFilters || []
                });
            })
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString });
    }

    handleSelect = (key) => {
        this.setState({ key: key });
        var values = queryString.parse(window.location.search);
        values.tab = key;
        this.props.history.push(window.location.pathname + '?' + queryString.stringify(values))
    }

    handlePagination = async (type, page) => {
        if (type === 'dataset') {
            await Promise.all([
                this.setState({ datasetIndex: page })
            ])
        }
        else if (type === 'tool') {
            await Promise.all([
                this.setState({ toolIndex: page })
            ])
        }
        else if (type === 'project') {
            await Promise.all([
                this.setState({ projectIndex: page })
            ])
        }
        else if (type === 'paper') {
            await Promise.all([
                this.setState({ paperIndex: page })
            ])
        }
        else if (type === 'person') {
            await Promise.all([
                this.setState({ personIndex: page })
            ])
        }
        this.doSearchCall()
    }

    render() {
        const { 
            summary, 
            searchString, 
            datasetData, 
            toolData, 
            projectData, 
            paperData, 
            personData, 
            filterOptions, 
            allFilters,
            userState, 
            isLoading, 
            isResultsLoading,
            
            publishersSelected, 
            licensesSelected, 
            geoCoverageSelected, 
            sampleAvailabilitySelected, 
            keywordsSelected, 

            languageSelected, 
            toolTopicsSelected, 
            toolCategoriesSelected, 
            featuresSelected, 
            
            projectTopicsSelected, 
            projectFeaturesSelected,
            projectCategoriesSelected, 
            
            paperFeaturesSelected, 
            paperTopicsSelected, 
            
            datasetIndex, 
            toolIndex, 
            projectIndex, 
            paperIndex, 
            personIndex 
        } = this.state;

        var { key } = this.state;
        
        if (isLoading) {
            return <Container><Loading /></Container>;
        }

        var datasetCount = summary.datasets || 0;
        var toolCount = summary.tools || 0;
        var projectCount = summary.projects || 0;
        var paperCount = summary.papers || 0;
        var personCount = summary.persons || 0;

        if (key === '' || typeof key === "undefined") {
            if (datasetCount > 0) {
                key = 'Datasets'
            }
            else if (toolCount > 0) {
                key = 'Tools'
            }
            else if (projectCount > 0) {
                key = 'Projects'
            }
            else if (paperCount > 0) {
                key = 'Papers'
            }
            else if (personCount > 0) {
                key = 'People'
            }
            else {
                key = 'Datasets'
            }
        }

        let datasetPaginationItems = [];
        let toolPaginationItems = [];
        let projectPaginationItems = [];
        let paperPaginationItems = [];
        let personPaginationItems = [];
        var maxResult = 40;
        for (let i = 1; i <= Math.ceil(datasetCount / maxResult); i++) {
            datasetPaginationItems.push(
                <Pagination.Item key={i} active={i === (datasetIndex/maxResult)+1} onClick={() => this.handlePagination("dataset", ((i-1)*(maxResult)))}>{i}</Pagination.Item>,
            );
        }
        for (let i = 1; i <= Math.ceil(toolCount / maxResult); i++) {
            toolPaginationItems.push(
                <Pagination.Item key={i} active={i === (toolIndex/maxResult)+1} onClick={() => this.handlePagination("tool", ((i-1)*(maxResult)))}>{i}</Pagination.Item>,
            );
        }
        for (let i = 1; i <= Math.ceil(projectCount / maxResult); i++) {
            projectPaginationItems.push(
                <Pagination.Item key={i} active={i === (projectIndex/maxResult)+1} onClick={() => this.handlePagination("project", ((i-1)*(maxResult)))}>{i}</Pagination.Item>,
            );
        }
        for (let i = 1; i <= Math.ceil(paperCount / maxResult); i++) {
            paperPaginationItems.push(
                <Pagination.Item key={i} active={i === (paperIndex/maxResult)+1} onClick={() => this.handlePagination("paper", ((i-1)*(maxResult)))}>{i}</Pagination.Item>,
            );
        }
        for (let i = 1; i <= Math.ceil(personCount / maxResult); i++) {
            personPaginationItems.push(
                <Pagination.Item key={i} active={i === (personIndex/maxResult)+1} onClick={() => this.handlePagination("person", ((i-1)*(maxResult)))}>{i}</Pagination.Item>,
            );
        }

        return (
            <div>

                <SearchBar searchString={searchString} doSearchMethod={this.doSearch} onClearMethod={this.doClear} doUpdateSearchString={this.updateSearchString} userState={userState} />

                <div className="searchTabsHolder">
                        <div>
                            <Tabs className='tabsBackground gray700-13' activeKey={key} onSelect={this.handleSelect}>
                                <Tab eventKey="Datasets" title={'Datasets (' + datasetCount + ')'} />
                                <Tab eventKey="Tools" title={'Tools (' + toolCount + ')'} />
                                <Tab eventKey="Projects" title={'Projects (' + projectCount + ')'} />
                                <Tab eventKey="Papers" title={'Papers (' + paperCount + ')'} />
                                <Tab eventKey="People" title={'People (' + personCount + ')'}>
                                    {personCount <= 0 && !isResultsLoading ? <NoResults type='profiles' searchString={searchString} /> : ''}
                                </Tab>
                            </Tabs>
                        </div>
                </div>

                <Container>
                    <Row>
                        {key !== 'People' ?
                            <Col sm={12} md={12} lg={3} className="mt-4">
                                {key === 'Datasets' ? <>
                                    <div className="filterHolder">


                                        {publishersSelected.length !== 0 || licensesSelected.length !== 0 || keywordsSelected.length !== 0 || geoCoverageSelected.length !== 0 || sampleAvailabilitySelected.length !== 0 ? 
                                            <div className="filterCard mb-2">
                                                <Row>
                                                    <Col className="mb-2">
                                                        <div className="inlineBlock">
                                                            <div className="gray500-13">Showing:</div>
                                                        </div>
                                                        <div className="floatRight">
                                                            <div className="purple-13 pointer" onClick={() => this.clearFilter('All')}>Clear all</div>
                                                        </div>
                                                    </Col>
                                                </Row> 
                                                
                                                {!publishersSelected || publishersSelected.length <= 0 ? '' : publishersSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'publishersSelected')}>X</span></div>
                                                })}

                                                {!licensesSelected || licensesSelected.length <= 0 ? '' : licensesSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'licensesSelected')}>X</span></div>
                                                })}

                                                {!keywordsSelected || keywordsSelected.length <= 0 ? '' : keywordsSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'keywordsSelected')}>X</span></div>
                                                })}

                                                {!geoCoverageSelected || geoCoverageSelected.length <= 0 ? '' : geoCoverageSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'geoCoverageSelected')}>X</span></div>
                                                })}

                                                {!sampleAvailabilitySelected || sampleAvailabilitySelected.length <= 0 ? '' : sampleAvailabilitySelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'sampleAvailabilitySelected')}>X</span></div>
                                                })}
                                            </div> 
                                        : ''}
                                        <Filters data={filterOptions.publisherFilterOptions} allFilters={allFilters.publisherFilter} updateOnFilter={this.updateOnFilter} selected={publishersSelected} title="Publisher" />
                                        <Filters data={filterOptions.licenseFilterOptions} allFilters={allFilters.licenseFilter} updateOnFilter={this.updateOnFilter} selected={licensesSelected} title="License" />
                                        <Filters data={filterOptions.datasetFeaturesFilterOptions} allFilters={allFilters.datasetFeatureFilter} updateOnFilter={this.updateOnFilter} selected={keywordsSelected} title="Keywords" />
                                        <Filters data={filterOptions.geographicCoverageFilterOptions} allFilters={allFilters.geographicCoverageFilter} updateOnFilter={this.updateOnFilter} selected={geoCoverageSelected} title="Geographic coverage" />
                                        <Filters data={filterOptions.sampleFilterOptions} allFilters={allFilters.sampleFilter} updateOnFilter={this.updateOnFilter} selected={sampleAvailabilitySelected} title="Physical sample availability" /> 
                                        {/* <Filters data={filterOptions.ageBandFilterOptions} updateOnFilter={this.updateOnFilter} selected={ageBandsSelected} title="Age Bands" /> */}
                                    </div>
                                </> : ''}
                                
                                
                                
                                
                                
                                {key === 'Tools' ? <>
                                    <div className="filterHolder">
                                        {toolCategoriesSelected.length !== 0 || languageSelected.length !== 0 || featuresSelected.length !== 0 || toolTopicsSelected.length !== 0 ? 
                                            <div className="filterCard mb-2">
                                                <Row>
                                                    <Col className="mb-2">
                                                        <div className="inlineBlock">
                                                            <div className="gray500-13">Showing:</div>
                                                        </div>
                                                        <div className="floatRight">
                                                            <div className="purple-13 pointer" onClick={() => this.clearFilter('All')}>Clear all</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                
                                                {!toolCategoriesSelected || toolCategoriesSelected.length <= 0 ? '' : toolCategoriesSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'toolCategoriesSelected')}>X</span></div>
                                                })}

                                                {!languageSelected || languageSelected.length <= 0 ? '' : languageSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'languageSelected')}>X</span></div>
                                                })}

                                                {!featuresSelected || featuresSelected.length <= 0 ? '' : featuresSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'featuresSelected')}>X</span></div>
                                                })}

                                                {!toolTopicsSelected || toolTopicsSelected.length <= 0 ? '' : toolTopicsSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'toolTopicsSelected')}>X</span></div>
                                                })}
                                            </div> 
                                        : ''}
                                        <Filters data={filterOptions.toolCategoriesFilterOptions} allFilters={allFilters.toolCategoryFilter} updateOnFilter={this.updateOnFilter} selected={toolCategoriesSelected} title="Type" />
                                        <Filters data={filterOptions.programmingLanguageFilterOptions} allFilters={allFilters.toolLanguageFilter} updateOnFilter={this.updateOnFilter} selected={languageSelected} title="Programming language" />
                                        <Filters data={filterOptions.featuresFilterOptions} allFilters={allFilters.toolFeatureFilter} updateOnFilter={this.updateOnFilter} selected={featuresSelected} title="Keywords" />
                                        <Filters data={filterOptions.toolTopicsFilterOptions} allFilters={allFilters.toolTopicFilter} updateOnFilter={this.updateOnFilter} selected={toolTopicsSelected} title="Domain" />
                                    </div>
                                </> : ''}

                                {key === 'Projects' ? <>
                                    <div className="filterHolder">
                                        {projectCategoriesSelected.length !== 0 || projectFeaturesSelected.length !== 0 || projectTopicsSelected.length !== 0 ? 
                                            <div className="filterCard mb-2">
                                                <Row>
                                                    <Col className="mb-2">
                                                        <div className="inlineBlock">
                                                            <div className="gray500-13">Showing:</div>
                                                        </div>
                                                        <div className="floatRight">
                                                            <div className="purple-13 pointer" onClick={() => this.clearFilter('All')}>Clear all</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                
                                                {!projectCategoriesSelected || projectCategoriesSelected.length <= 0 ? '' : projectCategoriesSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'projectCategoriesSelected')}>X</span></div>
                                                })}

                                                {!projectFeaturesSelected || projectFeaturesSelected.length <= 0 ? '' : projectFeaturesSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'projectFeaturesSelected')}>X</span></div>
                                                })}

                                                {!projectTopicsSelected || projectTopicsSelected.length <= 0 ? '' : projectTopicsSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'projectTopicsSelected')}>X</span></div>
                                                })}
                                            </div> 
                                        : ''}
                                        <Filters data={filterOptions.projectCategoriesFilterOptions} allFilters={allFilters.projectCategoryFilter} updateOnFilter={this.updateOnFilter} selected={projectCategoriesSelected} title="Type" />
                                        <Filters data={filterOptions.projectFeaturesFilterOptions} allFilters={allFilters.projectFeatureFilter} updateOnFilter={this.updateOnFilter} selected={projectFeaturesSelected} title="Keywords" />
                                        <Filters data={filterOptions.projectTopicsFilterOptions} allFilters={allFilters.projectTopicFilter} updateOnFilter={this.updateOnFilter} selected={projectTopicsSelected} title="Domain" />
                                    </div>
                                </> : ''}

                                {key === 'Papers' ? <>
                                    <div className="filterHolder">
                                        {paperFeaturesSelected.length !== 0 || paperTopicsSelected.length !== 0 ? 
                                            <div className="filterCard mb-2">
                                                <Row>
                                                    <Col className="mb-2">
                                                        <div className="inlineBlock">
                                                            <div className="gray500-13">Showing:</div>
                                                        </div>
                                                        <div className="floatRight">
                                                            <div className="purple-13 pointer" onClick={() => this.clearFilter('All')}>Clear all</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                
                                                {!paperFeaturesSelected || paperFeaturesSelected.length <= 0 ? '' : paperFeaturesSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'paperFeaturesSelected')}>X</span></div>
                                                })}

                                                {!paperTopicsSelected || paperTopicsSelected.length <= 0 ? '' : paperTopicsSelected.map((selected) => {
                                                    return <div className="badge-tag">{selected.substr(0, 80)} {selected.length > 80 ? '...' : ''} <span className="gray800-14-opacity pointer" onClick={() => this.clearFilter(selected, 'paperTopicsSelected')}>X</span></div>
                                                })}
                                            </div> 
                                        : ''}
                                        <Filters data={filterOptions.paperFeaturesFilterOptions} allFilters={allFilters.paperFeatureFilter} updateOnFilter={this.updateOnFilter} selected={paperFeaturesSelected} title="Keywords" />
                                        <Filters data={filterOptions.paperTopicsFilterOptions} allFilters={allFilters.paperTopicFilter} updateOnFilter={this.updateOnFilter} selected={paperTopicsSelected} title="Domain" />
                                    </div>
                                </> : ''}
                            </Col>
                            : <Col sm={12} md={12} lg={3} />}

                        {!isResultsLoading ?
                            <Col sm={12} md={12} lg={9} className="mt-4">
                                
                                {key === 'Datasets' ?
                                    datasetCount <= 0 && !isResultsLoading ? <NoResults type='datasets' searchString={searchString} />
                                    : datasetData.map((dataset) => {
                                        return <RelatedObject key={dataset.id} data={dataset} activeLink={true} />
                                    })
                                    : ''}

                                {key === 'Tools' ?
                                    toolCount <= 0 && !isResultsLoading ? <NoResults type='tools' searchString={searchString} />
                                    : toolData.map((tool) => {
                                        return <RelatedObject key={tool.id} data={tool} activeLink={true} />;
                                    })
                                    : ''}

                                {key === 'Projects' ?
                                    projectCount <= 0 && !isResultsLoading ? <NoResults type='projects' searchString={searchString} />
                                    : projectData.map((project) => {
                                        return <RelatedObject key={project.id} data={project} activeLink={true}/>
                                    })
                                    : ''}
                                
                                {key === 'Papers' ?
                                    paperCount <= 0 && !isResultsLoading ? <NoResults type='papers' searchString={searchString} />
                                    : paperData.map((paper) => {
                                        return <RelatedObject key={paper.id} data={paper} activeLink={true}/>
                                    })
                                    : ''}

                                {key === 'People' ?
                                    personData.map((person) => {
                                        return <RelatedObject key={person.id} data={person} activeLink={true} />
                                    })
                                    : ''}

                                <div className='text-center'>
                                {key === 'Datasets' && datasetCount > maxResult ?
                                    <Pagination>
                                        {datasetPaginationItems}
                                    </Pagination>
                                    : ''}

                                {key === 'Tools' && toolCount > maxResult ?
                                    <Pagination>
                                        {toolPaginationItems}
                                    </Pagination>
                                    : ''}

                                {key === 'Projects' && projectCount > maxResult ?
                                    <Pagination>
                                        {projectPaginationItems}
                                    </Pagination>
                                    : ''}

                                {key === 'Papers' && paperCount > maxResult ?
                                    <Pagination>
                                        {paperPaginationItems}
                                    </Pagination>
                                    : ''}

                                {key === 'People' && personCount > maxResult ?
                                    <Pagination>
                                        {personPaginationItems}
                                    </Pagination>
                                    : ''}
                                    </div>
                            </Col>
                        : <Col sm={12} md={12} lg={9}><Loading /></Col>
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SearchPage;
