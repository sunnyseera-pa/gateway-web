import React, {Fragment} from 'react';
import _ from 'lodash';
import moment from 'moment';
import SLA from '../../../commonComponents/sla/SLA';
import DarHelperUtil from '../../../../utils/DarHelper.util';
import { Button } from 'react-bootstrap';
import WorkflowDecision from '../../../commonComponents/workflowDecision/WorkflowDecision';

const AccessActivity = ({
  datasets = [], 
  updatedAt, 
  applicants = '',
  dateSubmitted = '', 
  publisher = '', 
  applicationStatus,
  navigateToLocation,
  workflowName = '',
  workflowCompleted = false,
  reviewStatus = '',
  deadlinePassed = false,
  activeStepName = '',
  remainingActioners = [] }) =>{

  const setActivityMeta = () => {
    // Determine return for Deadline or final decision and color
    if(workflowCompleted && applicationStatus === DarHelperUtil.darStatus.inReview) {
      return <WorkflowDecision text={reviewStatus} icon='flag'/>
    } else if(deadlinePassed) {
      return <div className="box-deadline">{reviewStatus}</div>
    } else {
      return <div>{reviewStatus}</div>
    }
  }

  const buildAccessRequest = () => {
    const hasWorkflow = !_.isEmpty(workflowName) ? true : false;
    return (
      <Fragment>
        <div className="box gray800-14">Datasets</div>
        <div className="box">
          {datasets.map((d, i) => {
            return (
              <SLA
                key={i}
                classProperty='default'
                text={d.name} />
            )
          })}
        </div>
        <div className="box">Custodian</div>
        <div className="box">{publisher}</div>
        <div className="box">Applicants</div>
        <div className="box">{!_.isEmpty(applicants) ? applicants : '-'}</div>
        {hasWorkflow == true ?
          <Fragment>
            <div className="box">Workflow</div> 
            <div id="workflow" className="box box-link" onClick={e => navigateToLocation(e)}>
              { !_.isEmpty(workflowName) ? workflowName : '-' } | { !_.isEmpty(activeStepName) ? activeStepName : '-' }
            </div>
          </Fragment> : ''
        }
        <div className="box">Action required by</div>
        <div className="box">{!_.isEmpty(remainingActioners) ? <Fragment>{remainingActioners.firstName}</Fragment> : '-'}</div>
        <div className="box">Submitted</div>
        <div className="box">{!_.isEmpty(dateSubmitted) ? moment(dateSubmitted).format('D MMMM YYYY HH:mm') : '-'}</div>
        <div className="box">Last activity</div>
        <div className="box">
          {moment(updatedAt).format('D MMMM YYYY HH:mm')} 
          {applicationStatus === DarHelperUtil.darStatus.submitted ? 
            <button className="button-primary">Submitted</button> 
            : 
            setActivityMeta()
          }
        </div>
      </Fragment>
    )
}

  return (
    <Fragment>{buildAccessRequest()}</Fragment>
  )
  
}

export default AccessActivity;