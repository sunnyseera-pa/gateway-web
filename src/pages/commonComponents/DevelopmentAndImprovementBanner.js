import React from 'react';
import Alert from 'react-bootstrap/Alert';
import './DevelopmentAndImprovementBanner.scss';

const DevelopmentAndImprovementBanner = () => {
	return (
		<Alert.Link
			target='_blank'
			className='dev-and-improv-banner'
			href='https://discourse.healthdatagateway.org/t/about-the-development-and-improvement-group/498'
			data-test-id='dev-and-improvement'>
			Want to get involved in shaping the Gateway? Join our development and improvement group.
		</Alert.Link>
	);
};

export default DevelopmentAndImprovementBanner;
