import React, { Fragment, useState } from 'react';
import readXlsxFile from 'read-excel-file';
import convertToJson from 'read-excel-file/schema';
import { Row, Col, Alert, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isEmpty, some, find } from 'lodash';
import axios from 'axios';
import { SlideDown } from 'react-slidedown';
import moment from 'moment';

import SVGIcon from '../../../images/SVGIcon';

import DataUseSubmitModal from './DataUseSubmitModal';
import dataUseSchema from './DataUseSchema';

import './DataUseUpload.scss';

var baseURL = require('../../commonComponents/BaseURL').getURL();

const DataUseUpload = React.forwardRef(({ userState, onSubmit, team, dataUsePage }, ref) => {
	React.useImperativeHandle(ref, () => ({
		toggleSubmitModal,
	}));

	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
	const [alert, setAlert] = useState('');
	const [uploadedData, setUploadedData] = useState({ rows: [], uploadErrors: [], checks: [] });
	const [dataUseIndexes, setDataUseIndexes] = useState([]);

	const onUploadDataUseRegister = async event => {
		setIsLoading(true);

		const spreadsheet = await readXlsxFile(event.target.files[0], { sheet: 'Data Uses Template' });
		spreadsheet.shift();
		const { rows, errors } = convertToJson(spreadsheet, dataUseSchema);
		const checks = await checkDataUses(rows);
		const duplicateErrors = createDuplicateErrors(checks);
		const uploadErrors = [...duplicateErrors, ...errors];

		setUploadedData({ rows, uploadErrors, checks });

		if (isEmpty(uploadErrors)) {
			showAlert('Your data uses have been successfully uploaded.');
		}
		setIsLoading(false);
	};

	const submitDataUse = () => {
		const payload = {
			teamId: team,
			dataUses: uploadedData.rows,
		};

		axios.post(baseURL + '/api/v2/data-use-registers/upload', payload).then(res => {
			setIsSubmitModalVisible(false);
			onSubmit();
			dataUsePage.current.showSubmissionAlert();
		});
	};

	const checkDataUses = async rows => {
		const payload = {
			teamId: team,
			dataUses: rows,
		};

		let response = await axios.post(baseURL + '/api/v2/data-use-registers/check', payload);
		return response.data.result;
	};

	const toggleSubmitModal = () => {
		setIsSubmitModalVisible(!isSubmitModalVisible);
	};

	const showAlert = alert => {
		setAlert(alert);
		setTimeout(() => setAlert(''), 10000);
	};

	const createDuplicateErrors = checks => {
		const duplicateErrors = [];

		checks.forEach((check, index) => {
			if (check.isDuplicated) {
				duplicateErrors.push({ row: index + 1, error: 'duplicate' });
			}
		});
		return duplicateErrors;
	};

	const hiddenFileInput = React.useRef(null);

	const handleClick = () => {
		hiddenFileInput.current.click();
	};

	const renderUploadError = error => {
		switch (error.error) {
			case 'required': {
				return (
					<div>
						Error in row {error.row}: Mandatory field “{error.column}” is empty
					</div>
				);
			}
			case 'duplicate': {
				return <div>Error in row {error.row} : Suspected data use duplicate</div>;
			}
			default: {
				return '';
			}
		}
	};

	const toggleDataUseSection = dataUseIndex => {
		const newArray = dataUseIndexes.includes(dataUseIndex)
			? dataUseIndexes.filter(index => index !== dataUseIndex)
			: [...dataUseIndexes, dataUseIndex];

		setDataUseIndexes(newArray);
	};

	const renderApplicants = dataUse => {
		const dataUseCheck = findDataUseCheck(dataUse);
		const gatewayApplicantsLinks = dataUseCheck.gatewayApplicants.map(gatewayApplicant => {
			return (
				<Link className='data-use-link' to={'/person/' + gatewayApplicant.id} target='_blank'>
					{`${gatewayApplicant.firstname}  ${gatewayApplicant.lastname}`}
				</Link>
			);
		});

		const namedApplicants = dataUseCheck.nonGatewayApplicants.map(nonGatewayApplicant => {
			return <div>{nonGatewayApplicant}</div>;
		});

		return [...gatewayApplicantsLinks, ...namedApplicants];
	};

	const renderDatasets = dataUse => {
		const dataUseCheck = findDataUseCheck(dataUse);
		const linkedDatasets = dataUseCheck.linkedDatasets.map(linkedDataset => {
			return (
				<Link className='data-use-link' to={'/dataset/' + linkedDataset.datasetid} target='_blank'>
					{linkedDataset.name}
				</Link>
			);
		});

		const namedDatasets = dataUseCheck.namedDatasets.map(namedDataset => {
			return (
				<div className='data-use-namedDataset'>
					<OverlayTrigger placement='top' overlay={<Tooltip>This dataset is not linked on the Gateway</Tooltip>}>
						<div>
							<SVGIcon name='attention' width={22} height={22} fill={'#f0bb24'} viewBox='0 -3 22 22' />
						</div>
					</OverlayTrigger>{' '}
					{namedDataset}
				</div>
			);
		});

		return [...linkedDatasets, ...namedDatasets];
	};

	const findDataUseCheck = dataUse => {
		const dataUseCheck = uploadedData.checks.find(
			el =>
				el.projectIdText === dataUse.projectIdText ||
				(el.projectTitle === dataUse.projectTitle &&
					el.laySummary === dataUse.laySummary &&
					el.organisationName === dataUse.organisationName &&
					el.datasetTitles === dataUse.datasetTitles &&
					el.latestApprovalDate === dataUse.latestApprovalDate)
		);

		return dataUseCheck;
	};

	return (
		<Row>
			<Col xs={1}></Col>
			<Col>
				{!isEmpty(alert) && (
					<Alert variant={'success'} className='main-alert'>
						<SVGIcon name='check' width={24} height={24} fill={'#2C8267'} /> {alert}
					</Alert>
				)}

				<div className='layoutCard p-4'>
					<p className='black-20-semibold mb-2'>Upload Data uses</p>

					<p className='dataUseSubHeader mb-4'>
						Please use the template provided to add new approved data uses . You can also download your current data use register from the
						Gateway, edit offline and uploading the edited file here:{' '}
					</p>

					<button className='button-tertiary'>
						<Link style={{ color: '#29235c' }} to='/DataUseUploadTemplate.xlsx' download target='_blank'>
							Download the data use template
						</Link>{' '}
					</button>
				</div>
				<div className={isLoading ? 'layoutCard p-4 opacity' : 'layoutCard p-4'}>
					<>
						{isLoading && (
							<div className='dataUseLoading'>
								<Image src={require('../../../images/Loader.gif')} />
								<div className='gray800-14'>Loading...</div>
							</div>
						)}

						<div>
							<input type='file' id='input' accept='.xls,.xlsx' hidden ref={hiddenFileInput} onChange={onUploadDataUseRegister} />
							<p className='black-20-semibold margin-bottom-16'>Upload</p>
							<div className='upload mb-3'>
								<button className='button-tertiary ' onClick={handleClick}>
									Select file...
								</button>
								<span className='gray700-alt-13'>Excel or xls. Max 10MB per file.</span>
							</div>
						</div>

						{!isEmpty(uploadedData.rows) && isEmpty(uploadedData.uploadErrors) && (
							<Alert variant='warning'>
								Warning! Uploading a new file will delete any data uses that have not yet been submitted for admin checks by the gateway
								team.
							</Alert>
						)}
						{!isEmpty(uploadedData.rows) && !isEmpty(uploadedData.uploadErrors) && (
							<Alert variant='danger'>
								There are errors in the data you uploaded. Please correct these and try again. Errors are listed below.
							</Alert>
						)}
					</>
				</div>

				{!isEmpty(uploadedData.rows) ? (
					<div className='layoutCard p-4'>
						{isEmpty(uploadedData.uploadErrors) ? (
							<div className='black-20-semibold uploadDataTitle'>Upload Data</div>
						) : (
							<>
								<p className='dark-red-semibold-20'>Upload Data Errors</p>
								<Alert variant='danger'>{uploadedData.uploadErrors.map(error => renderUploadError(error))}</Alert>
							</>
						)}

						<div className='dataUseGrid'>
							<div className='gray800-14-bold dataUseGridItem'>Project title</div>
							<div className='gray800-14-bold dataUseGridItem'>Dataset(s)</div>
							<div className='gray800-14-bold dataUseGridItem'>Organisation</div>
							<div className='gray800-14-bold dataUseGridItem'>Approval date</div>

							{uploadedData.rows.map((data, index) => {
								const filtered = uploadedData.uploadErrors.filter(dat => dat.row === index + 1);
								return (
									<>
										<div
											className={
												some(filtered, ['error', 'duplicate'])
													? 'invalid-info dataUseGridItem duplicate-data-use'
													: some(filtered, ['column', 'Project Title*'])
													? 'invalid-info dataUseGridItem soft-black-14'
													: 'dataUseGridItem soft-black-14'
											}
											onClick={() => toggleDataUseSection(index)}>
											<SVGIcon
												name='chevronbottom'
												width={16}
												height={16}
												fill={'#3c4e8c'}
												className={!dataUseIndexes.includes(index) ? 'mr-3' : 'flip180 mr-3'}
											/>
											{some(filtered, ['column', 'Project Title*'])
												? find(filtered, ['column', 'Project Title*']).value
												: data.projectTitle}
										</div>
										<div
											className={
												some(filtered, ['error', 'duplicate'])
													? 'invalid-info dataUseGridItem duplicate-data-use'
													: some(filtered, ['column', 'Dataset(s) Name*'])
													? 'invalid-info dataUseGridItem soft-black-14'
													: 'dataUseGridItem soft-black-14'
											}
											onClick={() => toggleDataUseSection(index)}>
											{some(filtered, ['column', 'Dataset(s) Name*'])
												? find(filtered, ['column', 'Dataset(s) Name*']).value
												: renderDatasets(data)}
										</div>

										<div
											className={
												some(filtered, ['error', 'duplicate'])
													? 'invalid-info dataUseGridItem duplicate-data-use'
													: some(filtered, ['column', 'Organisation Name*'])
													? 'invalid-info dataUseGridItem soft-black-14'
													: 'dataUseGridItem soft-black-14'
											}
											onClick={() => toggleDataUseSection(index)}>
											{some(filtered, ['column', 'Organisation Name*'])
												? find(filtered, ['column', 'Organisation Name*']).value
												: data.organisationName}
										</div>
										<div
											className={
												some(filtered, ['error', 'duplicate'])
													? 'invalid-info dataUseGridItem duplicate-data-use'
													: some(filtered, ['column', 'Latest Approval Date*'])
													? 'invalid-info dataUseGridItem soft-black-14'
													: 'dataUseGridItem soft-black-14'
											}
											onClick={() => toggleDataUseSection(index)}>
											{some(filtered, ['column', 'Latest Approval Date*'])
												? find(filtered, ['column', 'Latest Approval Date*']).value
												: moment(data.latestApprovalDate).format('DD/MM/YY')}
										</div>

										<SlideDown className='dataUseDetails' closed={!dataUseIndexes.includes(index)}>
											<div className='dataUseDetailsGrid'>
												<div className='gray800-14-bold dataUseDetailsGridSection'>Safe People</div>
												<div className='dataUseDetailsGridHeader'>Project ID</div>
												<div className='dataUseDetailsGridItem'>{data.projectIdText}</div>

												<div className='dataUseDetailsGridHeader'>Organisation Name</div>
												<div
													className={
														some(filtered, ['column', 'Organisation Name*'])
															? 'invalid-info dataUseDetailsGridItem'
															: 'dataUseDetailsGridItem'
													}>
													{some(filtered, ['column', 'Organisation Name*'])
														? find(filtered, ['column', 'Organisation Name*']).value
														: data.organisationName}
												</div>
												<div className='dataUseDetailsGridHeader'>Organisation ID</div>
												<div className='dataUseDetailsGridItem'>{data.organisationId}</div>

												<div className='dataUseDetailsGridHeader'>Organisation Sector</div>
												<div className='dataUseDetailsGridItem'>{data.organisationSector}</div>

												<div className='dataUseDetailsGridHeader'>Applicant Name(s)</div>
												<div className='dataUseDetailsGridItem'>{renderApplicants(data)}</div>

												<div className='dataUseDetailsGridHeader'>Applicant ID</div>
												<div className='dataUseDetailsGridItem'>{data.organisationName}</div>

												<div className='dataUseDetailsGridHeader'>Funders/ Sponsors</div>
												<div className='dataUseDetailsGridItem'>{data.fundersAndSponsors}</div>
												<div className='dataUseDetailsGridHeader'>Accredited Researcher Status</div>
												<div className='dataUseDetailsGridItem'>{data.accreditedResearcherStatus}</div>
												<div className='dataUseDetailsGridHeader'>Sub-Licence Arrangements (if any)?</div>
												<div className='dataUseDetailsGridItem'>{data.sublicenceArrangements}</div>

												<div className='gray800-14-bold dataUseDetailsGridSection'>Safe Project</div>
												<div className='dataUseDetailsGridHeader'>Project Title</div>
												<div
													className={
														some(filtered, ['column', 'Project Title*']) ? 'invalid-info dataUseDetailsGridItem' : 'dataUseDetailsGridItem'
													}>
													{some(filtered, ['column', 'Project Title*'])
														? find(filtered, ['column', 'Project Title*']).value
														: data.projectTitle}
												</div>
												<div className='dataUseDetailsGridHeader'>Lay Summary</div>
												<div
													className={
														some(filtered, ['column', 'Lay Summary*']) ? 'invalid-info dataUseDetailsGridItem' : 'dataUseDetailsGridItem'
													}>
													{some(filtered, ['column', 'Lay Summary*']) ? find(filtered, ['column', 'Lay Summary*']).value : data.laySummary}
												</div>
												<div className='dataUseDetailsGridHeader'>Public Benefit Statement</div>
												<div className='dataUseDetailsGridItem'>{data.publicBenefitStatement}</div>
												<div className='dataUseDetailsGridHeader'>Request Category Type</div>
												<div className='dataUseDetailsGridItem'>{data.requestCategoryType}</div>
												<div className='dataUseDetailsGridHeader'>Technical Summary</div>
												<div className='dataUseDetailsGridItem'>{data.technicalSummary}</div>
												<div className='dataUseDetailsGridHeader'>Other Approval Committees</div>
												<div className='dataUseDetailsGridItem'>{data.otherApprovalCommittees}</div>
												<div className='dataUseDetailsGridHeader'>Project Start Date</div>
												<div className='dataUseDetailsGridItem'>{moment(data.projectStartDate).format('DD/MM/YY')}</div>
												<div className='dataUseDetailsGridHeader'>Project End Date</div>
												<div className='dataUseDetailsGridItem'>{moment(data.projectEndDate).format('DD/MM/YY')}</div>
												<div className='dataUseDetailsGridHeader'>Latest Approval Date</div>
												<div
													className={
														some(filtered, ['column', 'Latest Approval Date*'])
															? 'invalid-info dataUseDetailsGridItem'
															: 'dataUseDetailsGridItem '
													}
													onClick={() => toggleDataUseSection(index)}>
													{some(filtered, ['column', 'Latest Approval Date*'])
														? find(filtered, ['column', 'Latest Approval Date*']).value
														: moment(data.latestApprovalDate).format('DD/MM/YY')}
												</div>

												<div className='gray800-14-bold dataUseDetailsGridSection'>Safe Data</div>
												<div className='dataUseDetailsGridHeader'>Dataset(s) Name</div>
												<div
													className={
														some(filtered, ['column', 'Dataset(s) Name*'])
															? 'invalid-info dataUseDetailsGridItem '
															: 'dataUseDetailsGridItem'
													}>
													{some(filtered, ['column', 'Dataset(s) Name*'])
														? find(filtered, ['column', 'Dataset(s) Name*']).value
														: renderDatasets(data)}
												</div>
												<div className='dataUseDetailsGridHeader'>Data Sensitivity Level</div>
												<div className='dataUseDetailsGridItem'>{data.dataSensitivityLevel}</div>
												<div className='dataUseDetailsGridHeader'>Legal Basis for Provision of Data</div>
												<div className='dataUseDetailsGridItem'>{data.legalBasisForData}</div>
												<div className='dataUseDetailsGridHeader'>Common Law Duty of Confidentiality</div>
												<div className='dataUseDetailsGridItem'>{data.dutyOfConfidentiality}</div>
												<div className='dataUseDetailsGridHeader'>National Data Opt-out applied?</div>
												<div className='dataUseDetailsGridItem'>{data.nationalDataOptOut}</div>
												<div className='dataUseDetailsGridHeader'>Request Frequency</div>
												<div className='dataUseDetailsGridItem'>{data.requestFrequency}</div>
												<div className='dataUseDetailsGridHeader'>Description of how the data will be processed</div>
												<div className='dataUseDetailsGridItem'>{data.dataProcessingDescription}</div>
												<div className='dataUseDetailsGridHeader'>Description of the confidential data being used</div>
												<div className='dataUseDetailsGridItem'>{data.confidentialDataDescription}</div>
												<div className='dataUseDetailsGridHeader'>Release/Access Date</div>
												<div className='dataUseDetailsGridItem'>{moment(data.accessDate).format('DD/MM/YY')}</div>

												<div className='gray800-14-bold dataUseDetailsGridSection'>Safe Settings</div>
												<div className='dataUseDetailsGridHeader'>TRE or any other specified location</div>
												<div
													className={
														some(filtered, ['column', 'TRE or any other specified location*'])
															? 'invalid-info dataUseDetailsGridItem'
															: 'dataUseDetailsGridItem '
													}
													onClick={() => toggleDataUseSection(index)}>
													{some(filtered, ['column', 'TRE or any other specified location*'])
														? find(filtered, ['column', 'TRE or any other specified location*']).value
														: data.dataLocation}
												</div>
												<div className='dataUseDetailsGridHeader'>How has data been processed to enhance privacy?</div>
												<div className='dataUseDetailsGridItem'>{data.privacyEnhancements}</div>

												<div className='gray800-14-bold dataUseDetailsGridSection'>Safe Outputs</div>
												<div className='dataUseDetailsGridHeader'>Link to Research Outputs</div>
												<div className='dataUseDetailsGridItem'>
													<a className='data-use-link' href={data.researchOutputs} target='_blank'>
														{data.researchOutputs}
													</a>
												</div>
											</div>
										</SlideDown>
									</>
								);
							})}
						</div>
					</div>
				) : (
					''
				)}

				<DataUseSubmitModal
					open={isSubmitModalVisible}
					close={toggleSubmitModal}
					confirm={submitDataUse}
					isValid={isEmpty(uploadedData.uploadErrors)}
					isAdmin={team === 'admin'}
				/>
			</Col>
			<Col xs={1}></Col>
		</Row>
	);
});

export default DataUseUpload;
