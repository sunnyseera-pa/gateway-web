import React, { Fragment } from 'react';
import './SaveModal.scss';

const SaveModal = () => {
	return (
		<Fragment>
			<p>Saved search preference</p>
			<p>Are you sure you want to save this search preference? If yes, please provide a title for this search.</p>
			<label>Title</label>
			<input type='text' />
			<button>No, nevermind</button>
			<button>Save</button>
		</Fragment>
	);
};

export default SaveModal;
