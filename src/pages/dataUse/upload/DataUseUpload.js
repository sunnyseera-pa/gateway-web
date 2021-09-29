import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file';
import convertToJson from 'read-excel-file/schema';
import { Container, Row, Col, Alert, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isEmpty, some, find } from 'lodash';
import Loading from './../../commonComponents/Loading';

import SVGIcon from '../../../images/SVGIcon';
import './../DataUse.scss';
import DataUseSubmitModal from './DataUseSubmitModal';
import dataUseSchema from './DataUseSchema';

const DataUseUpload = React.forwardRef(({ userState, team }, ref) => {
	React.useImperativeHandle(ref, () => ({
		toggleSubmitModal,
	}));

	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
	const [alert, setAlert] = useState('');
	const [uploadedDataUses, setUploadedDataUses] = useState({});
	const [uploadErrors, setUploadErrors] = useState([]);

	const onUploadDataUseRegister = event => {
		// setIsLoading(true);

		// setTimeout(() => {
		// 	setIsLoading(false);
		// 	showAlert('Your data uses have been successfully uploaded');
		// 	setIsUploadedSuccessfully(true);
		// }, 1000);

		readXlsxFile(event.target.files[0], { sheet: 'Data Uses Template' }).then(spreadsheet => {
			//nested header getting rid of the first row to allow mapping against the schema (see DataUseUploadTemplate.xlsx)
			spreadsheet.shift();
			const { rows, errors } = convertToJson(spreadsheet, dataUseSchema);

			setUploadErrors(errors);

			rows.teamId = team;
			setUploadedDataUses(rows);
		});
	};

	const submitDataUse = () => {
		console.log('data use submitted');
	};

	const toggleSubmitModal = () => {
		setIsSubmitModalVisible(!isSubmitModalVisible);
	};

	const showAlert = alert => {
		setAlert(alert);
		setTimeout(() => setAlert(''), 10000);
	};

	const renderUploadError = error => {
		switch (error.error) {
			case 'required': {
				return (
					<p>
						Error in row {error.row}: Mandatory field “{error.column}” is empty
					</p>
				);
			}
			default: {
				return '';
			}
		}
	};

	return (
		<>
			<Container>
				{!isEmpty(alert) && (
					<Alert variant={'success'}>
						<SVGIcon name='check' width={24} height={24} fill={'#2C8267'} /> {alert}
					</Alert>
				)}
				<Row className='datause-card'>
					<p className='black-20-semibold'>Upload Data uses</p>

					<p className='soft-black-14'>
						Please use the template provided to add new approved data uses . You can also download your current data use register from the
						Gateway, edit offline and uploading the edited file here:{' '}
					</p>

					<button className='button-tertiary'>
						<Link to='/DataUseUploadTemplate.xlsx' download target='_blank'>
							Download the data use template
						</Link>{' '}
					</button>
				</Row>
				<Row className='datause-card'>
					{isLoading ? (
						<Loading />
					) : (
						<Col>
							<Row>
								<p className='black-20-semibold'>Upload</p>
							</Row>
							<Row>
								<label className='btn button-tertiary'>
									<input name='dataUseSpreadSheet' type='file' style={{ display: 'None' }} onChange={onUploadDataUseRegister} />
									<span>Select file...</span>
								</label>
							</Row>

							{!isEmpty(uploadedDataUses) && isEmpty(uploadErrors) && (
								<Row>
									<Alert variant='warning'>
										Warning! Uploading a new file will delete any data uses that have not yet been submitted for admin checks by the gateway
										team.
									</Alert>
								</Row>
							)}
							{!isEmpty(uploadedDataUses) && !isEmpty(uploadErrors) && (
								<Row>
									<Alert variant='danger'>
										There are errors in the data you uploaded. Please correct these and try again. Errors are listed below.
									</Alert>
								</Row>
							)}
						</Col>
					)}
				</Row>

				{!isEmpty(uploadedDataUses) ? (
					<Row className='datause-card'>
						{isEmpty(uploadErrors) ? (
							<p className='black-20-semibold'>Upload Data</p>
						) : (
							<>
								<p className='dark-red-semibold-20'>Upload Data Errors</p>
								<Alert variant='danger'>{uploadErrors.map(error => renderUploadError(error))}</Alert>
							</>
						)}

						<Table responsive size='sm' className='margin-top-8'>
							{uploadedDataUses.length !== 0 ? (
								<thead>
									<tr className='gray800-14-bold'>
										<th>Project title</th>
										<th>Dataset(s)</th>
										<th>Organisation</th>
										<th>Approval date</th>
									</tr>
								</thead>
							) : (
								''
							)}
							<tbody>
								{uploadedDataUses.map((data, index) => {
									const filtered = uploadErrors.filter(dat => dat.row === index + 1);

									return (
										<tr className='gray800-14'>
											<td className={some(filtered, ['column', 'Project Title*']) ? 'invalid-info table-cell' : 'table-cell'}>
												{some(filtered, ['column', 'Project Title*'])
													? find(filtered, ['column', 'Project Title*']).value
													: data.projectTitle}
											</td>
											<td className={some(filtered, ['column', 'Dataset(s) Name*']) ? 'invalid-info table-cell' : 'table-cell'}>
												{some(filtered, ['column', 'Dataset(s) Name*'])
													? find(filtered, ['column', 'Dataset(s) Name*']).value
													: data.datasetNames}
											</td>
											<td className={some(filtered, ['column', 'Organisation ID']) ? 'invalid-info table-cell' : 'table-cell'}>
												{some(filtered, ['column', 'Organisation ID'])
													? find(filtered, ['column', 'Organisation ID']).value
													: data.organisationName}
											</td>
											<td className={some(filtered, ['column', 'Latest Approval Date*']) ? 'invalid-info table-cell' : 'table-cell'}>
												{some(filtered, ['column', 'Latest Approval Date*'])
													? find(filtered, ['column', 'Latest Approval Date*']).value
													: data.latestApprovalDate.toString()}
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Row>
				) : (
					''
				)}
			</Container>
			<DataUseSubmitModal
				open={isSubmitModalVisible}
				close={toggleSubmitModal}
				confirm={submitDataUse}
				isValid={isEmpty(uploadErrors)}
				isAdmin={team === 'admin'}
			/>
		</>
	);
});

export default DataUseUpload;
