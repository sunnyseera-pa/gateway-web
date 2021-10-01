import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import moment from 'moment';
import { isNil, isEmpty, isUndefined } from 'lodash';
import RelatedResources from '../commonComponents/relatedResources/RelatedResources';
import RelatedObject from '../commonComponents/relatedObject/RelatedObject';
import ActionBar from '../commonComponents/actionbar/ActionBar';
import RemoveUploaderModal from '../commonComponents/RemoveUploaderModal';
import RemoveUploaderErrorModal from '../commonComponents/RemoveUploaderErrorModal';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import SVGIcon from '../../images/SVGIcon';
import '../paper/Paper.scss';
import Loading from '../commonComponents/Loading';
const baseURL = require('../commonComponents/BaseURL').getURL();

const AddEditCohortForm = props => {
	const [uploadersList, setUploadersList] = useState([]);
	const [uploaderToBeRemoved, setUploaderToBeRemoved] = useState({});
	const [showRemoveUploaderModal, setShowRemoveUploaderModal] = useState(false);
	const [showRemoveUploaderErrorModal, setShowRemoveUploaderErrorModal] = useState(false);
	const [removingOriginalUploader, setRemovingOriginalUploader] = useState(false);
	const originalUploader = props.isEdit ? props.data.uploader : props.userState[0].id;
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		buildListOfUploaders();
	}, []);

	useEffect(() => {
		updateShowForm();
	}, [props.isEdit, props.radioButtonValue, props.selectedCohort]);

	useEffect(() => {
		buildListOfUploaders();
	}, [props.data]);

	const updateShowForm = () => {
		if (
			props.isEdit === true ||
			(!props.isEdit && props.radioButtonValue === 'createNew') ||
			(!props.isEdit && props.radioButtonValue === 'newVersion' && props.selectedCohort !== '')
		) {
			setShowForm(true);
		} else {
			setShowForm(false);
		}
	};

	// Pass the useFormik() hook initial form values and a submit function that will
	// be called when the form is submitted
	const formik = useFormik({
		initialValues: {
			id: props.data.id || '',
			type: 'cohort',
			name: props.data.name || '',
			description: props.data.description || '',
			relatedObjects: props.relatedObjects,
			publicflag: !isUndefined(props.publicFlag) ? props.publicFlag : true,
			previousPublicFlag: props.publicFlag,
		},

		validationSchema: Yup.object({
			name: Yup.string().max(200, 'Maximum of 200 characters').required('This cannot be empty'),
			description: Yup.string().max(5000, 'Maximum of 5,000 characters').required('This cannot be empty'),
			uploaders: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.number()) : Yup.number())),
		}),

		// enableReinitialize updates the initial formik values when props change
		enableReinitialize: true,

		onSubmit: values => {
			values.relatedObjects = props.relatedObjects;
			values.uploaders = uploadersList.map(uploader => uploader.id);
			values.cohortCreator = props.userState[0];
			values.changeLog = props.changeLogValue;
			values.request_id = props.data.request_id;
			values.cohort = props.data.cohort;

			//TODO - update to correct paths when available
			if (props.isEdit) {
				axios.put(baseURL + '/api/v1/cohorts/' + props.data.id, values).then(res => {
					window.location.href = window.location.search + '/cohort/' + props.data.id + '/?cohortEdited=true';
				});
			} else {
				axios.post(baseURL + '/api/v1/cohorts/', values).then(res => {
					window.location.href = window.location.search + '/cohort/' + res.data.response.id + '/?cohortAdded=true';
				});
			}
		},
	});

	const buildListOfUploaders = () => {
		let listOfUploaders = [];

		if (props.isEdit || (!props.isEdit && props.radioButtonValue === 'newVersion' && props.selectedCohort !== '')) {
			props.data.uploaders.forEach(uploader => {
				props.combinedUsers.forEach(user => {
					if (user.id === uploader) {
						if (props.userState[0].id === user.id) {
							if (!user.name.includes('(You)')) {
								user.name = user.name + ' (You)';
							}
							listOfUploaders.push({ id: user.id, name: user.name });
						} else {
							listOfUploaders.push({ id: user.id, name: user.name });
						}
					}
				});
			});
		} else {
			props.combinedUsers.forEach(user => {
				if (user.id === props.userState[0].id) {
					if (!user.name.includes('(You)')) {
						user.name = user.name + ' (You)';
					}
					listOfUploaders.push({ id: user.id, name: user.name });
				}
			});
		}
		setUploadersList(listOfUploaders);
	};

	const cancelUploaderRemoval = () => {
		setUploaderToBeRemoved({});
		setRemovingOriginalUploader(false);
		setShowRemoveUploaderModal(false);
		setShowRemoveUploaderErrorModal(false);
	};

	const confirmUploaderRemoval = () => {
		setUploadersList(uploadersList.filter(uploader => uploader.id !== uploaderToBeRemoved.id));
		setUploaderToBeRemoved({});
		setShowRemoveUploaderModal(false);
	};

	function updateReason(id, reason, type, pid) {
		let inRelatedObject = false;
		props.relatedObjects.map(object => {
			if (object.objectId === id) {
				inRelatedObject = true;
				object.pid = pid;
				object.reason = reason;
				object.objectType = type;
				object.user = props.userState[0].name;
				object.updated = moment().format('DD MMM YYYY');
			}
		});

		if (!inRelatedObject) {
			props.relatedObjects.push({
				objectId: id,
				pid: pid,
				reason: reason,
				objectType: type,
				user: props.userState[0].name,
				updated: moment().format('DD MMM YYYY'),
			});
		}
	}

	const updatePublicFlag = () => {
		{
			formik.setFieldValue('publicflag', !props.publicFlag);
		}
		props.updatePublicFlag(!props.publicFlag);
	};

	const relatedResourcesRef = React.useRef();
	return (
		<div>
			<Container>
				<RemoveUploaderModal
					open={showRemoveUploaderModal}
					cancelUploaderRemoval={cancelUploaderRemoval}
					confirmUploaderRemoval={confirmUploaderRemoval}
					entityType={'cohort'}
					userState={props.userState}
					uploaderToBeRemoved={uploaderToBeRemoved}></RemoveUploaderModal>

				<RemoveUploaderErrorModal
					open={showRemoveUploaderErrorModal}
					cancelUploaderRemoval={cancelUploaderRemoval}
					entityType={'cohort'}
					uploaderToBeRemoved={uploaderToBeRemoved}
					removingOriginalUploader={removingOriginalUploader}></RemoveUploaderErrorModal>

				{showForm &&
					(props.isFormLoading ? (
						<Row>
							<Col xs={1} />
							<Col xs={10}>
								<Loading />
							</Col>
							<Col xs={1} />
						</Row>
					) : (
						<Formik
							render={() => {
								return (
									<div>
										<Row className='pixelGapTop'>
											<Col sm={1} lg={1} />
											<Col sm={10} lg={10}>
												<Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} autocomplete='off'>
													<div className='rectangle'>
														<Form.Group>
															<div style={{ display: 'inline-block' }}>
																<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Cohort name</p>
																<p className='gray700-13 margin-bottom-0'>Up to 200 characters</p>
															</div>
															<div style={{ display: 'inline-block', float: 'right' }}>
																<br />
																<span className='gray700-13'>
																	(<span id='currentCount'>{formik.values.name.length || 0}</span>
																	/2000)
																</span>
															</div>
															<Form.Control
																data-test-id='name'
																id='name'
																name='name'
																type='text'
																className={formik.touched.name && formik.errors.name ? 'emptyFormInput addFormInput' : 'addFormInput'}
																onChange={formik.handleChange}
																value={formik.values.name}
																onBlur={formik.handleBlur}
															/>
															{formik.touched.name && formik.errors.name ? <div className='errorMessages'>{formik.errors.name}</div> : null}
														</Form.Group>

														<Form.Group>
															<div style={{ display: 'inline-block' }}>
																<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Description</p>
																<p className='gray700-13 margin-bottom-0'>Up to 5000 characters</p>
															</div>
															<div style={{ display: 'inline-block', float: 'right' }}>
																<br />
																<span className='gray700-13'>
																	(<span id='currentCount'>{formik.values.description.length || 0}</span>
																	/5000)
																</span>
															</div>
															<Form.Control
																data-test-id='description'
																as='textarea'
																id='description'
																name='description'
																type='text'
																className={
																	formik.touched.description && formik.errors.description
																		? 'emptyFormInput addFormInput descriptionInput'
																		: 'addFormInput descriptionInput'
																}
																onChange={formik.handleChange}
																value={formik.values.description}
																onBlur={formik.handleBlur}
															/>
															{formik.touched.description && formik.errors.description ? (
																<div className='errorMessages'>{formik.errors.description}</div>
															) : null}
														</Form.Group>

														<Form.Group data-test-id='uploaders'>
															<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Uploaders</p>
															<p className='gray700-13 margin-bottom-0'>Anyone added will be able to view and edit this cohort</p>
															<Typeahead
																id='uploaders'
																labelKey={uploaders => `${uploaders.name}`}
																defaultSelected={uploadersList}
																multiple
																className={
																	formik.touched.uploaders && formik.errors.uploaders
																		? 'emptyFormInputTypeAhead addFormInputTypeAhead'
																		: 'addFormInputTypeAhead'
																}
																options={props.combinedUsers}
																selected={uploadersList}
																onChange={selectedOptions => {
																	// 1. Check if removing any uploader
																	const removedUploader = uploadersList.filter(
																		uploader => !selectedOptions.map(selectedOpt => selectedOpt.id).includes(uploader.id)
																	)[0];
																	if (!isEmpty(removedUploader)) {
																		// 2. Check if removing original uploader
																		if (removedUploader.id === originalUploader) {
																			setRemovingOriginalUploader(true);
																			setShowRemoveUploaderErrorModal(true);
																		}
																		// 3. Check if removing last uploader
																		else if (isEmpty(selectedOptions)) {
																			setUploaderToBeRemoved(removedUploader);
																			setShowRemoveUploaderErrorModal(true);
																		} else {
																			// 4. If removing a regular uploader show regular remove uploader modal
																			setUploaderToBeRemoved(removedUploader);
																			setShowRemoveUploaderModal(true);
																		}
																	} else {
																		// 5. If not removing uploader, user is adding uploader
																		const addedUploader = selectedOptions
																			.filter(selectedOpt => !uploadersList.map(uploader => uploader.id).includes(selectedOpt.id))
																			.map(newUploader => {
																				return { id: newUploader.id, name: newUploader.name };
																			})[0];
																		if (!isEmpty(addedUploader)) {
																			setUploadersList([...uploadersList, addedUploader]);
																		}
																	}
																}}
															/>
														</Form.Group>

														<Row
															className='margin-bottom-8 pad-left-16 pointer'
															onClick={() => {
																updatePublicFlag();
															}}>
															<span className='eyeColumn pad-right-8'>
																{formik.values.publicflag ? (
																	<SVGIcon name='eye' width={24} height={24} fill={'#475da7'} />
																) : (
																	<SVGIcon name='eyeCrossed' width={24} height={24} fill={'#475da7'} />
																)}
															</span>
															<span className='gray800-14'>
																{formik.values.publicflag
																	? 'This cohort is public and will appear on search results. Click to make private.'
																	: 'This cohort is private. Only those with a link will be able to view it. Click to make public.'}
															</span>
														</Row>
													</div>

													<div className='rectangle mt-2'>
														<span className='black-20'>Related resources</span>
														<span className='gray800-14'> (optional)</span>
														<br />
														<span className='gray800-14'>
															Link projects, papers, and other resources to this cohort. Datasets are automatically added and updated.
														</span>
													</div>

													{props.relatedObjects.length === 0 ? (
														''
													) : (
														<div className='rectangle'>
															{props.relatedObjects.map(object => {
																if (!isNil(object.objectId)) {
																	return (
																		<RelatedObject
																			showRelationshipQuestion={true}
																			objectId={object.objectId}
																			pid={object.pid}
																			objectType={object.objectType}
																			doRemoveObject={props.doRemoveObject}
																			doUpdateReason={updateReason}
																			reason={object.reason}
																			didDelete={props.didDelete}
																			updateDeleteFlag={props.updateDeleteFlag}
																			isLocked={object.isLocked}
																		/>
																	);
																}
															})}
														</div>
													)}

													<div className='rectangle flexCenter pixelGapTop'>
														<Row>
															<Col sm={1} lg={1} />
															<Col sm={10} lg={10}>
																<RelatedResources
																	ref={relatedResourcesRef}
																	searchString={props.searchString}
																	doSearchMethod={props.doSearchMethod}
																	doUpdateSearchString={props.doUpdateSearchString}
																	userState={props.userState}
																	datasetData={props.datasetData}
																	toolData={props.toolData}
																	projectData={props.projectData}
																	paperData={props.paperData}
																	personData={props.personData}
																	courseData={props.courseData}
																	summary={props.summary}
																	myEntitiesSummary={props.myEntitiesSummary}
																	doAddToTempRelatedObjects={props.doAddToTempRelatedObjects}
																	tempRelatedObjectIds={props.tempRelatedObjectIds}
																	relatedObjects={props.relatedObjects}
																	doClearRelatedObjects={props.doClearRelatedObjects}
																	doAddToRelatedObjects={props.doAddToRelatedObjects}
																	displayTabs={props.displayTabs}
																/>
															</Col>
															<Col sm={1} lg={10} />
														</Row>
													</div>
												</Form>
											</Col>
											<Col sm={1} lg={10} />
										</Row>
										<Row>
											<span className='formBottomGap'></span>
										</Row>
									</div>
								);
							}}
						/>
					))}
			</Container>

			<ActionBar userState={props.userState}>
				<div className='floatRight'>
					<a style={{ cursor: 'pointer' }} href={'/account?tab=cohorts'}>
						<Button variant='medium' className='cancelButton dark-14 mr-2'>
							Cancel
						</Button>
					</a>

					<Button
						onClick={() => relatedResourcesRef.current.showModal()}
						variant='white'
						className='techDetailButton mr-2'
						disabled={showForm ? false : true}>
						+ Add resource
					</Button>

					<Button
						data-test-id='cohort-save'
						variant='primary'
						className='publishButton white-14-semibold mr-2'
						type='submit'
						onClick={formik.handleSubmit}
						disabled={showForm ? false : true}>
						Save
					</Button>
				</div>
			</ActionBar>
		</div>
	);
};

export default AddEditCohortForm;
