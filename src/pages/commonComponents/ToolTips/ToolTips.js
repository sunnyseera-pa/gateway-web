import React, { useState } from 'react';
import './ToolTip.scss';

const ToolTips = props => {
	const [active, setActive] = useState(false);

	const showTip = () => {
		setActive(true);
	};

	const hideTip = () => {
		setActive(false);
	};

	return (
		<div className={`inlineBlock ${props.class}`}>
			<div onMouseEnter={showTip} onMouseLeave={hideTip}>
				{props.children}
			</div>
			{active && (
				<div className='toolTip'>
					<div className='white-13-semibold'>{props.content}</div>
				</div>
			)}
		</div>
	);
};

export default ToolTips;
