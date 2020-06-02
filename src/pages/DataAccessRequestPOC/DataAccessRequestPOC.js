

import React, { Component, Fragment } from 'react';
import Winterfell from 'winterfell';
import { Container, Row, Col } from 'react-bootstrap';
import TypeaheadCustom from './components/TypeaheadCustom'
import DatePickerCustom from './components/DatepickerCustom';
import {isEmpty} from 'lodash';
import {formSchema} from './formSchema';

 class DataAccessRequestPOC extends Component {
    constructor(props) {
        super(props);
        this.onFormSwitchPanel = this.onFormSwitchPanel.bind(this);
        this.onFormUpdate = this.onFormUpdate.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state ={
            form: {},
            questionAnswers: {},
            activePanelId: '',
        }
    }

    componentWillMount() {
        this.setState({form: {...formSchema}, activePanelId: 'applicant'});
    }

    onFormRender() {
        console.log('form render');
    }
    
    onFormUpdate(questionAnswers) {
        console.log('update', questionAnswers);
    }

    onFormSwitchPanel(panelId) {
        this.setState({ activePanelId: panelId});
    }

    onFormSubmit(questionAnswers, target) {
        console.log('submit', questionAnswers);
    }

    onParentNavClick(item) {
        this.updateNavigation(item);
    }

    onSwitchedPanel = (newForm) => {
        this.updateNavigation(newForm);
    }

    renderQuestionSets = (parentForm) => {
        let questionPanels = [...this.state.form.questionPanels];
        if(!isEmpty(questionPanels)) {
            return questionPanels.map((item, index) =>{
                if (parentForm.pageId === item.pageId) {
                    return  (
                        <li className="Gray800-14px" style={{cursor: 'pointer'}} key={index} onClick={e => this.onFormSwitchPanel(item.panelId)}>{item.panelHeader}</li> 
                    )
                }
            });
        }
    }

   

    updateNavigation = (newForm) => {
        const currentActivePage = [...this.state.form.pages].find(p => p.active === true);
        if(currentActivePage.pageId !== newForm.pageId) {
            // copy state pages
            const pages = [...this.state.form.pages];
            // get the index of new form
            const newPageindex = pages.findIndex(page => page.pageId === newForm.pageId);
            // reset the current state of active to false for all pages
            const newFormState = [...this.state.form.pages].map((item) => {
                return {...item, active: false}
            });
            // update actual object model with propert of active true
            newFormState[newPageindex] = {...pages[newPageindex], active: true};
            // get the activepanel and panelId Property
            const { panelId = '' } = [...this.state.form.formPanels].find(p => p.pageId === newFormState[newPageindex].pageId);
            if (!isEmpty(panelId) || typeof panel != undefined) {
                this.setState({ form: {...this.state.form, pages: newFormState}, activePanelId: panelId});
            } else {
                this.setState({ form: {...this.state.form, pages: newFormState}});
            }
        }
    }
    
    render() {
        Winterfell.addInputType('typeaheadCustom', TypeaheadCustom);
        Winterfell.addInputType('datePickerCustom', DatePickerCustom);
        return (
            <div>
                <Container>
                    <Row className="mt-3">
                    <Col md={3}>
                         <div className="mb-3">Pre-submission</div>   
                         {[...this.state.form.pages].map((item, idx) => (
                             <div key={item.index} className={`${item.active ? "active-border" : ""}`}>
                                <div>    
                                    <h1 className="Black-16px mb-3" onClick={() => {this.onParentNavClick(item)}}>{item.title}</h1>
                                        {item.active &&
                                            <ul className="list-unstyled ml-2 pl-2 active-grey-border">
                                                { this.renderQuestionSets(item) }
                                            </ul>
                                        }
                                </div>
                             </div>
                         ))}          
                     </Col>
                        <Col md={7}>
                            <Winterfell 
                                schema={this.state.form}
                                questionAnswers={this.state.questionAnswers}
                                panelId={this.state.activePanelId}
                                disableSubmit={true}
                                onUpdate={this.onFormUpdate}
                                onSwitchPanel={this.onSwitchedPanel}
                                onSubmit={this.onFormSubmit}
                                onRender={this.onFormRender} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DataAccessRequestPOC;
