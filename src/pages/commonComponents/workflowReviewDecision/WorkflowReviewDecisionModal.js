import React, { Fragment, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import WorkflowReviewDecisionHeader from './WorkflowReviewDecisionHeader';
import './WorkflowReviewDecision.scss';

const WorkflowReviewDecisionModal = ({ open, close, workflow = {}, projectName = '', dataSets = [], type = '' }) => {

  const [activePhase, setPhase] = useState({});
  const [wordCount, setWordCount] = useState(0);
  const [decision, setDecision] = useState('');

  const onClickAction = (e, action = '') => {
    e.preventDefault();
    if(action == 'reviewDecision') {
      // do api call inside DAR
    }
    close('', action);
  }

  const onMessageChange = () => {
    
  }

  const getActivePhase = () => {
    if(!_.isEmpty(workflow)) {
      console.log(workflow);
      let { steps } = workflow;
      let activeStep = [...steps].find(s => s.active) || {};
      setPhase(activeStep);
    }
  }

  const renderList = (node, primKey = '', secKey = '') => {
    if(!_.isEmpty(node) && !_.isEmpty(primKey) && !_.isEmpty(secKey)) 
      return [...node].map(n => `${n[primKey]} ${n[secKey]}`).join(', ');

    if(!_.isEmpty(node) && !_.isEmpty(primKey)) 
      return [...node].map(n => n[primKey]).join(', ');

    if(!_.isEmpty(node)) 
      return [...node].map(n => n).join(', ');

    return '-'
  }

  const renderDeadline = () => {
    let {deadline, deadlinePassed = false} = activePhase;
    return <span className={`${deadlinePassed ? 'app-red' : ''}`}>{deadlinePassed ? `${deadline} days ago` : `in ${deadline} days`}</span>
  }

  const generateWordCount = () => {
    console.log('test');
    return `${wordCount}/1500`;

  }

  useEffect(() => {
    getActivePhase();
  }, [])
  
  return (  
    <Fragment>
    <Modal
      show={open}
      onHide={close}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='reviewDecision'
    >
      <WorkflowReviewDecisionHeader 
        type={type}
        onClickAction={onClickAction} />

      <div className='reviewDecision-body'>

        <div className="reviewDecision-body-wrap">
          <div className="meta gray800-14-opacity">Project title</div>
          <div className="meta gray800-14">{projectName}</div>
          <div className="meta gray800-14-opacity">Datasets</div>
          <div className="meta gray800-14">{renderList(dataSets, 'name')}</div>
          <div className="meta gray800-14-opacity">Phase</div>
          <div className="meta gray800-14">{activePhase.stepName}</div>
          <div className="meta gray800-14-opacity">Assigned sections</div>
          <div className="meta gray800-14">{renderList(activePhase.sections)}</div>
          <div className="meta gray800-14-opacity">Reviewers</div>
          <div className="meta gray800-14">{renderList(activePhase.reviewers, 'firstname', 'lastname')}</div>
          <div className="meta gray800-14-opacity">Deadline</div>
          <div className="meta gray800-14">{renderDeadline()}</div>
        </div>

        <div className="reviewDecision-body-desc">
          <div>
            <span className="gray800-14">Description</span> 
            <span className="gray800-14">{generateWordCount()}</span>
          </div>
          <textarea className="form-control" rows="8" type="text" value={decision} name="decision" onChange={e => {onMessageChange(e)}} />
        </div>
      </div>
      <div className="reviewDecision-footer">
        <button className="button-secondary" onClick={e => onClickAction(e, 'cancel')}>No, nevermind</button>
        <button className="button-primary"  onClick={e => onClickAction(e, 'completePhase')}>Send review decision</button>
      </div>
    </Modal>
  </Fragment>
  )
}

export default WorkflowReviewDecisionModal;

