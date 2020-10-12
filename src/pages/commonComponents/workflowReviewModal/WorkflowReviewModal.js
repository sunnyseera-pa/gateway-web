import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';
import ModalHeader from './ModalHeader';
import SLA from '../sla/SLA';
import { SlideDown } from 'react-slidedown';
import './WorkflowReviewModal.scss';

const WorkflowReviewModal = ({ open, close, workflow = {} }) => {

  // {
  //   workflowName
  //   steps: [{
  //     stepName,
  //     sections: [],
  //     reviewers: [{
  //       name: 'Tanika Patel',
  //       recommendation: '',
  //     }]
  //   }]
	// }
	const [workflowObj, setWorkflow] = useState({});
	const [workflowName, setWorkflowName] = useState('');
	const [steps, setSteps] = useState([]);

  const onClickAction = (e, action) => {
		e.preventDefault();
    close('', action);
	}

	const toggleStep = (step) => {
		console.log('steps');
	}

	const formatSteps = (steps) => {
		if(!_.isEmpty(steps)) {
			return [...steps].reduce((arr, step, i) => {
				let item = {
					...step,
					expanded: false,
					
				}

				return arr;
			}, []);
		}
		return [];
	}


	useEffect(() => {
		if(!_.isEmpty(workflow)) {
			let { workflowName = '', steps = [], isCompleted = false } = workflow;
			setWorkflow(workflow);
			setWorkflowName(workflowName);
			const stepsArr = formatSteps(steps);
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
