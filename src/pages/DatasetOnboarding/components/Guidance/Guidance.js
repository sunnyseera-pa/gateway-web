import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';

const Guidance = ({activeGuidance, resetGuidance}) => {
	return (
    <Fragment>
    {activeGuidance ? (
				<Fragment>
					<header>
						<div>
							<i className='far fa-question-circle mr-2' />
							<p className='gray800-14-bold'>Guidance</p>
						</div>
						<CloseButtonSvg width='16px' height='16px' fill='#475da' onClick={resetGuidance} />
					</header>
					<main className='gray800-14'>
                        <ReactMarkdown source={activeGuidance} />
					</main>
				</Fragment>
			) : (
				<div className='darTab-guidance'>Click on a question guidance to view details</div>
			)}
    </Fragment>
	);
};

export default Guidance;
