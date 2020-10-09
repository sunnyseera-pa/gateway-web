import React from 'react';
import _ from 'lodash';
import { ReactComponent as Flag } from "../../../images/flag.svg";
import { ReactComponent as Check } from "../../../images/check.svg";
import './WorkflowDecision.scss';

export default ({text = '', decisionText = '', decisionMade = false, icon = ''}) => {

  const getIcon = () => {
		switch (icon) {
      case 'flag':
        return <Flag />
        break;
      case 'check':
        return <Check />
        break;
      default:
        return ''
        break;
		}
	};

  return (
    <div className="status-text">
      { getIcon() }
      {!_.isEmpty(decisionText) ? decisionText : ""}
      {!decisionMade ? " | " : ""} 
      {!_.isEmpty(text) ? text : ""} </div>
  )
}