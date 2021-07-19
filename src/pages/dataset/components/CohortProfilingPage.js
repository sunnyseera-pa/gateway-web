import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';
import { ReactComponent as GoldStar } from '../../../images/cd-star.svg';
import { ReactComponent as TableSvg } from '../../../images/table.svg';
import CohortProfilingVariables from './CohortProfilingVariables';
import '../Dataset.scss';

class CohortProfilingPage extends React.Component {
	state = {
		cohortProfiling: null,
		flagClosed: true,
		customType: false,
		allOpen: false,
	};

	constructor(props) {
		super(props);
		this.state.cohortProfiling = props.cohortProfile;
	}

	updateAllOpen = allOpen => {
		if (allOpen === false) {
			this.setState({ allOpen: true });
		} else if (allOpen === true) {
			this.setState({ allOpen: false });
		}
	};

	render() {
		const { flagClosed, customType, cohortProfiling, allOpen } = this.state;

		var svgClassName = '';
		if (flagClosed === false) {
			svgClassName = 'flipSVG';
		}

		return (
			<div className='ml-3'>
				<Row>
					<Col sm={12} lg={12} className='pad-left-0'>
						<div className='entryBox noPadding'>
							<Row className='mt-3'>
								<Col sm={12} lg={12}>
									<div className='variableBox pad-bottom-16'>
										<Row className='pad-left-24'>
											<Col sm={9} lg={11}>
												<Row>
													<TableSvg className='margin-top-2' />
													<span className='pad-left-8 black-18'>
														{cohortProfiling ? (
															<span className='centerSpan'>
																{cohortProfiling.tableName}
																<GoldStar fill={'#f98e2b'} height='20' width='20' className='ml-1' />
															</span>
														) : (
															''
														)}
													</span>
												</Row>
											</Col>

											<Col sm={3} lg={1} className='closeDataClass'>
												<span className='floatRight pointer' onClick={() => this.props.doUpdateCohortDataClassOpen(-1)}>
													<CloseButtonSvg width='19px' height='19px' fill='#475DA7' />
												</span>
											</Col>
										</Row>
										<Row className='mt-2 pad-left-24'>
											<Col sm={11} lg={11} className='pad-left-0'>
												<p className='gray800-14'>{cohortProfiling ? cohortProfiling.description : ''}</p>
											</Col>
											<Col sm={1} lg={1} />
										</Row>

										<Row className='ml-2'>
											<Col sm={12} lg={12} className='pad-left-0'>
												<span className='pad-top-24 pad-bottom-16  black-16-semibold mr-3'>Variables</span>

												
											</Col>
										</Row>
									</div>
								</Col>
							</Row>

							{cohortProfiling.variables.map(variable => (
								<CohortProfilingVariables cohortProfilingVariables={variable} tableName={cohortProfiling.tableName} datasetID={this.props.datasetID}/>
							))}
							<div className='height-16' />
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CohortProfilingPage;
