import React, { useState, useEffect } from 'react';
import { Modal, InputGroup, FormText } from 'react-bootstrap';
import queryString from 'query-string';
import { ReactComponent as CDStar } from '../../../images/cd-star.svg';
import SVGIcon from '../../../images/SVGIcon';
import './DataUtilityWizard.scss';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

const DataUtilityWizardModal = ({
	open,
	closed,
	dataUtilityWizardSteps,
	updateFilterStates,
	datasetCount,
	doSearchCall,
	selectedItems,
	handleClearSelection,
}) => {
	const [stepCounter, setStepCounter] = useState(1);
	const [searchValue, setSearchValue] = useState('');
	const [step1Value, setStep1Value] = useState('');
	const [step2Value, setStep2Value] = useState('');
	const [step3Value, setStep3Value] = useState('');
	const [step4Value, setStep4Value] = useState('');

	useEffect(() => {
		// Whenever the data utility wizard is opened, the steps are reset to the first one
		resetSteps();
	}, [open]);

	const handleClose = action => closed(action);
	let history = useHistory();

	const checkIfChecked = label => {
		// Checks which value has been selected previously
		switch (stepCounter) {
			case 1:
				return label === step1Value;
			case 2:
				return label === step2Value;
			case 3:
				return label === step3Value;
			case 4:
				return label === step4Value;
		}
	};

	const changeFilter = async (stepKey, impliedValues, label) => {
		// Setting the changed value in state
		switch (stepCounter) {
			case 1:
				setStep1Value(label);
				break;
			case 2:
				setStep2Value(label);
				break;
			case 3:
				setStep3Value(label);
				break;
			case 4:
				setStep4Value(label);
				break;
		}

		// Checks if the current step has any selected buttons and clears them on change
		if (selectedItems) {
			selectedItems.map(item => {
				if (item.parentKey === stepKey) {
					// TODO: Clearing labels from wizard is working properly
					handleClearSelection(item, true);
				}
			});
		}

		// Formats the implied values to be accepted by the updateFilterStates function
		// e.g: [x, y, z] ---> X::Y::Z
		for (var i = 0; i < impliedValues.length; i++) {
			impliedValues[i] = impliedValues[i].charAt(0).toUpperCase() + impliedValues[i].substr(1);
		}
		let formattedImpliedValues = impliedValues.join('::');
		let searchObject = {};
		searchObject[stepKey] = formattedImpliedValues;

		// Passes filters into the updateFilterStates function
		await updateFilterStates(searchObject);
		doSearchCall();
	};
	const onSearch = e => {
		setSearchValue(e.target.value);
	};

	const resetSteps = () => {
		setStepCounter(1);
	};

	const goNext = () => {
		setStepCounter(stepCounter => stepCounter + 1);
	};

	const goBack = () => {
		setStepCounter(stepCounter => stepCounter - 1);
	};

	const doSearch = e => {
		// Fires on enter on searchbar
		if (e.key === 'Enter') {
			const queryParams = queryString.parse(window.location.search);
			const newQueries = { ...queryParams, search: searchValue };
			history.push({ search: queryString.stringify(newQueries) });
			doSearchCall(true);
		}
	};
	const dataUtilityWizardJourney = () => {
		if (stepCounter !== dataUtilityWizardSteps.length) {
			return (
				<div className='data-utility-wizard-modal-body ml-3'>
					{dataUtilityWizardSteps.map((step, index) => {
						if (step && step.includeInWizard && step.wizardStepOrder === stepCounter) {
							return (
								<>
									<p className='gray800-14'>
										Question {stepCounter} of {dataUtilityWizardSteps.length}
									</p>
									<h5 className='black-20'>{step.wizardStepTitle}</h5>
									<p className='gray800-14'>{step.wizardStepDescription}</p>
									<div className='radio-buttons-container'>
										{step.entries.map(entry => {
											return (
												<InputGroup className='mb-2'>
													<InputGroup.Prepend>
														<InputGroup.Radio
															aria-label='Radio button for following text input'
															name={'radioButtonSet' + stepCounter}
															value={entry.impliedValues}
															onChange={() => changeFilter(step.key, entry.impliedValues, entry.label)}
															checked={checkIfChecked(entry.label)}
														/>
													</InputGroup.Prepend>
													<FormText className='ml-3'>{entry.label}</FormText>
												</InputGroup>
											);
										})}
									</div>
								</>
							);
						}
					})}
				</div>
			);
		} else {
			return (
				<span className='collectionsSearchBar form-control'>
					<span className='collectionsSearchIcon'>
						<SVGIcon name='searchicon' width={20} height={20} fill={'#2c8267'} stroke='none' type='submit' />
					</span>
					<span>
						<input id='collectionsSearchBarInput' type='text' placeholder='' onChange={onSearch} value={searchValue} onKeyDown={doSearch} />
					</span>
				</span>
			);
		}
	};

	return (
		<Modal
			show={open}
			onHide={handleClose}
			className='data-utility-wizard-modal'
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<div>
					<div className='data-utility-wizard-modal-header ml-3'>
						<CDStar fill='#f98e2b' height='20' width='20' className='mr-2' />
						<h5 className='black-20'> Data Utility Wizard</h5>
					</div>
					<p className='gray800-14 ml-3'>
						Use this tool to find the datasets you require through 6 key data utility filters: allowable uses, time lag, length of follow
						up, data model, provenance and search terms.
					</p>
				</div>
			</Modal.Header>
			<Modal.Body>{dataUtilityWizardJourney()}</Modal.Body>
			<Modal.Footer>
				{stepCounter > 1 ? (
					<button className='button-tertiary ml-3' style={{ marginRight: 'auto' }} onClick={goBack}>
						Back
					</button>
				) : (
					''
				)}
				<button className='button-secondary' onClick={handleClose}>
					View {datasetCount} dataset matches
				</button>
				<button className='button-primary ml-3' onClick={goNext}>
					Next
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default DataUtilityWizardModal;
