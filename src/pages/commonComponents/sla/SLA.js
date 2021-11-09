import React from 'react';
import './SLA.scss';

export default ({ classProperty = '', text = '' }) => {
	console.log('classProperty', classProperty);

	return <div className={`sla sla-${classProperty}`}>{text}</div>;
};
