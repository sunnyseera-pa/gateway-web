import React, { Fragment, useMemo, useState } from 'react';
import { useEffect } from 'react';

const AmendmentCount = ({ answeredAmendments = 0, unansweredAmendments = 0 }) => {



    const runHeavyCalc = (answeredAmendments, unansweredAmendments)  => {
        debugger;
        // Math.floor is not heavy, use your imagination again
        return answeredAmendments  +  unansweredAmendments;
      }
      


    const result = useMemo(() => runHeavyCalc(answeredAmendments, unansweredAmendments), [answeredAmendments, unansweredAmendments]);

	return unansweredAmendments > 0 || answeredAmendments > 0 ? (
		<Fragment>
			<div className='amendment-count mr-3'>
				{answeredAmendments} / {result} updates completed
			</div>
		</Fragment>
	) : (
		''
	);
};

export default AmendmentCount;
