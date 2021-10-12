import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AlertModal from '../AlertModal';

const cmsURL = require('../../commonComponents/BaseURL').getCMSURL();

const ErrorModal = ({ onClose }) => {
	const [show, setShow] = React.useState(true);

	const handleClose = React.useCallback(() => {
		if (onClose) onClose(false);
		setShow(false);

		//For analytics dashboard (at least), history push doesn't work

		// history.push({ pathname: '/' });
		window.location.pathname = '/';
	}, []);

	return (
		<AlertModal
			header='Oops! Something went wrong!'
			body={
				<>
					This issue has been automatically reported to our team!
					<br />
					If this issue continues, please contact support by clicking <a href={`${cmsURL}/HDRUKGatewaySupportPortal`}>here.</a>
				</>
			}
			footer={<Button onClick={handleClose}>Close</Button>}
			variant='error'
			onHide={handleClose}
			show={show}
		/>
	);
};

ErrorModal.propTypes = {
	onClose: PropTypes.func,
};

export default ErrorModal;
