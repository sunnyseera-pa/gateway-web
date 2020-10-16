import React from 'react'
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';

const WorkflowReviewDecisionHeader = ({onClickAction, type}) => {
  return (
    <div className='reviewDecision-head'>
      <h1 className='black-20-semibold'>Review decision: {type}</h1>
      <CloseButtonSvg
        className='reviewDecision-head--close'
        onClick={(e) => onClickAction(e, 'cancel')}
      />
      <p className="gray800-14">Are you sure you’re ready to send your recommendation of your assigned phase? If so, please provide the manager with a reason for your decision.</p>
    </div>
  )
}

export default WorkflowReviewDecisionHeader;