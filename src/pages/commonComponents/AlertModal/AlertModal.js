/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import * as styles from './AlertModal.styles';

const AlertModal = ({ header, body, footer, ...outerProps }) => {
	return (
		<Modal {...outerProps} aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header>
				<Modal.Title id='contained-modal-title-vcenter'>{header}</Modal.Title>
			</Modal.Header>
			<Modal.Body css={styles.modalBody} className='gray800-14'>
				{body}
			</Modal.Body>
			<Modal.Footer css={styles.modalFooter}>{footer}</Modal.Footer>
		</Modal>
	);
};

AlertModal.propTypes = {
	onHide: PropTypes.func,
	show: PropTypes.bool,
	variant: PropTypes.oneOf(['error', 'success', 'info', 'warning']),
	header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	body: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

AlertModal.defaultProps = {
	show: false,
};

export default AlertModal;
