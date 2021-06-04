import React, { Fragment } from 'react';

const Guidance = ({ activeGuidance, resetGuidance }) => {
	return (
		<Fragment>
			{activeGuidance ? (
				<Fragment>
					<main className='gray800-14'>
						<span>{activeGuidance}</span>
					</main>
				</Fragment>
			) : (
				<div className='darTab-guidance'>Click on a question guidance to view details</div>
			)}
		</Fragment>
	);
};

export default Guidance;
