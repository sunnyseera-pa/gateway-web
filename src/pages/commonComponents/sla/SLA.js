import React from 'react';
import './SLA.scss';

export default ({ classProperty = '', text = '' }) => {
	return (
		<div className={`sla sla-${classProperty}`} data-testid={classProperty}>
			{text}
		</div>
	);
};
