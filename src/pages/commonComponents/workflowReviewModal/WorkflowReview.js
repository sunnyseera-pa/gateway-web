import React from 'react';
import { SlideDown } from 'react-slidedown';
import SVGIcon from "../../../images/SVGIcon"; 


const WorkflowReview = ({key, review, toggleReview}) => {
  let {
    _id,
    firstname,
    lastname,
    approved,
    comments,
    closed
  } = review

  return (
    <div className="step-review" onClick={e => toggleReview(review)}>
      <div className="step-review-wrap">
        <div className="step-review-wrap--reviewer">
          <SVGIcon width='16px' height='16px' name="chevronbottom" fill={'#475da7'} className={closed ? 'chevron' : 'chevron flip180'} />
          <div>{firstname} {lastname}</div>
        </div>
        <div className="step-review-wrap--decision">
          <div>-</div>
        </div>
        <SlideDown closed={closed}>
          test

        </SlideDown>
        
      </div>
  </div>
  )
}

export default WorkflowReview;
