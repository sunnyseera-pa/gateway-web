import React from 'react'
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';

const ModalHeader = ({workflowName= '', onClickAction}) => {
  return (
    <div className='workflowModal-header'>
      <div className='workflowModal-header--wrap'>
        <div className='workflowModal-head'>
          <h1 className='black-20-semibold'>{workflowName}</h1>
          <CloseButtonSvg
            className='workflowModal-head--close'
            onClick={(e) => onClickAction(e, 'cancel')}
          />
        </div>
        <p>View this application assigned workflow and phase recommendations</p>
      </div>
    </div>
  )
}

export default ModalHeader;