import React, { Fragment } from 'react';
import { SlideDown } from 'react-slidedown';
import SLA from '../sla/SLA';
import TimeDuration from '../timeDuration/TimeDuration';

const WorkflowStep = ({key, index, step, toggleStep, toggleReview }) => {
  return (
    <div class="step" onClick={e => toggleStep(step)}>
      <SlideDown closed={step.expand}>
        <div className="step-header">
          <div className="step-header-title">
            <h1>{index++}. Begining phase</h1>
            <span>Safe people, Safe settings</span>
          </div>
          <div className="step-header-status">
            <TimeDuration 
              text={'Deadline in 14 days'} 
              />
            <SLA 
              classProperty={'amber'} 
              text={'Active'}
              />
            <SVGIcon name="chevronbottom" fill={'#475da7'} className={step.expand ? '' : "flip180"}/>
          </div>
        </div>
      </SlideDown>
    </div>
  )
}

export default WorkflowStep;
