import React, { Fragment } from 'react';
import { SlideDown } from 'react-slidedown';
import _ from 'lodash';
import SLA from '../sla/SLA';
import TimeDuration from '../timeDuration/TimeDuration';
import SVGIcon from "../../../images/SVGIcon"; 
import DarHelper from '../../../utils/DarHelper.util';
import WorkflowReview from './WorkflowReview';

const WorkflowStep = ({index, step, toggleStep, toggleReview }) => {

  let {
    stepName,
    sections,
    reviewers,
    reviewStatus = '',
    recommendations
  } = step;

  const renderSections = () => {
    if(!_.isEmpty(sections)) {
      return sections.map(s => s).join(', ');
    }
    return '';
  }

  const renderSLA = (step) => {
    let {active = false, completed = false} = step;

    if (active) 
      return <SLA classProperty={DarHelper.darStatusColours.inReview} text={'Active'} />

    if (completed)
      return <SLA classProperty={DarHelper.darStatusColours.approved} text={'Phase Completed'} />

    return '';
  }

  const renderReviewStatus = () => {
    if(!_.isEmpty(reviewStatus)) {
      return <TimeDuration text={reviewStatus} />
    }
    return '';
  }

  return (
    <div className="step">
        <div className="step-header reviewWrap" onClick={e => toggleStep(step)}>
          <div className="step-header-title">
            <h1 className="black-16-semibold">{++index}. {step.stepName}</h1>
            <span className="gray700-13">{renderSections()}</span>
          </div>
          <div className="step-header-status">
           {renderReviewStatus()}
           {renderSLA(step)}
          </div>
        </div>
        <SVGIcon width='16px' height='16px' name="chevronbottom" fill={'#475da7'} className={step.closed ? 'chevron' : 'chevron flip180'} />
        <SlideDown closed={step.closed}>
          <div className="step-body">
            <div className="step-review">
              <div className="step-review-wrap">
                <div className="step-review-wrap--reviewer">
                  <h2 className="gray800-14-bold">Reviewer</h2>
                </div>
                <div className="step-review-wrap--decision">
                  <h2 className="gray800-14-bold">Decision</h2>
                </div>
                </div>
            </div>
           {step.reviews.length > 0 &&
            step.reviews.map((review, i) => {
              return <WorkflowReview 
                        key={`review-${i}`}
                        review={review}
                        toggleReview={toggleReview}/>
            })
          }
          </div>
      </SlideDown>
    </div>
  )
}

export default WorkflowStep;
