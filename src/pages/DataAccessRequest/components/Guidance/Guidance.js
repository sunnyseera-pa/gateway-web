import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';

const Guidance = ({ activeGuidance }) => {
	return (
		<Fragment>
			{activeGuidance ? (
				<Fragment>
					<main className='gray800-14'>
						<ReactMarkdown source={activeGuidance} linkTarget='_blank' />
					</main>
				</Fragment>
			) : (
				<div className='darTab-guidance'>Click on a question guidance to view details</div>
			)}
		</Fragment>
	);
};

export default Guidance;
