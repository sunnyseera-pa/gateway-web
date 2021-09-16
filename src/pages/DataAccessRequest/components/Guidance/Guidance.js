import React, { Fragment } from 'react';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import ReactMarkdown from 'react-markdown';

const Guidance = ({ activeGuidance }) => {
	return (
		<Fragment>
			{activeGuidance ? (
				<Fragment>
					<main className='gray800-14'>
						<ReactMarkdown className='gray800-14' source={activeGuidance} />
					</main>
				</Fragment>
			) : (
				<div className='darTab-guidance'>Click on a question guidance to view details</div>
			)}
		</Fragment>
	);
};

export default Guidance;
