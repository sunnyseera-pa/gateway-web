import React, { useState } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import '../paper/Paper.scss';
import './Cohorts.scss';
import { ReactComponent as ChevronBottomSvg } from '../../images/chevron-bottom.svg';

const OmopCard = props => {
	const [openSubsumedConcepts, setOpenSubsumedConcepts] = useState(false);
	const [includesCard] = useState(props.groupRule.oper === '=' ? true : false);

	//Don't have subsumned concepts linked to parent OMOP codes yet
	const [tempSubsumedConceptValues] = useState([
		{ name: 'Name1', OMOP: 111 },
		{ name: 'Name2', OMOP: 222 },
		{ name: 'Name3', OMOP: 333 },
	]);

	let nameOfClass = '';
	includesCard ? (nameOfClass = 'cohortOmopIncludesCard') : (nameOfClass = 'cohortOmopExcludesCard');
	props.index !== 0 && (nameOfClass = nameOfClass.concat(' margin-top-4'));

	return (
		<div className='omopCard'>
			{props.index !== 0 && <div className='andOrBox gray700-alt-12-bold'>{props.groupRulesOperator}</div>}
			<div className={nameOfClass}>
				<Row>
					<Col sm={7} lg={7}>
						{!includesCard && (
							<span className='excludesTag'>
								<span className='med-black-12'>EXCLUDES</span>
							</span>
						)}

						<span className='gray800-14-bold'> {props.groupRule.varname} </span>
					</Col>
					<Col sm={5} lg={5}>
						<span className='floatRight'>
							{!isEmpty(tempSubsumedConceptValues) && (
								<span onClick={() => setOpenSubsumedConcepts(!openSubsumedConcepts)}>
									<span className='gray800-14 verticalAlignSuper margin-right-8'>{tempSubsumedConceptValues.length} subsumed concepts</span>
									<ChevronBottomSvg className={openSubsumedConcepts && 'flipSVG'} />
								</span>
							)}

							<span className='gray700-13-bold verticalAlignSuper pad-left-24'>OMOP {props.groupRule.value}</span>
						</span>
					</Col>
				</Row>
				<Row>
					<Col sm={12} lg={12}>
						<span className='gray800-14'>
							Additional info
							{/* Not currently provided additional info on each OMOP code */}
						</span>
					</Col>
				</Row>

				<Collapse in={openSubsumedConcepts}>
					<div className='subsumedConcepts'>
						<Row className=' gray-deep-14 '>
							<Col sm={12}>
								These {tempSubsumedConceptValues.length} concepts are subsumed by the query above and have also been{' '}
								{includesCard ? 'included in ' : 'excluded from '}this criteria
							</Col>
						</Row>
						{tempSubsumedConceptValues.map(value => {
							return (
								<Row>
									<Col sm={12}>
										<span className='gray800-14-bold'>{value.name}</span>
										<span className='gray-med-13 floatRight'>{value.OMOP}</span>
									</Col>
								</Row>
							);
						})}
					</div>
				</Collapse>
			</div>
		</div>
	);
};

export default OmopCard;
