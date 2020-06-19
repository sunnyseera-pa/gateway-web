import React from 'react';
import { Row, Col, Tab, Tabs, Container, Pagination} from 'react-bootstrap';

import SimpleSearchBar from './SimpleSearchBar';
import RelatedObject from '../commonComponents/RelatedObject';

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
        paperIndex: 0,
        personIndex: 0,
        relatedObjectIds: [],
        relatedObjects: [],
        selected:{
            datasets:0,
            tools:0,
            projects:0,
            persons:0
       }

    }

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
        this.state.relatedObjects = props.relatedObjects;
        this.state.relatedObjectIds = [];
        this.state.selected.datasets = 0;
        this.state.selected.tools = 0;
        this.state.selected.projects = 0;
        this.state.selected.persons = 0;

       if(props.relatedObjects) {
            props.relatedObjects.map((object) => {

                this.state.relatedObjectIds.push(object.objectId) 
                
                switch (object.objectType) {
                    case 'tool':
                            {this.state.selected.tools++}
                        break;
                    case 'project':
                            {this.state.selected.projects++}
                        break;
                    case 'person':
                            {this.state.selected.persons++}
                        break;
                    case 'dataset':
                            {this.state.selected.datasets++}
                        break;
                }
            })
        }
    }


    handleSelect = (key) => {
        this.setState({ key: key });
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
        this.props.doSearchMethod(e, type, page)
    }

    render() {
        const { userState, datasetIndex, toolIndex, projectIndex, paperIndex, personIndex} = this.state;
        var { key } = this.state;

        var datasetCount = this.props.summary.datasets || 0;
        var toolCount = this.props.summary.tools || 0;
        var projectCount = this.props.summary.projects || 0;
        var paperCount = this.props.summary.papers || 0;
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
        for (let i = 1; i <= Math.ceil(paperCount / maxResult); i++) {
            paperPaginationItems.push(
                <Pagination.Item key={i} active={i === (paperIndex/maxResult)+1} onClick={(e) => {this.handlePagination("paper", ((i-1)*(maxResult)), "click")}}>{i}</Pagination.Item>,
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
                                <Tab eventKey="Datasets" title={'Datasets (' + (this.props.summary.datasets - this.state.selected.datasets) + ')'} />
                                <Tab eventKey="Tools" title={'Tools (' + (this.props.summary.tools - this.state.selected.tools) + ')'} />
                                <Tab eventKey="Projects" title={'Projects (' + (this.props.summary.projects - this.state.selected.projects) + ')'} />
                                <Tab eventKey="Papers" title={'Papers (' + (this.props.summary.papers - this.state.selected.papers) + ')'} />
                                <Tab eventKey="People" title={'People (' + (this.props.summary.persons - this.state.selected.persons) + ')'} />
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
                                    if(this.state.relatedObjectIds.includes(dataset.id)){
                                        return ''
                                    }
                                    else {
                                       return <RelatedObject key={dataset.id} data={dataset} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds}/>
                                    }
                                })
                                : ''}

                            {key === 'Tools' ?
                                this.props.toolData.map((tool) => {
                                    if(this.state.relatedObjectIds.includes(tool.id) || this.state.relatedObjectIds.includes(JSON.stringify(tool.id)) || tool.id === this.props.toolid){          
                                        return ''
                                    }
                                    else {
                                       return <RelatedObject key={tool.id} data={tool} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds} /> 
                                    }
                                })
                                : ''}

                           {key === 'Projects' ?
                                this.props.projectData.map((project) => {
                                    if(this.state.relatedObjectIds.includes(project.id) || this.state.relatedObjectIds.includes(JSON.stringify(project.id)) || project.id === this.props.projectid){
                                         return ''
                                     }
                                     else {
                                        return <RelatedObject key={project.id} data={project} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds} />
                                     }
                                })
                                : ''}
                           
                           {key === 'Papers' ?
                                this.props.paperData.map((paper) => {
                                     if(this.props.relatedObjectIds.includes(paper.id)){
                                         return ''
                                     }
                                     else {
                                        return <RelatedObject key={paper.id} data={paper} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds} />
                                     }
                                })
                                : ''}

                              {key === 'People' ?
                                this.props.personData.map((person) => {
                                    if(this.state.relatedObjectIds.includes(person.id) || this.state.relatedObjectIds.includes(JSON.stringify(person.id))){
                                    
                                        return ''
                                    }
                                    else {
                                       return <RelatedObject key={person.id} data={person} activeLink={false} doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects} tempRelatedObjectIds={this.props.tempRelatedObjectIds} />
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
                        <Col sm={2} lg={2} />
                    </Row>
                </Container>
            </div>

            </div>
        )
    }
}

export default RelatedResourcesModal;