import React from 'react';
import { Modal, Button, Form, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import 'react-datepicker/dist/react-datepicker.css';
import './AddNewEventModal.scss';
import DatePicker from 'react-datepicker';
var baseURL = require('../../../commonComponents/BaseURL').getURL();

const AddNewEventModal = ({ dataAccessRequest, isOpened, close, onClickAddEvent }) => {
	const formik = useFormik({
		initialValues: {
			eventTitle: '',
			applicationVersion: dataAccessRequest.versions[0].detailedTitle,
			eventDate: new Date(),
		},

		validationSchema: Yup.object({
			eventTitle: Yup.string().required('This cannot be empty'),
		}),

		onSubmit: values => {
			axios.put(baseURL + '/api/v1/person', values).then(res => {
				window.location.href = '/account?tab=youraccount&accountUpdated=true';
			});
		},
	});

	return (
		<Modal show={isOpened} onHide={close} className='addNewEventModal'>
			<CloseButtonSvg className='addNewEventModal-close' onClick={close} />
			<div className='addNewEventModal-header'>
				<h1 className='black-20-semibold'>Add new event</h1>
				<div className='addNewEventModal-subtitle'>
					Are you sure you want to add an event to this activity log? This will also be added to the applicants activity log.
				</div>
			</div>

			<div className='addNewEventModal-body'>
				<Form onSubmit={formik.handleSubmit}>
					<Row className='mr-0 ml-0 mt-2 mb-2'>
						<Form.Label className='gray800-14'>Event title</Form.Label>
						<Form.Control
							id='eventTitle'
							name='eventTitle'
							type='text'
							className={formik.touched.firstname && formik.errors.firstname ? 'emptyFormInput addFormInput' : 'addFormInput'}
							onChange={formik.handleChange}
							value={formik.values.eventTitle}
							onBlur={formik.handleBlur}
							data-test-id='event-title'
						/>
					</Row>
					<Row className='mr-0 ml-0 mt-2 mb-2'>
						<Form.Label className='gray800-14'>Date and time</Form.Label>
						<DatePicker
							name={`eventDate`}
							timeFormat='HH:mm'
							timeCaption='time'
							showMonthDropdown
							showYearDropdown
							dateFormat='d MMMM yyyy, h:mm aa'
							className='addEventModalDatePicker'
							showTimeSelect
							selected={formik.values.eventDate}
							onChange={eventDate => {
								formik.values.eventDate = eventDate;
								formik.setFieldValue();
							}}
							onBlur={formik.handleBlur}
						/>
					</Row>
					<Row className='mr-0 ml-0 mt-2 mb-2'>
						<Form.Label className='gray800-14'>Application version</Form.Label>
						<DropdownButton
							variant='white'
							title={formik.values.applicationVersion}
							className={'custom-dropdown'}
							onChange={selected => {
								formik.setFieldValue('sector', selected.target.value);
							}}
							value={formik.values.applicationVersion}
							onBlur={() => formik.setFieldTouched('applicationVersion', true)}
							touched={formik.touched.applicationVersion}
							// onSelect={selected => handleSectorSelect(selected)}
							id='application-version'>
							{dataAccessRequest.versions.map((version, i) => (
								<Dropdown.Item
									className='gray800-14 width-100'
									key={version._id}
									eventKey={version._id}
									data-test-id={`application-version-option-${i}`}>
									{version.detailedTitle}
								</Dropdown.Item>
							))}
						</DropdownButton>
					</Row>
				</Form>
			</div>

			<div className='workflowModal-footer'>
				<div className='workflowModal-footer--wrap'>
					<Button variant='white' className='techDetailButton mr-2' onClick={close}>
						No, nevermind
					</Button>
					<Button variant='primary' className='white-14-semibold' onClick={onClickAddEvent}>
						Add Event
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default AddNewEventModal;
