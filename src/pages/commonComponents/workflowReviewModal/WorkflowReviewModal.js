import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';
import ModalHeader from './ModalHeader';
import WorkflowStep from './WorkflowStep';
import { 
  updateStepToggle
} from '../../../utils/Workflows.util';

import './WorkflowReviewModal.scss';

const WorkflowReviewModal = ({ open, close, workflow = {} }) => {
	const [workflowObj, setWorkflow] = useState({});

  const onClickAction = (e, action) => {
		e.preventDefault();
    close('', action);
	}

	const buildWorkflow = () => {
		// 1. deconstruct workflow
		let { workflowName = '', steps = [], isCompleted = false } = workflow;
		if(!_.isEmpty(steps)) {
			const stepsArr = formatSteps(steps);
			let workflowObj = {
				...workflow,
				steps: stepsArr
			}
			setWorkflow(workflowObj);
		} else {
			setWorkflow(workflow);
		}
	}

	const formatSteps = (steps) => {
		if(!_.isEmpty(steps)) {
			return [...steps].reduce((arr, step) => {
				if(!_.isEmpty(step)) {
					// 1. extract reviewers as own entity
					let {
						reviewers, 
						recommendations,
						_id,
						} = step;
					// 2. each item add expand state and reviewers expand
					let item = {
						...step,
						closed: true,
						reviews: buildReviews(_id, reviewers, recommendations)
					}
					// 3. return new array
					arr.push(item);
				}
				return arr;
			}, []);
		}
		return [];
	}

	const buildReviews = (stepId = '', reviewers = [], recommendations = []) => {
		if(!_.isEmpty(reviewers)) {
			return [...reviewers].map((rev) => {
				let comment = {approved: false, comments: '', createdDate: ''};
				let review = recommendations.find(r => r.reviewer === rev._id) || {};
				if(!_.isEmpty(review)) 
					comment = review;
				
				return {
					...rev,
					...comment,
					stepId,
					closed: true,
				}
			});
		}
		return [];
	}

	const toggleStep = (step = {}) => {
		if(!_.isEmpty(workflowObj) && !_.isEmpty(step)) {
			let steps = updateStepToggle([...workflowObj.steps], step);
			let workflow = {
				...workflowObj,
				steps
			}
			setWorkflow(workflow);
		}
	}

	const toggleReview = (review = {}) => {
		const steps = setToggleReview(review);
		let workflow = {
			...workflowObj,
			steps
		}
		setWorkflow(workflow);
	}

	const setToggleReview = (review = {}) => {
		return [];
		// return [...workflowObj.steps].reduce((arr, item) => {
		// 	let {  reviews } = {...item};
		// 	if (step._id === review.stepId) {
		// 		reviews = [...reviews].map((r) => {
		// 			if(r._id === review._id) {
		// 				r.closed = !r.closed
		// 			}
		// 			return {...r};
		// 		});
		// 	}

	

		// 	arr.push({...step, reviews});

		// 	return arr;
		// }, []);
	}

	const renderSteps = () => {
		let {steps = []} = workflowObj;
		if (!_.isEmpty(steps)) {
			return steps.map((step, i) => {
				return <WorkflowStep 
									key={`step-${i}`}
									index={i}
									step={step}
									toggleStep={toggleStep}
									toggleReview={toggleReview}
								/>
			});
		}
		return 'No Steps currently assigned';
	}

	useEffect(() => {
		if(!_.isEmpty(workflow)) 
			buildWorkflow()
  }, []);

	return (
		<Fragment>
			<Modal
				show={open}
				onHide={close}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
				className='workflowReview'
			>
				<ModalHeader 
				  workflowName={workflowObj.workflowName}
					onClickAction={onClickAction} />

				<div className='workflowReview-body'>
					{renderSteps()}
				</div>
			</Modal>
		</Fragment>
	);
};

export default WorkflowReviewModal;
