import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, Row, Col, Container, InputGroup } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import CohortGroup from './CohortGroup';
import './Cohorts.scss';

const AddEditCohortHeader = props => {
	const onChangeValue = event => {
		props.setRadioButtonValue(event.target.value);
		//If you have selected newVersion and selected a cohort THEN clicked create new instead we want to clear that selected cohort
		event.target.value === 'createNew' && props.setSelectedCohort('');
	};

	return (
		<div>
			<Container>
				<Row className='margin-top-32'>
					<Col sm={1} lg={1} />
					<Col sm={10} lg={10}>
						<div className='rectangle'>
							<Row>
								<Col sm={12} lg={12}>
									<p className='black-20 margin-bottom-0 pad-bottom-8'>
										{props.isEdit ? 'New version: edit the metadata for this cohort' : 'Save this cohort'}
									</p>
								</Col>
							</Row>
							<p className='gray800-14 margin-bottom-24'>
								{props.isEdit
									? 'Change information such as the title, description and management. All previous versions will be preserved.'
									: 'This will allow you to add additional information, and easily share your cohort with others.'}
							</p>

							{props.cohortGroups.map((cohortGroup, index) => {
								return <CohortGroup cohortGroup={cohortGroup} index={index} />;
							})}

							{!props.isEdit && (
								<Row className='margin-top-24'>
									<Col sm={12} lg={12}>
										<Row>
											<Col sm={12} lg={12}>
												<Form.Group className='pb-2 margin-bottom-0'>
													<Form.Label className='gray800-14'>How would you like to save this cohort?</Form.Label>
													<br />
													<InputGroup onChange={onChangeValue}>
														<InputGroup.Prepend>
															<Row className='margin-bottom-8'>
																<InputGroup.Radio
																	id='courseCreate'
																	className='ml-3 cursorPointer'
																	aria-label='Create a new cohort'
																	name='cohortRadioButtons'
																	value='createNew'
																/>
																<span className='gray800-14 ml-3'>Create a new cohort</span>
															</Row>
															<Row className='margin-bottom-12'>
																<InputGroup.Radio
																	id='courseNewVersion'
																	className='ml-3 cohortDropdown cursorPointer'
																	aria-label='Create a new version of an existing cohort'
																	name='cohortRadioButtons'
																	value='newVersion'
																	disabled={props.usersCohorts.length === 0 ? true : false}
																/>
																<span className={props.usersCohorts.length === 0 ? 'halfOpacity gray800-14 ml-3' : 'gray800-14 ml-3'}>
																	Create a new version of an existing cohort
																</span>
															</Row>
														</InputGroup.Prepend>
													</InputGroup>
												</Form.Group>
											</Col>
										</Row>
										{props.radioButtonValue === 'newVersion' && (
											<Row>
												<Col sm={12} lg={12}>
													<Form.Group>
														<Typeahead
															id='existingCohorts'
															labelKey='name'
															options={props.usersCohorts}
															filterBy={['name']}
															className='addFormInputTypeAhead'
															onChange={selected => {
																if (!isEmpty(selected)) {
																	props.setSelectedCohort(selected[0].id);
																} else {
																	props.setSelectedCohort('');
																}
															}}
														/>
													</Form.Group>
												</Col>
											</Row>
										)}
									</Col>
								</Row>
							)}

							{(props.isEdit || (props.radioButtonValue === 'newVersion' && props.selectedCohort !== '')) && (
								<Row className={props.isEdit && 'margin-top-24'}>
									<Col sm={12} lg={12}>
										<Form.Group>
											<div style={{ display: 'inline-block' }}>
												<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Changelog (optional)</p>
												<p className='gray700-13 margin-bottom-0'>
													Explain the reason for the new version in a few words. This will appear on the cohort page.
												</p>
											</div>
											<Form.Control
												data-test-id='changeLog'
												id='changeLog'
												name='changeLog'
												type='text'
												onChange={event => {
													props.setChangeLogValue(event.target.value);
												}}
											/>
										</Form.Group>
									</Col>
								</Row>
							)}
						</div>
					</Col>
					<Col sm={1} lg={10} />
				</Row>
			</Container>
		</div>
	);
};

export default AddEditCohortHeader;
