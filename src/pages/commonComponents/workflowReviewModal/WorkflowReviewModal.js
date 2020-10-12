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
	const [workflowName, setWorkflowName] = useState('');
	const [steps, setSteps] = useState([]);

  const onClickAction = (e, action) => {
		e.preventDefault();
    close('', action);
	}

	const toggleStep = (step = {}) => {
		if(!_.isEmpty(workflowObj) && !_.isEmpty(step)) {
			let steps = updateStepToggle(workflowObj.steps, step);
			let workflow = {
				...workflowObj,
				steps
			}
			setWorkflow(workflow);
		}
	}

	const toggleReview = () => {
		console.log('toggle review');
	}

	const formatSteps = (steps) => {
		if(!_.isEmpty(steps)) {
			return [...steps].reduce((arr, step) => {
				if(!_.isEmpty(step)) {
					// 1. extract reviewers as own entity
					let {reviewers = []} = step;
					// 2. each item add expand state and reviewers expand
					let item = {
						...step,
						expand: false,
						reviewers: [...reviewers].map((reviewer) =>  ({...reviewer, expand: false}))
					}
					// 3. return new array
					return [...arr, item];
				}
				return arr;
			}, []);
		}
		return [];
	}

	useEffect(() => {
		if(!_.isEmpty(workflow)) {
			// 1. deconstruct workflow
			let { workflowName = '', steps = [], isCompleted = false } = workflow;
			// 2. add workflow to scope
			setWorkflow(workflow);
			// 3. add workflowName to scope
			setWorkflowName(workflowName);
			// 4. format steps within workflow
			const stepsArr = formatSteps(steps);
			// 5. set steps scope
			setSteps(stepsArr);
		}
  }, [workflow]);

	return (
		<Fragment>
			<Modal
				show={open}
				onHide={close}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
				className='workflowModal'
			>
				<ModalHeader 
				  workflowName={workflowName}
					onClickAction={onClickAction} />

				<div className='workflowModal-body'>
					{ steps.length > 0  ?
						steps.map((step, i) => {
							return <WorkflowStep 
												key={`step-${i}`}
												index={i}
												step={workflow}
												toggleStep={toggleStep}
												toggleReview={toggleReview}
											/>
						})
							: 'No Steps currently assigned'
						}
				</div>
			</Modal>
		</Fragment>
	);
};

export default WorkflowReviewModal;
