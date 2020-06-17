import React from 'react';
import { Row, Col, Tab, Tabs, Container, Pagination} from 'react-bootstrap';

// import NoResultsTool from '../commonComponents/NoResultsTools';
// import NoResultsProjects from '../commonComponents/NoResultsProjects';
// import NoResultsPeople from '../commonComponents/NoResultsPeople';
// import NoResultsDatasets from '../commonComponents/NoResultsDatasets';
import SimpleSearchBar from './SimpleSearchBar';
import Project from './Project';
import Tool from './Tool';
import Person from './Person';
import DataSet from './DataSet';

var baseURL = require('./BaseURL').getURL();
var cmsURL = require('./BaseURL').getCMSURL();

class RelatedResourcesModal extends React.Component {

    state = {
        userState: [{
            loggedIn: false,
            role: "Reader",
            id: null,
            name: null
        }],
        key: '',
        summary: [],
        datasetIndex: 0,
        toolIndex: 0,
        projectIndex: 0,
        personIndex: 0,
        relatedObjectIds: []
    }

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
        this.state.relatedObjectIds = props.relatedObjectIds;
        // this.state.numberOfDatasets = this.props.summary.datasets;
        // this.state.summary = props.summary;
    }


    handleSelect = (key) => {
        this.setState({ key: key });
        // var values = queryString.parse(window.location.search);
        // values.tab = key;
        // this.props.history.push(window.location.pathname + '?' + queryString.stringify(values))
    }

    handlePagination = async (type, page, e) => {
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
        this.props.doSearchMethod(e, type, page)
    }

    render() {
        const { userState, datasetIndex, toolIndex, projectIndex, personIndex} = this.state;
        var { key } = this.state;


        var datasetCount = this.props.summary.datasets || 0;
        var toolCount = this.props.summary.tools || 0;
        var projectCount = this.props.summary.projects || 0;
        var personCount = this.props.summary.persons || 0;

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
                <Pagination.Item key={i} active={i === (datasetIndex/maxResult)+1} onClick={(e) => {this.handlePagination("dataset", ((i-1)*(maxResult)), "click")}}>{i}</Pagination.Item>,
            );
        } 
        for (let i = 1; i <= Math.ceil(toolCount / maxResult); i++) {
            toolPaginationItems.push(
                <Pagination.Item key={i} active={i === (toolIndex/maxResult)+1} onClick={(e) => {this.handlePagination("tool", ((i-1)*(maxResult)), "click")}}>{i}</Pagination.Item>,
            );
        }
        for (let i = 1; i <= Math.ceil(projectCount / maxResult); i++) {
            projectPaginationItems.push(
                <Pagination.Item key={i} active={i === (projectIndex/maxResult)+1} onClick={(e) => {this.handlePagination("project", ((i-1)*(maxResult)), "click")}}>{i}</Pagination.Item>,
            );
        }
        for (let i = 1; i <= Math.ceil(personCount / maxResult); i++) {
            personPaginationItems.push(
                <Pagination.Item key={i} active={i === (personIndex/maxResult)+1} onClick={(e) => {this.handlePagination("person", ((i-1)*(maxResult)), "click")}}>{i}</Pagination.Item>,
            );
        }

        return (
            <div>
            <SimpleSearchBar searchString={this.props.searchString} doSearchMethod={this.props.doSearchMethod} doUpdateSearchString={this.props.doUpdateSearchString} userState={this.props.userState} />
                {typeof this.props.summary.datasets !== 'undefined' ? 
                    <Row className="SearchTabsHolder">
                    <Col>
                        <div>
                            <Tabs className='TabsBackground Gray700-13px' activeKey={key} onSelect={this.handleSelect} >
                                <Tab eventKey="Datasets" title={'Datasets (' + (this.props.summary.datasets - this.props.selected.datasets) + ')'} >
                                    {/* {this.props.summary.datasets <= 0 ? <NoResultsDatasets searchString={this.props.searchString} /> : ''} */}
                                </Tab>
                                <Tab eventKey="Tools" title={'Tools (' + (this.props.summary.tools - this.props.selected.tools) + ')'}>
                                    {/* {this.props.summary.tools <= 0 ? <NoResultsTool searchString={this.props.searchString} /> : ''} */}
                                </Tab>
                                <Tab eventKey="Projects" title={'Projects (' + (this.props.summary.projects - this.props.selected.projects) + ')'}>
                                    {/* {this.props.summary.projects <= 0 ? <NoResultsProjects searchString={this.props.searchString} /> : ''} */}
                                </Tab>
                                <Tab eventKey="People" title={'People (' + (this.props.summary.persons - this.props.selected.persons) + ')'}>
                                    {/* {this.props.summary.persons <= 0 ? <NoResultsPeople searchString={this.props.searchString} /> : ''} */}
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                </Row> 
             : ''}

            <div className={typeof this.props.summary.datasets==='undefined' ? "" : "RelatedModalBackground"} > 
                <Container >
                    <Row>
                        <Col sm={1} lg={1} />  
                        <Col sm={10} lg={10} className="mt-2" >
                            {key === 'Datasets' ?
                                this.props.datasetData.map((dataset) => {
                                    if(this.props.relatedObjectIds.includes(dataset.id)){
                                        return ''
                                    }
                                    else {
                                       return <DataSet key={dataset.id} data={dataset} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds} />  
                                    }
                                })
                                : ''}

                            {key === 'Tools' ?
                                this.props.toolData.map((tool) => {
                                    // return <Tool key={tool.id} data={tool} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds} /> 
                                
                                    if(this.props.relatedObjectIds.includes(tool.id)){
                                        return ''
                                    }
                                    else {
                                       return <Tool key={tool.id} data={tool} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds} /> 
                                    }
                                })
                                : ''}

                           {key === 'Projects' ?
                                this.props.projectData.map((project) => {
                                     if(this.props.relatedObjectIds.includes(project.id)){
                                         return ''
                                     }
                                     else {
                                        return <Project key={project.id} data={project} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds} />
                                     }
                                })
                                : ''}

                              {key === 'People' ?
                                this.props.personData.map((person) => {
                                    // return <Person key={person.id} data={person} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds} />
                               
                                    if(this.props.relatedObjectIds.includes(person.id)){
                                        return ''
                                    }
                                    else {
                                       return <Person key={person.id} data={person} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds} />
                                    }
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
                        <Col sm={2} lg={2} />
                    </Row>
                </Container>
            </div>

            </div>
        )
    }
}

export default RelatedResourcesModal;