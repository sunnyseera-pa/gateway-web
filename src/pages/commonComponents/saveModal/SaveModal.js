import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import './SaveModal.scss';

var baseURL = require('../../commonComponents/BaseURL').getURL();

const SaveModal = ({ show, onHide, showAlert }) => {
	const [title, setTitle] = useState('');
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);
	const [close, setClose] = useState(null);
	const [savedAlert, setSavedAlert] = useState(null);
	const [validation, setValidation] = useState({});

	const handleSubmit = () => {
		const data = {
			title: title,
		};
		axios
			.post(baseURL + '/api/v1/search-preferences', { data })
			.then(res => {
				setData(res.data);
				setTitle('');
				console.log('works');
				setClose(onHide);
				setSavedAlert(!showAlert);
			})
			.catch(err => {
				setError(true);
				console.log(err);
			});
	};

	const formik = useFormik({
		initialValues: {
			title: '',
		},

		validationSchema: Yup.object({
			title: Yup.string().required('This cannot be empty'),
		}),

		onSubmit: values => {
			axios
				.post(baseURL + '/api/v1/search-preferences', { data })
				.then(res => {
					setData(res.data);
					setTitle('');
					console.log('works');
					setClose(onHide);
					setSavedAlert(!showAlert);
				})
				.catch(err => {
					setError(true);
					console.log(err);
				});
		},
	});

	return (
		<Modal show={show} onHide={onHide} className='save-modal'>
			<Modal.Header closeButton>
				<h5 className='black-20-semibold'>Saved search preference</h5>
			</Modal.Header>
			<Modal.Body>
				<p className='black-14'>Are you sure you want to save this search preference? If yes, please provide a title for this search.</p>
				<label className='black-14'>Title</label>
				<input type='text' className='save-modal-input' value={title} onChange={e => setTitle(e.target.value)} required />
				{formik.touched.title && formik.errors.name ? <div className='errorMessages'>{formik.errors.name}</div> : null}
			</Modal.Body>
			<Modal.Footer className='saved-modal-footer'>
				<Button variant='outline-primary saved-no' onClick={onHide}>
					No, nevermind
				</Button>
				<Button type='submit' save onClick={formik.handleSubmit}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SaveModal;
