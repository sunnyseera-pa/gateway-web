import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';
import { Event } from '../../../tracking';
import DataSetHelper from '../../../utils/DataSetHelper.util';
import _ from 'lodash'

import './DataSetModal.scss';

const DataSetModal = ({ open, closed, context, userState }) => {

	let dataset = {}, datasetId = '', title = '', contactPoint = '';

    if(typeof context !== 'undefined' && !_.isEmpty(context)) {
         ({datasets: [dataset], title, contactPoint } = context);
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

						<p>
							We are responsible for the largest programme of clinical audit in
							the UK. Our data access request service ensures that data from
							programmes we commission and host – including the data collected
							through our national clinical audit and patient outcome programme
							(NCAPOP) – is available for research, quality improvement, service
							evaluation and evidence-based decision making.
						</p>
					</div>
				</div>

				<div className='appModal-body'>
					<div className='appModal-body--item'>
						<h2 className='black-bold-17'>Before you submit an application</h2>
						<p className='gray800-14'>
							Not all enquiries progress to the application stage. It may be
							that the data you need is available through our existing published
							data. Please read the following information to see if the data you
							require is available from another source before proceeding with
							your application.
							<br />
							<br />
							We commission approximately 40 national clinical audits and
							clinical outcome review programmes which make up the National
							Clinical Audit and Patient Outcomes Programme (NCAPOP). We also
							commission some projects outside the NCAPOP and we host the
							National Joint Registry.
							<br />
							<br />
							These projects collect data on the quality and outcomes of care in
							England and Wales. Some projects also collect data in Scotland,
							Northern Ireland, Isle of Man, Guernsey and Jersey, either under
							contract to HQIP or separately.
							<br />
							<br />
							Data from these projects is routinely reported and these reports
							are available on each project website, as well as on our website.
							The reported data is also placed on the data.gov.uk website.
							<br />
							<br />
							We also work to routinely to place outcomes data on the NHS
							Choices website. Many of these projects link with third party data
							sets such as Hospital Episode Statistics (HES) and Office for
							National Statistics (ONS) data which are managed by NHS Digital.
							<br />
							<br />
							If you have determined that a data access application is still
							necessary, you should make contact with the relevant HQIP data
							provider (i.e. the HQIP commissioned or hosted project) before you
							submit an application. The HQIP data provider will need to advise
							if your data requirements can be met and will need to review and
							approve your application ahead of it being submitted to HQIP. You
							can find details of data providers here.
							<br />
							<br />
							If you wish to make a request for National Joint Registry data,
							please ensure you have read their approvals process.
						</p>
					</div>

					<div className='appModal-body--item'>
						<h2 className='black-bold-17'>When can we release data</h2>
						<p className='gray800-14'>
							We can authorise the release of data for which we are the
							controller. For most of the projects in the NCAPOP programme, we
							are a joint controller along with the programme funder.
							<br />
							<br />
							Some data that we collect is not placed in the public domain.
							However, as the controller, we can share this data for the purpose
							of quality improvement, including research, service evaluation,
							and audit, if certain conditions are met and depending upon
							permissions in place for each project.
						</p>
					</div>
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
