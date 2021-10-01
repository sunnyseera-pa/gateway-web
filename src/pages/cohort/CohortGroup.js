import React, { useState } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';
import './Cohorts.scss';
import { ReactComponent as ChevronDownWhiteSvg } from '../../images/icon-chevron-bottom.svg';
import OmopCard from './OmopCard';

const CohortGroup = props => {
	const [openGroup, setOpenGroup] = useState(false);
	const [groupRules] = useState(props.cohortGroup.rules);
	const [groupRulesOperator] = useState(props.cohortGroup.rules_oper);

	return (
		<>
			<Row className='margin-top-8'>
				<Col sm={12} lg={12}>
					<div className='groupAccordianHeader' onClick={() => setOpenGroup(!openGroup)}>
						<ChevronDownWhiteSvg fill='#475da7' className={openGroup && 'flipSVG'} />
						<span className='white-16-bold verticalAlignSuper'> Group {props.index + 1} </span>
						<span className='white-13-semibold verticalAlignSuper'>
							(Title of group)
							{/* No BCP value for group name */}
						</span>
					</div>
				</Col>
			</Row>
			<Collapse in={openGroup} className='collapseWait pad-bottom-8 cohortGroupExpanded'>
				<div>
					{groupRules.map((groupRule, index) => {
						return <OmopCard omop={'testA'} index={index} groupRulesOperator={groupRulesOperator} groupRule={groupRule} />;
					})}
				</div>
			</Collapse>
		</>
	);
};

export default CohortGroup;
