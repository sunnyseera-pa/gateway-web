import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';
import { Event } from '../../../tracking';
import DataSetHelper from '../../../utils/DataSetHelper.util';

import './DataSetModal.scss';

const DataSetModal = ({ open, closed, context, userState }) => {

	let dataset = {}, datasetId = '', title = '', contactPoint = '', dataRequestModalContent = {} ;

	if(typeof context !== 'undefined' && !_.isEmpty(context)) {
		 ({datasets: [dataset], title, contactPoint, dataRequestModalContent } = context);
		 ({datasetId } = dataset);
	}

	const { loggedIn: isLoggedIn } = userState;

	let history = useHistory();

	const onRequestAccess = (e) => {
		// 1. stop default click
		e.preventDefault();
		// 2. check user loggedIn status if not make user login
		if (!isLoggedIn) {
			// 2a. close modal and do not show enquiry - false;
			closed(false);
			// 2b. Show the loginPanel
			DataSetHelper.showLoginPanel(window, title, contactPoint);
		} else {
			// 2. log google analytics event (Category-Action-Label)
			Event('Buttons', 'Click', 'Request Access');
			// 3. redirect to access request
			history.push({ pathname: `/data-access-request/dataset/${datasetId}` });
		}
	};

	const onCloseModal = (showEnquiry = false) => {
		// 1. if user is not loggedIn and wants to make enquiry make them sign in
		if (!isLoggedIn && showEnquiry) {
			// 2. close modal and do not show enquiry - false;
			closed(false);
			// 3. Show the loginPanel
			DataSetHelper.showLoginPanel(window, title, contactPoint);
		} else {
			// 4. do normal operation
			closed(showEnquiry);
		}
	};

	return (
		<Fragment>
			<Modal
				show={open}
				onHide={closed}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<div className='appModal-header'>
					<div className='appModal-header--wrap'>
						<div className='appModal-head'>
							<h1 className='black-20-semibold'>Data access requests</h1>
							<CloseButtonSvg
								className='appModal-head--close'
								onClick={() => onCloseModal(false)}
							/>
						</div>
						{ dataRequestModalContent.header ? <ReactMarkdown source={dataRequestModalContent.header}/> : ''}
					</div>
				</div>


				<div className='appModal-body'>
					{ dataRequestModalContent.body ? <ReactMarkdown source={dataRequestModalContent.body} /> : '' }
				</div>

				<div className='appModal-footer'>
					<div className='appModal-footer--wrap'>
						<button
							className='button-secondary mr-2'
							onClick={(e) => onRequestAccess(e)}
						>
							Request access
						</button>
						<button
							className='btn btn-primary addButton'
							onClick={() => onCloseModal(true)}
						>
							Make an Enquiry
						</button>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
};

DataSetModal.defaultProps = {
	closed		: () => {},
	context		: {},
	userState	: {},
	open		: false
};

export default DataSetModal;
