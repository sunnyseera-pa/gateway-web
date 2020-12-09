import React, { Fragment } from 'react';

const AmendmentCount = ({answeredAmendments, unansweredAmendments}) => {
	return (
        ( 
            unansweredAmendments > 0 || answeredAmendments > 0 ? 
            <Fragment>
                <div className='amendment-count mr-3'>
                    { answeredAmendments }/{ unansweredAmendments + answeredAmendments } updates completed
                </div>
            </Fragment>
            : ''
        )
	);
};

export default AmendmentCount;
