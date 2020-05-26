import React from 'react';
import axios from 'axios';
import { PageView, initGA } from '../../tracking';
import queryString from 'query-string';

import { Container, Row, Col, Tabs, Tab, Pagination } from 'react-bootstrap';

import SearchBar from '../commonComponents/SearchBar';
import Project from '../commonComponents/Project';
import Tool from '../commonComponents/Tool';
import Person from '../commonComponents/Person';
import DataSet from '../commonComponents/DataSet';
import Loading from '../commonComponents/Loading'
import KeywordsFilter from './KeywordsFilter';
import ProgrammingLanguageFilter from './ProgrammingLanguageFilter';
import CategoryFilterTool from './CategoryFilterTool';
import CategoryFilterProject from './CategoryFilterProject';
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

var baseURL = require('../commonComponents/BaseURL').getURL();

class SearchPage extends React.Component {

    state = {
        searchString: null,
        datasetIndex: 0,
        toolIndex: 0,
        projectIndex: 0,
        personIndex: 0,
        datasetData: [],
        toolData: [],
        projectData: [],
        personData: [],
        filterOptions: [],
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
        projectTopicsSelected: [],
        summary: [],
        key: '',
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

    async componentDidMount() { //fires on first time in or page is refreshed/url loaded
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);

            await Promise.all([
                this.updateFilterStates(values)
            ])

            this.doSearchCall();
            initGA('UA-166025838-1');
            PageView();
        }
        else {
            this.setState({ data: [], searchString: '', isLoading: true });
            this.doSearchCall();
            initGA('UA-166025838-1');
            PageView();
        }
    }

    async componentWillReceiveProps() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);

            if (values.search !== this.state.searchString
                || ((typeof values.license === "undefined" && this.state.licensesSelected.length !== 0) || (typeof values.license !== "undefined" && this.state.licensesSelected.length === 0)) && !this.state.licensesSelected.includes(values.license)
                || ((typeof values.sampleavailability === "undefined" && this.state.sampleAvailabilitySelected.length !== 0) || (typeof values.sampleavailability !== "undefined" && this.state.sampleAvailabilitySelected.length === 0)) && !this.state.sampleAvailabilitySelected.includes(values.sampleavailability)
                || ((typeof values.keywords === "undefined" && this.state.keywordsSelected.length !== 0) || (typeof values.keywords !== "undefined" && this.state.keywordsSelected.length === 0)) && !this.state.keywordsSelected.includes(values.keywords)
                || ((typeof values.publisher === "undefined" && this.state.publishersSelected.length !== 0) || (typeof values.publisher !== "undefined" && this.state.publishersSelected.length === 0)) && !this.state.publishersSelected.includes(values.publisher)
                || ((typeof values.ageband === "undefined" && this.state.ageBandsSelected.length !== 0) || (typeof values.ageband !== "undefined" && this.state.ageBandsSelected.length === 0)) && !this.state.ageBandsSelected.includes(values.ageband)
                || ((typeof values.geographiccover === "undefined" && this.state.geoCoverageSelected.length !== 0) || (typeof values.geographiccover !== "undefined" && this.state.geoCoverageSelected.length === 0)) && !this.state.geoCoverageSelected.includes(values.geographiccover)
                || ((typeof values.toolcategories === "undefined" && this.state.toolCategoriesSelected.length !== 0) || (typeof values.toolcategories !== "undefined" && this.state.toolCategoriesSelected.length === 0)) && !this.state.toolCategoriesSelected.includes(values.toolcategories)
                || ((typeof values.programmingLanguage === "undefined" && this.state.languageSelected.length !== 0) || (typeof values.programmingLanguage !== "undefined" && this.state.languageSelected.length === 0)) && !this.state.languageSelected.includes(values.programmingLanguage)
                || ((typeof values.features === "undefined" && this.state.featuresSelected.length !== 0) || (typeof values.features !== "undefined" && this.state.featuresSelected.length === 0)) && !this.state.featuresSelected.includes(values.features)
                || ((typeof values.tooltopics === "undefined" && this.state.toolTopicsSelected.length !== 0) || (typeof values.tooltopics !== "undefined" && this.state.toolTopicsSelected.length === 0)) && !this.state.toolTopicsSelected.includes(values.tooltopics)
                || ((typeof values.projectcategories === "undefined" && this.state.projectCategoriesSelected.length !== 0) || (typeof values.projectcategories !== "undefined" && this.state.projectCategoriesSelected.length === 0)) && !this.state.projectCategoriesSelected.includes(values.projectcategories)
                || ((typeof values.projecttopics === "undefined" && this.state.projectTopicsSelected.length !== 0) || (typeof values.projecttopics !== "undefined" && this.state.projectTopicsSelected.length === 0)) && !this.state.projectTopicsSelected.includes(values.projecttopics)
                || ((typeof values.datasetIndex === "undefined" && this.state.datasetIndex !== 0) || (typeof values.datasetIndex !== "undefined" && this.state.datasetIndex === 0)) && this.state.datasetIndex !== values.datasetIndex
                || ((typeof values.toolIndex === "undefined" && this.state.toolIndex !== 0) || (typeof values.toolIndex !== "undefined" && this.state.toolIndex === 0)) && this.state.toolIndex !== values.toolIndex
                || ((typeof values.projectIndex === "undefined" && this.state.projectIndex !== 0) || (typeof values.projectIndex !== "undefined" && this.state.projectIndex === 0)) && this.state.projectIndex !== values.projectIndex
                || ((typeof values.personIndex === "undefined" && this.state.personIndex !== 0) || (typeof values.personIndex !== "undefined" && this.state.personIndex === 0)) && this.state.personIndex !== values.personIndex
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
            await Promise.all([
                this.clearFilterStates()
            ])

            if (!!this.state.searchString) {
                this.doSearchCall();
            }
        }
    }

    updateFilterStates(values) {
        values.search ? this.setState({ searchString: values.search }) : this.setState({ searchString: '' })
        values.license ? this.setState({ licensesSelected: [values.license] }) : this.setState({ licensesSelected: [] })
        values.sampleavailability ? this.setState({ sampleAvailabilitySelected: [values.sampleavailability] }) : this.setState({ sampleAvailabilitySelected: [] })
        values.keywords ? this.setState({ keywordsSelected: [values.keywords] }) : this.setState({ keywordsSelected: [] })
        values.publisher ? this.setState({ publishersSelected: [values.publisher] }) : this.setState({ publishersSelected: [] })
        values.ageband ? this.setState({ ageBandsSelected: [values.ageband] }) : this.setState({ ageBandsSelected: [] })
        values.geographiccover ? this.setState({ geoCoverageSelected: [values.geographiccover] }) : this.setState({ geoCoverageSelected: [] })

        values.toolcategories ? this.setState({ toolCategoriesSelected: [values.toolcategories] }) : this.setState({ toolCategoriesSelected: [] })
        values.programmingLanguage ? this.setState({ languageSelected: [values.programmingLanguage] }) : this.setState({ languageSelected: [] })
        values.features ? this.setState({ featuresSelected: [values.features] }) : this.setState({ featuresSelected: [] })
        values.tooltopics ? this.setState({ toolTopicsSelected: [values.tooltopics] }) : this.setState({ toolTopicsSelected: [] })

        values.projectcategories ? this.setState({ projectCategoriesSelected: [values.projectcategories] }) : this.setState({ projectCategoriesSelected: [] })
        values.projecttopics ? this.setState({ projectTopicsSelected: [values.projecttopics] }) : this.setState({ projectTopicsSelected: [] })

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
        this.setState({ projectTopicsSelected: [] })

        this.setState({ key: "" })
        this.setState({ datasetIndex: 0 })
        this.setState({ toolIndex: 0 })
        this.setState({ projectIndex: 0 })
        this.setState({ personIndex: 0 })
    }

    updateOnFilter = () => {
        this.doSearchCall();
    }

    doSearchCall(skipHistory) {
        var searchURL = '';

        if (this.state.licensesSelected.length > 0) searchURL += '&license=' + this.state.licensesSelected;
        if (this.state.sampleAvailabilitySelected.length > 0) searchURL += '&sampleavailability=' + this.state.sampleAvailabilitySelected;
        if (this.state.keywordsSelected.length > 0) searchURL += '&keywords=' + this.state.keywordsSelected;
        if (this.state.publishersSelected.length > 0) searchURL += '&publisher=' + this.state.publishersSelected;
        if (this.state.ageBandsSelected.length > 0) searchURL += '&ageband=' + this.state.ageBandsSelected;
        if (this.state.geoCoverageSelected.length > 0) searchURL += '&geographiccover=' + this.state.geoCoverageSelected;

        if (this.state.toolCategoriesSelected.length > 0) searchURL += '&toolcategories=' + this.state.toolCategoriesSelected;
        if (this.state.languageSelected.length > 0) searchURL += '&programmingLanguage=' + this.state.languageSelected;
        if (this.state.featuresSelected.length > 0) searchURL += '&features=' + this.state.featuresSelected;
        if (this.state.toolTopicsSelected.length > 0) searchURL += '&tooltopics=' + this.state.toolTopicsSelected;

        if (this.state.projectCategoriesSelected.length > 0) searchURL += '&projectcategories=' + this.state.projectCategoriesSelected;
        if (this.state.projectTopicsSelected.length > 0) searchURL += '&projecttopics=' + this.state.projectTopicsSelected;

        if (this.state.datasetIndex > 0) searchURL += '&datasetIndex=' + this.state.datasetIndex;
        if (this.state.toolIndex > 0) searchURL += '&toolIndex=' + this.state.toolIndex;
        if (this.state.projectIndex > 0) searchURL += '&projectIndex=' + this.state.projectIndex;
        if (this.state.personIndex > 0) searchURL += '&personIndex=' + this.state.personIndex;

        if (queryString.parse(window.location.search).showLogin) {
            searchURL += '&showLoginOnce=true';
        }

        if (!skipHistory) {
            if (this.state.key) {
                this.props.history.push(`${window.location.pathname}?search=${this.state.searchString}&tab=${this.state.key}` + searchURL);
            }
            else {
                this.props.history.push(`${window.location.pathname}?search=${this.state.searchString}` + searchURL);
            }
        }
        
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/search?search=' + this.state.searchString + searchURL)
            .then((res) => {
                this.setState({
                    datasetData: res.data.datasetResults || [],
                    toolData: res.data.toolResults || [],
                    projectData: res.data.projectResults || [],
                    personData: res.data.personResults || [],
                    summary: res.data.summary || [],
                    filterOptions: res.data.filterOptions || [],
                    isLoading: false
                });
            })
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString });
    }

    handleSelect = (key) => {
        this.setState({ key: key });
        var values = queryString.parse(window.location.search);
        if(!!values.showLoginOnce) values.showLoginOnce = false 
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
        else if (type === 'person') {
            await Promise.all([
                this.setState({ personIndex: page })
            ])
        }
        this.doSearchCall()
    }

    render() {
        const { summary, searchString, datasetData, toolData, projectData, personData, filterOptions, userState, isLoading, languageSelected, toolTopicsSelected, toolCategoriesSelected, featuresSelected, projectTopicsSelected, projectCategoriesSelected, publishersSelected, licensesSelected, geoCoverageSelected, sampleAvailabilitySelected, keywordsSelected, ageBandsSelected, datasetIndex, toolIndex, projectIndex, personIndex } = this.state;
        var { key } = this.state;
        if (isLoading) {
            return <Container><Loading /></Container>;
        }

        var datasetCount = summary.datasets || 0;
        var toolCount = summary.tools || 0;
        var projectCount = summary.projects || 0;
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
        for (let i = 1; i <= Math.ceil(personCount / maxResult); i++) {
            personPaginationItems.push(
                <Pagination.Item key={i} active={i === (personIndex/maxResult)+1} onClick={() => this.handlePagination("person", ((i-1)*(maxResult)))}>{i}</Pagination.Item>,
            );
        }

        return (
            <div>

                <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />

                <Row className="SearchTabsHolder">
                    <Col>
                        <div>
                            <Tabs className='TabsBackground Gray700-13px' activeKey={key} onSelect={this.handleSelect}>
                                <Tab eventKey="Datasets" title={'Datasets (' + datasetCount + ')'}>
                                    {datasetCount <= 0 ? <NoResultsDatasets searchString={searchString} /> : ''}
                                </Tab>
                                <Tab eventKey="Tools" title={'Tools (' + toolCount + ')'}>
                                    {toolCount <= 0 ? <NoResultsTool searchString={searchString} /> : ''}
                                </Tab>
                                <Tab eventKey="Projects" title={'Projects (' + projectCount + ')'}>
                                    {projectCount <= 0 ? <NoResultsProjects searchString={searchString} /> : ''}
                                </Tab>
                                <Tab eventKey="People" title={'People (' + personCount + ')'}>
                                    {personCount <= 0 ? <NoResultsPeople searchString={searchString} /> : ''}
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                </Row>

                <Container>
                    <Row>
                        {key === 'Tools' || key === 'Projects' || key === 'Datasets' ?
                            <Col sm={12} md={12} lg={3}>
                                {key === 'Datasets' ? <DatasetFilterLicense licenseData={filterOptions.licenseFilterOptions} updateOnFilter={this.updateOnFilter} licensesSelected={licensesSelected} /> : ''}
                                {key === 'Datasets' ? <DatasetFilterSampleAvailability physicalSampleAvailabilityData={filterOptions.sampleFilterOptions} updateOnFilter={this.updateOnFilter} sampleAvailabilitySelected={sampleAvailabilitySelected} /> : ''}
                                {key === 'Datasets' ? <DatasetFilterKeywords keywordsData={filterOptions.keywordsFilterOptions} updateOnFilter={this.updateOnFilter} keywordsSelected={keywordsSelected} /> : ''}
                                {key === 'Datasets' ? <DatasetFilterPublisher publisherData={filterOptions.publisherFilterOptions} updateOnFilter={this.updateOnFilter} publishersSelected={publishersSelected} /> : ''}
                                {key === 'Datasets' ? <DatasetFilterAgeBand ageBandData={filterOptions.ageBandFilterOptions} updateOnFilter={this.updateOnFilter} ageBandsSelected={ageBandsSelected} /> : ''}
                                {key === 'Datasets' ? <DatasetFilterGeoCoverage geographicCoverageData={filterOptions.geographicCoverageFilterOptions} updateOnFilter={this.updateOnFilter} geoCoverageSelected={geoCoverageSelected} /> : ''}

                                {key === 'Tools' ? <CategoryFilterTool toolCategoriesData={filterOptions.toolCategoriesFilterOptions} updateOnFilter={this.updateOnFilter} toolCategoriesSelected={toolCategoriesSelected} /> : ''}
                                {key === 'Tools' ? <ProgrammingLanguageFilter languagesData={filterOptions.programmingLanguageFilterOptions} updateOnFilter={this.updateOnFilter} languageSelected={languageSelected} /> : ''}
                                {key === 'Tools' ? <FeaturesFilter featuresData={filterOptions.featuresFilterOptions} updateOnFilter={this.updateOnFilter} featuresSelected={featuresSelected} /> : ''}
                                {key === 'Tools' ? <TopicsFilter toolTopicData={filterOptions.toolTopicsFilterOptions} updateOnFilter={this.updateOnFilter} toolTopicsSelected={toolTopicsSelected} /> : ''}

                                {key === 'Projects' ? <CategoryFilterProject projectCategoriesData={filterOptions.projectCategoriesFilterOptions} updateOnFilter={this.updateOnFilter} projectCategoriesSelected={projectCategoriesSelected} /> : ''}
                                {key === 'Projects' ? <KeywordsFilter projectTopicData={filterOptions.projectTopicsFilterOptions} updateOnFilter={this.updateOnFilter} projectTopicsSelected={projectTopicsSelected} /> : ''}
                            </Col>
                            : <Col sm={1} md={1} lg={1} />}

                        <Col sm={12} md={12} lg={9}>
                            {key === 'Datasets' ?
                                datasetData.map((dataset) => {
                                    return <DataSet key={dataset.id} data={dataset} />
                                })
                                : ''}

                            {key === 'Tools' ?
                                toolData.map((tool) => {
                                    return <Tool key={tool.id} data={tool} />
                                })
                                : ''}

                            {key === 'Projects' ?
                                projectData.map((project) => {
                                    return <Project key={project.id} data={project} />
                                })
                                : ''}

                            {key === 'People' ?
                                personData.map((person) => {
                                    return <Person key={person.id} data={person} />
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

                            {key === 'People' && personCount > maxResult ?
                                <Pagination>
                                    {personPaginationItems}
                                </Pagination>
                                : ''}
                                </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SearchPage;
