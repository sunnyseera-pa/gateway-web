import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { isNil, isEmpty } from 'lodash';
import RelatedResources from '../commonComponents/relatedResources/RelatedResources';
import RelatedObject from '../commonComponents/relatedObject/RelatedObject';
import ActionBar from '../commonComponents/actionbar/ActionBar';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import SVGIcon from '../../images/SVGIcon';
import RemoveUploaderModal from '../commonComponents/RemoveUploaderModal';
import RemoveUploaderErrorModal from '../commonComponents/RemoveUploaderErrorModal';

const baseURL = require('../commonComponents/BaseURL').getURL();

const AddEditProjectForm = props => {
	const [uploadersList, setUploadersList] = useState([]);
	const [uploaderToBeRemoved, setUploaderToBeRemoved] = useState({});
	const [showRemoveUploaderModal, setShowRemoveUploaderModal] = useState(false);
	const [showRemoveUploaderErrorModal, setShowRemoveUploaderErrorModal] = useState(false);
	const [removingOriginalUploader, setRemovingOriginalUploader] = useState(false);
	const originalUploader = props.isEdit ? props.data.uploaderId : props.userState[0].id;
	useEffect(() => {
		buildListOfUploaders();
	}, []);
	//Fix for projects where features are set to null
	if (props.isEdit && props.data && props.data.tags.features === null) props.data.tags.features = [];

	// Pass the useFormik() hook initial form values and a submit function that will
	// be called when the form is submitted
	const formik = useFormik({
		initialValues: {
			id: props.data.id || '',
			type: 'project',
			name: props.data.name || '',
			link: props.data.link || '',
			description: props.data.description || '',
			resultsInsights: props.data.resultsInsights || '',
			leadResearcher: props.data.leadResearcher || '',
			authorsNew: props.data.authorsNew || '',
			authors: props.data.authors || [props.userState[0].id],
			categories: props.data.categories || {
				category: '',
			},
			tags: props.data.tags || {
				features: [],
				topics: [],
			},
			relatedObjects: props.relatedObjects,
		},

		validationSchema: Yup.object({
			name: Yup.string().required('This cannot be empty'),
			link: Yup.string().required('This cannot be empty'),
			description: Yup.string().max(3000, 'Maximum of 3,000 characters').required('This cannot be empty'),
			resultsInsights: Yup.string().max(3000, 'Maximum of 3,000 characters'),
			categories: Yup.object().shape({
				category: Yup.string().required('This cannot be empty'),
			}),
		}),

		onSubmit: values => {
			//add via same post as add tool form - type set as 'project'
			values.relatedObjects = props.relatedObjects;
			values.toolCreator = props.userState[0];
			values.authors = uploadersList.map(uploader => uploader.id);
			if (props.isEdit) {
				axios.put(baseURL + '/api/v1/projects/' + props.data.id, values).then(res => {
					window.location.href = window.location.search + '/project/' + props.data.id + '/?projectEdited=true';
				});
			} else {
				axios.post(baseURL + '/api/v1/projects/', values).then(res => {
					window.location.href = window.location.search + '/project/' + res.data.response.id + '/?projectAdded=true';
				});
			}
		},
	});

	const buildListOfUploaders = () => {
		let listOfUploaders = [];

		if (props.isEdit) {
			props.data.authors.forEach(uploader => {
				props.combinedUsers.forEach(user => {
					if (user.id === uploader) {
						if (props.userState[0].id === user.id) {
							listOfUploaders.push({ id: user.id, name: user.name + ' (You)' });
							if (!user.name.includes('(You)')) {
								user.name = user.name + ' (You)';
							}
						} else {
							listOfUploaders.push({ id: user.id, name: user.name });
						}
					}
				});
			});
		} else {
			props.combinedUsers.forEach(user => {
				if (user.id === props.userState[0].id) {
					listOfUploaders.push({ id: user.id, name: user.name + ' (You)' });
					if (!user.name.includes('(You)')) {
						user.name = user.name + ' (You)';
					}
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

	function descriptionCount(e) {
		document.getElementById('currentCount').innerHTML = e.target.value.length;
	}

	function resultsInsightsCount(e) {
		document.getElementById('resultsInsightsCurrentCount').innerHTML = e.target.value.length;
	}

	const relatedResourcesRef = React.useRef();

	return (
		<div>
			<Container>
				<RemoveUploaderModal
					open={showRemoveUploaderModal}
					cancelUploaderRemoval={cancelUploaderRemoval}
					confirmUploaderRemoval={confirmUploaderRemoval}
					entityType={'project'}
					userState={props.userState}
					uploaderToBeRemoved={uploaderToBeRemoved}></RemoveUploaderModal>

				<RemoveUploaderErrorModal
					open={showRemoveUploaderErrorModal}
					cancelUploaderRemoval={cancelUploaderRemoval}
					entityType={'project'}
					uploaderToBeRemoved={uploaderToBeRemoved}
					removingOriginalUploader={removingOriginalUploader}></RemoveUploaderErrorModal>
				<Row className='margin-top-32'>
					<Col sm={1} lg={1} />
					<Col sm={10} lg={10}>
						<div className='rectangle'>
							<Row>
								<Col sm={10} lg={10}>
									<p className='black-20 margin-bottom-0 pad-bottom-8'>
										{props.isEdit ? 'Edit your project' : 'Add a new research project'}
									</p>
								</Col>
								<Col sm={2} lg={2} className='text-right'>
									<span className='badge-project'>
										<SVGIcon name='newestprojecticon' fill={'#472505'} className='badgeSvg mr-2' />
										Project
									</span>
								</Col>
							</Row>
							<p className='gray800-14 margin-bottom-0'>Projects help others understand the context in which a tool or resource was used</p>
						</div>
					</Col>
					<Col sm={1} lg={10} />
				</Row>

				<Row className='pixelGapTop'>
					<Col sm={1} lg={1} />
					<Col sm={10} lg={10}>
						<Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} autoComplete='off'>
							<div className='rectangle'>
								<Form.Group>
									<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Link</p>
									<p className='gray700-13 margin-bottom-0'>Where can we find this research project?</p>
									<Form.Control
										id='link'
										name='link'
										type='text'
										className={formik.touched.link && formik.errors.link ? 'emptyFormInput addFormInput' : 'addFormInput'}
										onChange={formik.handleChange}
										value={formik.values.link}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.link && formik.errors.link ? <div className='errorMessages'>{formik.errors.link}</div> : null}
								</Form.Group>

								<Form.Group>
									<span className='gray800-14'>Project name</span>
									<Form.Control
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
									<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Type</p>
									<p className='gray700-13 margin-bottom-0'>Select from existing or enter a new one.</p>
									<Typeahead
										id='categories.category'
										labelKey='category'
										allowNew
										defaultSelected={[formik.values.categories.category]}
										options={props.combinedCategories}
										className={
											formik.touched.categories && formik.errors.categories && typeof formik.errors.categories.category !== 'undefined'
												? 'emptyFormInputTypeAhead addFormInputTypeAhead'
												: 'addFormInputTypeAhead'
										}
										onChange={selected => {
											var tempSelected = [];
											selected.forEach(selectedItem => {
												selectedItem.customOption === true ? tempSelected.push(selectedItem.category) : tempSelected.push(selectedItem);
											});
											tempSelected.length > 0
												? (formik.values.categories.category = tempSelected[0])
												: (formik.values.categories.category = '');
										}}
									/>
									{formik.touched.categories && formik.errors.categories && typeof formik.errors.categories.category !== 'undefined' ? (
										<div className='errorMessages'>{formik.errors.categories.category}</div>
									) : null}
								</Form.Group>

								<Form.Group>
									<div style={{ display: 'inline-block' }}>
										<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Description</p>
										<p className='gray700-13 margin-bottom-0'>Include the project purpose and objective.</p>
									</div>
									<div style={{ display: 'inline-block', float: 'right' }}>
										<br />
										<span className='gray700-13'>
											(<span id='currentCount'>{formik.values.description.length || 0}</span>/3000)
										</span>
									</div>
									<Form.Control
										as='textarea'
										id='description'
										name='description'
										type='text'
										className={
											formik.touched.description && formik.errors.description
												? 'emptyFormInput addFormInput descriptionInput'
												: 'addFormInput descriptionInput'
										}
										onKeyUp={descriptionCount}
										onChange={formik.handleChange}
										value={formik.values.description}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.description && formik.errors.description ? (
										<div className='errorMessages'>{formik.errors.description}</div>
									) : null}
								</Form.Group>

								<Form.Group>
									<div style={{ display: 'inline-block' }}>
										<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Results/Insights</p>
										<p className='gray700-13 margin-bottom-0'>Include any results or insights about the project.</p>
									</div>
									<div style={{ display: 'inline-block', float: 'right' }}>
										<br />
										<span className='gray700-13'>
											(<span id='resultsInsightsCurrentCount'>{formik.values.resultsInsights.length || 0}</span>/3000)
										</span>
									</div>
									<Form.Control
										as='textarea'
										id='resultsInsights'
										name='resultsInsights'
										type='text'
										className={
											formik.touched.resultsInsights && formik.errors.resultsInsights
												? 'emptyFormInput addFormInput descriptionInput'
												: 'addFormInput descriptionInput'
										}
										onKeyUp={resultsInsightsCount}
										onChange={formik.handleChange}
										value={formik.values.resultsInsights}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.resultsInsights && formik.errors.resultsInsights ? (
										<div className='errorMessages'>{formik.errors.resultsInsights}</div>
									) : null}
								</Form.Group>

								<Form.Group>
									<span className='gray800-14'>Lead researcher (optional)</span>
									<p className='gray700-13 margin-bottom-0'>Please add the name of the lead researcher on this project</p>
									<Form.Control
										id='leadResearcher'
										name='leadResearcher'
										type='text'
										className='addFormInput gray700-13'
										onChange={formik.handleChange}
										value={formik.values.leadResearcher}
									/>
								</Form.Group>

								<Form.Group>
									<span className='gray800-14'>Collaborators (optional)</span>
									<p className='gray700-13 margin-bottom-0'>
										Please add the names of the people who collaborated on this project, using a comma to separate the names
									</p>
									<Form.Control
										id='authorsNew'
										name='authorsNew'
										type='text'
										className='addFormInput gray700-13'
										onChange={formik.handleChange}
										value={formik.values.authorsNew}
									/>
								</Form.Group>

								<Form.Group>
									<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Keywords (optional)</p>
									<p className='gray700-13 margin-bottom-0'>
										Technological paradigms or other keywords. Eg. Rule-based, clustering, supervised machine learning
									</p>
									<Typeahead
										id='tags.features'
										labelKey='features'
										allowNew
										defaultSelected={formik.values.tags.features}
										multiple
										options={props.combinedFeatures}
										className='addFormInputTypeAhead'
										onChange={selected => {
											var tempSelected = [];
											selected.forEach(selectedItem => {
												selectedItem.customOption === true ? tempSelected.push(selectedItem.features) : tempSelected.push(selectedItem);
											});
											formik.values.tags.features = tempSelected;
										}}
									/>
								</Form.Group>

								<Form.Group>
									<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Domain (optional)</p>
									<p className='gray700-13 margin-bottom-0'>E.g. Biogenomics, Nutrition, Blockchain</p>
									<Typeahead
										id='tags.topics'
										labelKey='topics'
										allowNew
										defaultSelected={formik.values.tags.topics}
										multiple
										options={props.combinedTopic}
										className='addFormInputTypeAhead'
										onChange={selected => {
											var tempSelected = [];
											selected.forEach(selectedItem => {
												selectedItem.customOption === true ? tempSelected.push(selectedItem.topics) : tempSelected.push(selectedItem);
											});
											formik.values.tags.topics = tempSelected;
										}}
									/>
								</Form.Group>

								<Form.Group>
									<p className='gray800-14 margin-bottom-0 pad-bottom-4'>Uploaders</p>
									<p className='gray700-13 margin-bottom-0'>Uploaders are Gateway members with editing rights on this project.</p>
									<Typeahead
										id='authors'
										labelKey={authors => `${authors.name}`}
										defaultSelected={uploadersList}
										multiple
										className={
											formik.touched.authors && formik.errors.authors
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
							</div>

							<div className='rectangle mt-2'>
								<span className='black-20'>Related resources</span>
								<span className='gray800-14'> (optional)</span>
								<br />
								<span className='gray800-14'>
									Show relationships to papers, projects, datasets and tools. Resources must be added to the Gateway first.
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
											personData={props.personData}
											paperData={props.paperData}
											courseData={props.courseData}
											summary={props.summary}
											doAddToTempRelatedObjects={props.doAddToTempRelatedObjects}
											tempRelatedObjectIds={props.tempRelatedObjectIds}
											relatedObjects={props.relatedObjects}
											doClearRelatedObjects={props.doClearRelatedObjects}
											doAddToRelatedObjects={props.doAddToRelatedObjects}
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
			</Container>

			<ActionBar userState={props.userState}>
				<div className='floatRight'>
					<a style={{ cursor: 'pointer' }} href={'/account?tab=projects'}>
						<Button variant='medium' className='cancelButton dark-14 mr-2'>
							Cancel
						</Button>
					</a>

					<Button onClick={() => relatedResourcesRef.current.showModal()} variant='white' className='techDetailButton mr-2'>
						+ Add resource
					</Button>

					<Button variant='primary' className='publishButton white-14-semibold mr-2' type='submit' onClick={formik.handleSubmit}>
						{props.isEdit ? 'Update' : 'Publish'}
					</Button>
				</div>
			</ActionBar>
		</div>
	);
};

export default AddEditProjectForm;
