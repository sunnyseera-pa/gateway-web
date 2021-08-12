import React, { useState } from 'react';
import { Modal, InputGroup, FormText } from 'react-bootstrap';
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
    resetTreeChecked,
    findParentNode,
    filtersV2,
    handleClearSection
}) => {
	const [stepCounter, setStepCounter] = useState(1);
	const [searchValue, setSearchValue] = useState('');
	const [selectedValue, setSelectedValue] = useState('');
	const handleClose = action => closed(action);
	let history = useHistory();

	const setQuestionAnswer = label => {
		// console.log('label', label);
	};

	const changeFilter = async (stepKey, impliedValues) => {
        let filterSet = false;
		// if (e.target.checked) {
		// 	selected = e.target.value;
		// }

		// impliedValues = impliedValues.map(function(val){ return val.toUpperCase(); })
		for (var i = 0; i < impliedValues.length; i++) {
			impliedValues[i] = impliedValues[i].charAt(0).toUpperCase() + impliedValues[i].substr(1);
		}

		if (selectedItems) {
            console.log('stepKey' ,stepKey);
			selectedItems.map(item => {
				if (item.parentKey === stepKey) {
                    let parentNode = findParentNode(filtersV2, stepKey);
                    handleClearSection(item);
                    // handleClearSelection(item, true);
                }
			});
		}
		let formattedImpliedValues = impliedValues.join('::');
		let searchObject = {};
		searchObject[stepKey] = formattedImpliedValues;

		// history.push(searchObject);
		// console.log('searchObject', searchObject);
		await updateFilterStates(searchObject);
		doSearchCall();
	};
	const onSearch = e => {
		setSearchValue(e.target.value);
	};

	const searchCall = e => {
		if (e.key === 'Enter') {
			doSearchCall();
		}
	};

	const goNext = () => {
		setStepCounter(stepCounter => stepCounter + 1);
	};
	const dataUtilityWizardJourney = () => {
		if (stepCounter !== dataUtilityWizardSteps.length) {
			return (
				<div className='data-utility-wizard-modal-body ml-3'>
					{dataUtilityWizardSteps.map((step, index) => {
						if (step && step.includeInWizard && step.wizardStepOrder === stepCounter) {
							return (
								<>
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
															onChange={() => changeFilter(step.key, entry.impliedValues)}
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
						<input
							id='collectionsSearchBarInput'
							type='text'
							placeholder=''
							onChange={onSearch}
							value={searchValue}
							onKeyDown={searchCall}
						/>
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
				<div className='gray800-14' style={{ textAlign: 'center' }}>
					<button className='button-secondary' onClick={handleClose}>
						View {datasetCount} dataset matches
					</button>
					<button className='button-primary ml-3' onClick={goNext}>
						Next
					</button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default DataUtilityWizardModal;
