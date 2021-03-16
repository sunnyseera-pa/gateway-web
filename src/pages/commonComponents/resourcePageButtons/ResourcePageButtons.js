import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AddToCollection from '../addToCollection/AddToCollection';

const ResourcePageButtons = props => {
	const [type, setType] = useState('');

	useEffect(() => {
		if (props.isCollection === true) {
			setType('collection');
		} else {
			setType(props.data.type);
		}
	}, []);

	return (
		<div className='floatRight row'>
			{props.userState[0].loggedIn &&
			props.data.type !== 'dataset' &&
			((props.data.authors && props.data.authors.includes(props.userState[0].id)) ||
				(props.data.creator && props.data.creator[0].id === props.userState[0].id) ||
				props.userState[0].role === 'Admin') ? (
				<Button variant='white' href={'/' + type + '/edit/' + props.data.id} className='techDetailButton mr-2'>
					Edit
				</Button>
			) : (
				''
			)}

			{props.data.type === 'dataset' ? ( //Update to use team or admin
				<Button variant='white' href={'/dataset-onboarding/' + props.data._id} className='techDetailButton mr-2'>
					Edit
				</Button>
			) : (
				''
			)}

			{props.data.type === 'dataset' ? (
				<Button
					variant='white'
					href={'https://metadata-catalogue.org/hdruk/#/catalogue/dataModel/' + props.data.datasetid}
					target='_blank'
					className='techDetailButton mr-2'>
					Technical details
				</Button>
			) : (
				''
			)}

			{props.userState[0].loggedIn && props.isCollection !== true ? (
				<AddToCollection className='addToCollectionButton' data={props.data} userState={props.userState} />
			) : (
				''
			)}
		</div>
	);
};

export default ResourcePageButtons;
