import React, { Fragment, useState, useEffect } from 'react';
import _ from 'lodash';
import {Col, Row } from 'react-bootstrap';
import { ReactComponent as ArrowDownSvg } from '../../../images/stock.svg';
import { SlideDown } from 'react-slidedown';
import './WorkflowHelp.scss';


const WorkflowHelp = () => {

    const [help, setHelp] = useState([]);

    const toggleHelp = (index) => {
       let helpArr = [...help].map((h, i) => {
        return {
            ...h,
            closed: i === index ? !h.closed : h.closed
        }
       });
       setHelp(helpArr);
    }

    useEffect(() => {
        setHelp([
            {
                question: 'What are workflows?',
                answer: 'Workflows are the frameworks used by your team to respond to data access requests. You can create different workflows for different types of datasets and requests. Each workflow has different phases within them, which you can customise to suit your processes (e.g. assign reviewers, sections and timeframes). These workflows can be assigned to data access requests as they come in.',
                closed: true,
            }, {
                question: 'How do I add team members?',
                answer: 'To add members to your team, so that they can be assigned to workflows and data access requests, first make sure that they are members of the Gateway and then please email/fill in this google form.',
                closed: true
            }, {
                question: 'How can I customise my data access request application forms?',
                answer: 'To create and customise the data access request application forms that researchers and innovators will complete to gain access to your team’s datasets, contact HDRUK at email.',
                closed: true
            }, {
                question: 'Do I need a workflow to review a data access request application?',
                answer: 'You can approve or reject a data access request application without a workflow. You will have the option to choose your review method when you click on to a submitted application.',
                closed: true
            }, {
                question: 'How many applications can I assign a workflow to?',
                answer: 'As many as necessary.',
                closed: true
            }, {
                question: 'Can I edit or delete a workflow that is assigned to a data access request application?',
                answer: 'You cannot edit or delete a workflow that is currently assigned to one or more data access request applications. ',
                closed: true
            }, {
                question: 'What happens if a phase passes the deadline I set?',
                answer: 'If phase passes a deadline, a notification will be sent to the reviewer who has yet to complete their review. As the manager, you are able to progress the review on to the next phase at any time.',
                closed: true
            }, {
                question: 'How do workflows move on to the next phase?',
                answer: 'A review will move on to the next phase when all reviewers have completed their phase review or if the manager manually progresses the review on to the next phase.',
                closed: true
            }, {
                question: 'What if a reviewer is unavailable?',
                answer: 'You are able to manually progress the review to the next phase if a reviewer is unavailable or hasn’t complete their review.',
                closed: true
            }, {
                question: 'How many workflows can I create?',
                answer: 'As many as appropriate.',
                closed: true
            }, {
                question: 'How do I assign a workflow to a data access request application?',
                answer: 'When a data access request application is submitted you will find it in the ‘applications’ subtab within the ‘data access requests’ tab. Start the review of your chosen application and you will have the option to either make a decision or assign a workflow. The workflow you want to assign to the application must have been created prior to this stage.',
                closed: true
            }
        ])
    }, []);

    return (
        <Fragment>
          <Row>
          <Col sm={1} lg={1}/>
          <Col sm={10} lg={10}>
            <div className="workflowRectangle">
                <h1 className=" mb-2">Frequently asked questions</h1>
                <p className="gray800-15 mb-8 workflowSubtitle">This section provides answers to some of the questions that you may have about workflows, team members and data access request applications.</p>
            {
                help.length > 0 &&
                help.map((h, i) => {
                    return (
                        <Fragment>
                        <div className="mainWorkflowCard" onClick={e => toggleHelp(i)}>
                            <Row className="ml-0 workflowQuestion">
                            <ArrowDownSvg className={h.closed ? 'margin-top-6': 'flip180 margin-top-6'}/>
                            <div className="gray800-14 margin-left-16">{h.question}</div>
                        </Row>
                        </div>
                        <SlideDown closed={h.closed} className="workflowSlide">
                            <div className="body workflowAnswer">
                            <div className="gray800-14">{h.answer}</div>
                            </div>
                        </SlideDown>
                        </Fragment>
                    )
                })
            }
            </div>
            </Col>
            <Col sm={1} lg={1}/>
          </Row>
        </Fragment>
      )
}

export default WorkflowHelp;