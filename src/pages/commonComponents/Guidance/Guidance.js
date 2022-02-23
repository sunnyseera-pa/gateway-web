import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';

const Guidance = ({ renderTooltip, text, id }) => {
	return (
		<OverlayTrigger placement='top' overlay={renderTooltip(`${text}`)} data-testid={id}>
			<button className='datause-info-icon-button'>
				<SVGIcon name='info' width={10} height={10} fill={'#475da7'} className='datause-info-icon' />
			</button>
		</OverlayTrigger>
	);
};

Guidance.propTypes = {
	renderTooltip: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	id: PropTypes.string,
};

Guidance.defaultProps = {
	renderTooltip: () => {},
	text: '',
	id: '',
};

export default Guidance;
