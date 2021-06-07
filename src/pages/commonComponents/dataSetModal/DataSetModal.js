import React, { Fragment, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';
import DataSetHelper from '../../../utils/DataSetHelper.util';

import './DataSetModal.scss';

const DataSetModal = ({ open, closed, context, userState, is5Safes, showLoginModal}) => {
	let datasets = [],
		title = '',
		subTitle = '',
		contactPoint = '',
		dataRequestModalContent = { header: '', body: '' },
		showActionButtons;

	const { loggedIn: isLoggedIn } = userState;
	const [screenData, setScreenData] = useState({});

	const initScreenData = () => {
		if (typeof context !== 'undefined' && !_.isEmpty(context) && !_.isEmpty(context.datasets)) {
			({ datasets, title, subTitle, contactPoint, dataRequestModalContent, showActionButtons = true } = context);
			setScreenData({ datasets, title, subTitle, contactPoint, dataRequestModalContent, showActionButtons });
		}
	};

	const onCloseModal = (showEnquiry = false) => {
		// 1. if user is not loggedIn and wants to make enquiry make them sign in
		if (!isLoggedIn && showEnquiry) {
			// 2. close modal and do not show enquiry - false;
			closed(false);
			// 3. Show the loginPanel
			DataSetHelper.showLoginPanel(window, _.isEmpty(title) ? screenData.subTitle : title);
		} else {
			// 4. do normal operation
			closed(showEnquiry);
		}
	}

	useEffect(() => {
		if (open) initScreenData();
	}, [open, context]);

	return (
		<Fragment>
			<Modal show={open} onHide={closed} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
				<div className='appModal-header'>
					<div className='appModal-header--wrap'>
						<div className='appModal-head'>
							<h1 className='black-20-semibold'>Data access requests</h1>
							<CloseButtonSvg className='appModal-head--close' onClick={() => onCloseModal('CLOSE')} />
						</div>
						{!_.isEmpty(screenData.dataRequestModalContent) && typeof screenData.dataRequestModalContent.header !== 'undefined' ? (
							<ReactMarkdown source={screenData.dataRequestModalContent.header} />
						) : (
							''
						)}
					</div>
				</div>

				<div className='appModal-body'>
					{!_.isEmpty(screenData.dataRequestModalContent) && typeof screenData.dataRequestModalContent.body !== 'undefined' ? (
						<ReactMarkdown source={screenData.dataRequestModalContent.body} />
					) : (
						''
					)}
				</div>

				<div className='appModal-footer'>
					{screenData.showActionButtons ? (
						<div className='appModal-footer--wrap'>
							{ is5Safes ?
							<button className='button-secondary mr-2' onClick={() => {isLoggedIn ? onCloseModal('SUBMIT_APPLICATION') : showLoginModal()}}>
								Request access
							</button> 
							: null}
							<button className='btn btn-primary addButton' onClick={() => {isLoggedIn ? onCloseModal('ENQUIRY') : showLoginModal()}}>
								Make an enquiry
							</button>
						</div>
					) : null}
				</div>
			</Modal>
		</Fragment>
	);
};

DataSetModal.defaultProps = {
	closed: () => {},
	context: {},
	userState: {},
	open: false,
};

export default DataSetModal;
