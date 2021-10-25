import React, { useState } from 'react';
import { Accordion, Card, Button, Form, Row, Col } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';
import { ReactComponent as Calendar } from '../../../images/calendaricon.svg';
import RelatedObject from '../../commonComponents/relatedObject/RelatedObject';
import DatePicker from 'react-datepicker';
import Creatable from 'react-select/creatable';
import { components } from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditFormDataUse = data => {
	const initalLaySummary = data && data.data && data.data.laySummary && data.data.laySummary.length;

	const [counter, setCounter] = useState(initalLaySummary);
	const [safePeople, setSafePeople] = useState(true);
	const [safeProject, setSafeProject] = useState(true);
	const [safeData, setSafeData] = useState(true);
	const [safeSettings, setSafeSettings] = useState(true);
	const [safeOutput, setSafeOutput] = useState(true);
	const [keywords, setKeywords] = useState(true);
	const [relatedResources, setRelatedResources] = useState(true);
	const [valueChange, setValueChange] = useState('');
	const [showRelatedObject, setShowRelatedObject] = useState(false);
	const [researchOutputs, setResearchOutputs] = useState([]);
	const [defaultResearchOutputs, setDefaultResearchOutputs] = useState(true);
	const [showExtraInput, setShowExtraInput] = useState(false);
	const laySummaryMaxLength = 300;

	const handleAddFields = () => {
		const values = [...researchOutputs];
		values.push({ input: '' });
		setResearchOutputs(values);
		setShowExtraInput(true);
	};

	const handleRemoveFields = () => {
		const values = [...researchOutputs];
		if (values.length > 0) values.pop();
		setDefaultResearchOutputs(false);
		setResearchOutputs(values);
	};

	const inputChange = e => {
		setValueChange({
			organisationName: e.target.value,
		});
		console.log(valueChange);
	};

	const onSubmitForm = () => {
		console.log(valueChange);
	};

	const relatedResourcesComp = () => {
		setShowRelatedObject(true);
	};

	const { Option } = components;
	const CustomSelectOption = props => (
		<Option {...props}>
			<SVGIcon width='20px' height='20px' name={props.data.icon} fill={'#3db28c'} />
			{props.data.label}
		</Option>
	);

	const CustomSelectValue = props => (
		<div>
			<SVGIcon width='20px' height='20px' name={props.data.icon} fill={'#3db28c'} />
			{props.data.label}
		</div>
	);
	const customMultiValue = props => (
		<div className='input-select'>
			<div
				className={
					props.data.type === 'gateway'
						? 'input-select__multi-value gateway-input-select'
						: 'input-select__multi-value nongateway-input-select'
				}>
				{props.data.type === 'gateway' && <SVGIcon width='20px' height='20px' name={props.data.icon} fill={'#3db28c'} />}
				{props.data.label}
			</div>
		</div>
	);
	const gatewayApps =
		data &&
		data.data &&
		data.data.gatewayApplicants &&
		data.data.gatewayApplicants.map(a => ({ label: a, value: a, type: 'gateway', icon: 'personiconwithbg' }));

	const nonGatewayApps =
		data &&
		data.data &&
		data.data.nonGatewayApplicants &&
		data.data.nonGatewayApplicants.map(b => ({ label: b, value: b, type: 'nongateway' }));

	const allApplicants = gatewayApps && nonGatewayApps && [...gatewayApps, ...nonGatewayApps];

	const keywordsData = [
		{ label: 'keyword one', value: 'keyword one' },
		{ label: 'keyword two', value: 'keyword two' },
		{ label: 'keyword three', value: 'keyword three' },
		{ label: 'keyword four', value: 'keyword four' },
	];

	const updateCounter = e => {
		setCounter(e.target.value.length);
	};

	/*
  	const formik = useFormik({
		initialValues: {
			id: props.data.id || '',
			name: props.data.name || '',
			description: props.data.description || '',
			authors: props.data.authors || [props.userState[0].id],
			imageLink: props.data.imageLink || '',
			relatedObjects: props.relatedObjects,
			publicflag: props.publicFlag || false,
			keywords: props.data.keywords || [],
			previousPublicFlag: props.publicFlag,
		},

		validationSchema: Yup.object({
			name: Yup.string().required('This cannot be empty'),
			description: Yup.string().max(5000, 'Maximum of 5,000 characters').required('This cannot be empty'),
			authors: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.number()) : Yup.number())),
			imageLink: Yup.string().matches(/^(http|https){1}:\/\/[A-Za-z0-9-_~:#@!&',;%=]+$/, {
				message: 'Invalid URL: should start with http:// or https://',
			}),
		}),

		onSubmit: values => {
			values.relatedObjects = props.relatedObjects;
			values.collectionCreator = props.userState[0];

			if (props.isEdit) {
				axios.put(baseURL + '/api/v1/collections/edit/' + props.data.id, values).then(res => {
					window.location.href = windowUrl + '/collection/' + props.data.id + '/?collectionEdited=true';
				});
			} else {
				axios.post(baseURL + '/api/v1/collections/add', values).then(res => {
					window.location.href = windowUrl + '/collection/' + res.data.id + '/?collectionAdded=true';
				});
			}
		},
	}); */

	return (
		<Accordion defaultActiveKey='0' className='datause-accordion-header'>
			<Card className='edit-datause-card'>
				<Accordion.Toggle as={Button} variant='link' eventKey='0'>
					<Card.Header
						className='datause-accordion saved-search-arrow'
						onClick={() => (!safePeople ? setSafePeople(true) : setSafePeople(false))}>
						<SVGIcon
							width='20px'
							height='20px'
							name='chevronbottom'
							fill={'#fff'}
							className={safePeople ? 'flip180 edit-datause-arrow' : 'edit-datause-arrow'}
						/>
						Safe People
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='0'>
					<Card.Body className='datause-card-body'>
						<Form>
							<Form.Group>
								<Form.Label className='black-14'>Organisation name</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>The name of the legal entity that signs the contract to access the data</p>
								<Form.Control type='text' placeholder='' defaultValue={data.data.organisationName} onChange={inputChange} />
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Organisation ID (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									A unique identifier for an organisation that is preferably an industry used standard such as <a href='grid.ac'>Grid.ac</a>
								</p>
								<Form.Control type='text' placeholder='' defaultValue={data.data.organisationID} />
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Organisation sector (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>The type of organisation that has signed a contract to access the data</p>
								<Form.Control className='form-input-dropdown' as='select'>
									<option>{data.data.organisationSector}</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Applicant name(s) (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									The name of the Principal Investigator, as well as any other individuals that have been authorised to use the data. If
									they are on the Gateway, please provide their profile URL
								</p>
								{/*<Form.Control
									type='text'
									placeholder=''
									defaultValue={
										data &&
										data.data &&
										data.data.gatewayApplicants &&
										data.data.nonGatewayApplicants &&
										data.data.gatewayApplicants.map(a => a) + data.data.nonGatewayApplicants.map(a => a)
									}
								/>*/}

								{/*<Creatable
									options={applicantsData}
									defaultValue={applicantsData}
									onChange={(opt, meta) => console.log(opt, meta)}
									isMulti
									components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                />*/}
								{allApplicants && (
									<Creatable
										options={allApplicants}
										defaultValue={allApplicants}
										onChange={(opt, meta) => console.log(opt, meta)}
										isMulti
										components={
											({ DropdownIndicator: () => null, IndicatorSeparator: () => null },
											{ MultiValue: customMultiValue, Option: CustomSelectOption, SingleValue: CustomSelectValue })
										}
									/>
								)}
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Applicant ID (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									ORCID identifier. This provides a persistent digital identifier that you own and control, and that distinguishes you from
									every other researcher. An ORCID profile can be created at https://orcid.org/
								</p>
								<Form.Control type='text' placeholder='' defaultValue={data.data.applicantId} />
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Funders/Sponsor (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>The name of any funders or sponsors involved in the project</p>
								<Form.Control
									type='text'
									placeholder=''
									defaultValue={data && data.data && data.data.fundersAndSponsors && data.data.fundersAndSponsors.map(a => a)}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>DEA accredited researcher? (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									Depending on the type of data you are requesting, you might be required to become an accredited researcher. Most access to
									data in the Secure Research Service (SRS) will be by researchers accredited under the Digital Economy Act 2017 (DEA). This
									specifies the accreditation status of the principal applicant/researcher, as defined by the ONS Research Code of Practice
									and Accreditation criteria
								</p>
								<Form.Control as='select'>
									<option>{data.data.accreditedResearcherStatus}</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Sub-licence arrangements (if any)? (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									Identifies whether there are any permissions for the applicant to share the data beyond the named parties. e.g., NHS
									Digital may approve a data release to the ONS, who then makes decisions about access to accredited researchers undertaking
									approved projects in their own trusted research environment.
								</p>
								<Form.Control as='select'>
									<option>{data.data.sublicenceArrangements}</option>
									<option>{data.data.sublicenceArrangements === 'Yes' ? 'No' : 'Yes'}</option>
								</Form.Control>
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card className='edit-datause-card'>
				<Accordion.Toggle as={Button} variant='link' eventKey='1'>
					<Card.Header
						className='datause-accordion saved-search-arrow'
						onClick={() => (!safeProject ? setSafeProject(true) : setSafeProject(false))}>
						<SVGIcon
							width='20px'
							height='20px'
							name='chevronbottom'
							fill={'#fff'}
							className={safeProject ? 'flip180 edit-datause-arrow' : 'edit-datause-arrow'}
						/>
						Safe project
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='1'>
					<Card.Body className='datause-card-body'>
						<Form>
							<Form.Group>
								<Form.Label className='black-14'>Project ID</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									A unique identifier for the project that is preferably an industry used standard, such as IRAS ID. However for
									non-research projects, a unique reference number created by the data custodian on receipt of the application is sufficient
								</p>
								<fieldset disabled>
									<Form.Control type='text' placeholder='' value={data.data.projectIdText} readOnly />
								</fieldset>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Project title</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									The title of the project/research study/request that the applicant is investigating through the use of health data
								</p>
								<Form.Control type='text' placeholder='' defaultValue={data.data.projectTitle} />
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Lay summary (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									A concise and clear description of the project, (e.g. as required by URKI in funding applications). It should outline the
									problem, objectives and expected outcomes in language that is understandable to the general public
								</p>
								<p className='gray800-13-opacity datause-edit-laysummary'>
									({counter}/{laySummaryMaxLength})
								</p>
								<Form.Control
									type='text'
									placeholder=''
									defaultValue={data.data.laySummary}
									style={{ height: '100px' }}
									onChange={e => updateCounter(e)}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Public benefit statement (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									A description in plain English of the anticipated outcomes, or impact of project on the general public
								</p>
								<Form.Control type='text' placeholder='' defaultValue={data.data.publicBenefitStatement} style={{ height: '100px' }} />
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Request category type (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									This categorises the 'purpose of the share' (i.e., research, policy development, etc)
								</p>
								<Form.Control as='select'>
									<option>{data.data.requestCategoryType}</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Technical summary (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									A summary of the proposed research, in a manner that is suitable for a specialist reader
								</p>
								<Form.Control type='text' placeholder='' defaultValue={data.data.technicalSummary} style={{ height: '100px' }} />
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Other approval committees (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									Reference to other decision-making bodies that the project has already been authorised by
								</p>
								<Form.Control
									type='text'
									placeholder=''
									defaultValue={data && data.data && data.otherApprovalCommittees && data.data.otherApprovalCommittees.map(a => a)}
								/>
							</Form.Group>

							<Row>
								<Col>
									{' '}
									<Form.Group>
										<Form.Label className='black-14'>Project start date (optional)</Form.Label>
										<p className='gray800-13-opacity datause-edit-p'>The date the project is scheduled to start or actual start date</p>
										{/*<Form.Control type='text' placeholder='' defaultValue={data.data.projectStartDate} />*/}
										<span className='datause-datepicker'>
											<DatePicker
												name={`startDate`}
												dateFormat='dd/MM/yyyy'
												peekNextMonth
												showMonthDropdown
												showYearDropdown
												dropdownMode='select'
												selected={Date.parse(data.data.projectStartDate)}
											/>

											<Calendar className='datePickerCalendar datause-calendar-svg' />
										</span>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Label className='black-14'>Project end date (optional)</Form.Label>
										<p className='gray800-13-opacity datause-edit-p'>The date the project is scheduled to end or actual end date</p>
										{/*<Form.Control type='text' placeholder='' defaultValue={data.data.projectEndDate} />*/}
										<span className='datause-datepicker'>
											<DatePicker
												name={`endDate`}
												dateFormat='dd/MM/yyyy'
												peekNextMonth
												showMonthDropdown
												showYearDropdown
												dropdownMode='select'
												selected={Date.parse(data.data.projectEndDate)}
											/>
											<Calendar className='datePickerCalendar datause-calendar-svg' />
										</span>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md={6}>
									<Form.Group>
										<Form.Label className='black-14'>Latest approval date (optional)</Form.Label>
										<p className='gray800-13-opacity datause-edit-p'>
											The last date the data access request for this project was approved by a data custodian
										</p>

										{/*<Form.Control type='text' placeholder='' defaultValue={data.data.latestApprovalDate} />*/}
										<span className='datause-datepicker'>
											<DatePicker
												name={`approvalDate`}
												dateFormat='dd/MM/yyyy'
												peekNextMonth
												showMonthDropdown
												showYearDropdown
												dropdownMode='select'
												selected={Date.parse(data.data.latestApprovalDate)}
											/>
											<Calendar className='datePickerCalendar datause-calendar-svg' />
										</span>
									</Form.Group>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card className='edit-datause-card'>
				<Accordion.Toggle as={Button} variant='link' eventKey='2'>
					<Card.Header
						className='datause-accordion saved-search-arrow'
						onClick={() => (!safeData ? setSafeData(true) : setSafeData(false))}>
						<SVGIcon
							width='20px'
							height='20px'
							name='chevronbottom'
							fill={'#fff'}
							className={safeData ? 'flip180 edit-datause-arrow' : 'edit-datause-arrow'}
						/>
						Safe data
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='2'>
					<Card.Body className='datause-card-body'>
						<Form>
							<Form.Group>
								<Form.Label className='black-14'>Dataset(s) name</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>The name of the dataset(s) being accessed</p>
								{/*<fieldset disabled>
									<Form.Control
										type='text'
										placeholder=''
										defaultValue={data && data.data && data.data.datasetTitles && data.data.datasetTitles.map(a => a)}
										readOnly
									/>
                </fieldset>*/}
							</Form.Group>
							<Row className='datause-datasettitles'>
								{data &&
									data.data &&
									data.data.datasetTitles &&
									data.data.datasetTitles.map(a => <span className='datause-datasettitles-pills'>{a}</span>)}
							</Row>

							<Form.Group>
								<Form.Label className='black-14'>Dataset sensitivity level (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									The level of identifiability of the data being accessed, as defined by Understanding Patient Data{' '}
								</p>
								<Form.Control type='text' placeholder='' defaultValue={data.data.dataSensitivityLevel} />
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Legal basis for provision of data under Article 6 (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									The lawful basis for processing are set out in Article 6 of the GDPR. At least one legal basis must apply whenever you
									process personal data. Please select appropriate Article 6 lawful basis. Processing shall be lawful only if and to the
									extent that at least one of the following applies
								</p>
								<Form.Control as='select'>
									<option>{data.data.legalBasisForData}</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Lawful conditions for provision of data under Article 9 (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									Processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or
									trade union membership, and the processing of genetic data, biometric data for the purpose of uniquely identifying a
									natural person, data concerning health or data concerning a natural person's sex life or sexual orientation shall be
									prohibited. This does not apply if one of the following applies
								</p>
								<Form.Control as='select'>
									<option>{data.data.legalBasisForDataArticle9}</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Common law of duty of confidentiality (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									If confidential information is being disclosed , the organisations holding this data (both the organisation disclosing the
									information and the recipient organisation) must also have a lawful basis to hold and use this information, and if
									applicable, have a condition to hold and use special categories of confidential information, and be fair and transparent
									about how they hold and use this data. In England and Wales, if you are using section 251 of the NHS Act 2006 (s251) as a
									legal basis for identifiable data, you will need to ensure that you have the latest approval letter and application. For
									Scotland this application will be reviewed by the Public Benefit and Privacy Panel. In Northern Ireland it will be
									considered by the Privacy Advisory Committee. If you are using patient consent as the legal basis, you will need to
									provide all relevant consent forms and information leaflets.
								</p>
								<Form.Control as='select'>
									<option>{data.data.dutyOfConfidentiality}</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>National data opt-out applied? (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									Specifies whether the preference for people to opt-out of their confidential patient information being used for secondary
									use has been applied to the data prior to release
								</p>
								<Form.Control as='select'>
									<option>{data.data.nationalDataOptOut}</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Request frequency (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									Determines whether this a 'one-off' request or a recurring dataset to be provided over a specific time period
								</p>
								<Form.Control as='select'>
									<option>{data.data.requestFrequency}</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>For linked datasets, specify how the linkage will take place (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									Specifies whether applicant intends for the datasets to be linked with any additional datasets. Relevant information on
									the organisations undertaking linkages and how the linkage will take place must also be disclosed. As well as, a summary
									of the risks/mitigations to be considered
								</p>
								<Form.Control type='text' placeholder='' defaultValue='TO DO' />
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Description of how the data will be used (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									A description of the specific patient identifiable fields that have been included in the dataset(s) being accessed
								</p>
								<Form.Control type='text' placeholder='' defaultValue={data.data.confidentialDataDescription} />
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>Release/Access date (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>The date the data access was granted and active research started</p>
								{/*<Form.Control type='text' placeholder='' defaultValue={data.data.accessDate} />*/}
								<Row md={6}>
									{' '}
									<span className='datause-datepicker datapicker-releaseaccess'>
										<DatePicker
											name={`releaseDate`}
											dateFormat='dd/MM/yyyy'
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode='select'
											selected={Date.parse(data.data.accessDate)}
										/>
										<Calendar className='datePickerCalendar datause-calendar-svg' />
									</span>
								</Row>
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card className='edit-datause-card'>
				<Accordion.Toggle as={Button} variant='link' eventKey='3'>
					<Card.Header
						className='datause-accordion saved-search-arrow'
						onClick={() => (!safeSettings ? setSafeSettings(true) : setSafeSettings(false))}>
						<SVGIcon
							width='20px'
							height='20px'
							name='chevronbottom'
							fill={'#fff'}
							className={safeSettings ? 'flip180 edit-datause-arrow' : 'edit-datause-arrow'}
						/>
						Safe settings
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='3'>
					<Card.Body className='datause-card-body'>
						<Form>
							<Form.Group>
								<Form.Label className='black-14'>Access type (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									Determines whether the data will be accessed within a Trusted Research Environment (TRE) or via the traditional data
									release modelDetermines whether the data will be accessed within a Trusted Research Environment (TRE) or via the
									traditional data release model
								</p>
								<Form.Control as='select'>
									<option>TO DO</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label className='black-14'>How has data been processed to enhance privacy? (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									Description of the tools or software used to reduce level of identifiable data being shared
								</p>
								<Form.Control type='text' placeholder='' defaultValue={data.data.privacyEnhancements} />
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card className='edit-datause-card'>
				<Accordion.Toggle as={Button} variant='link' eventKey='4'>
					<Card.Header
						className='datause-accordion saved-search-arrow'
						onClick={() => (!safeOutput ? setSafeOutput(true) : setSafeOutput(false))}>
						<SVGIcon
							width='20px'
							height='20px'
							name='chevronbottom'
							fill={'#fff'}
							className={safeOutput ? 'flip180 edit-datause-arrow' : 'edit-datause-arrow'}
						/>
						Safe output
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='4'>
					<Card.Body className='datause-card-body'>
						<Form>
							<Form.Group>
								<Form.Label className='black-14'>Link to research outputs (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									A URL link to any academic or non-academic research outputs, as they become available, including code used. If the link is
									to a Gateway resource, this will automatically populate in related resources.
								</p>
								{defaultResearchOutputs && <Form.Control type='text' placeholder='' defaultValue={data.data.researchOutputs} />}
								{researchOutputs.map(i => {
									return (
										<Form.Group>
											<Form.Control type='text' placeholder='' />
										</Form.Group>
									);
								})}
								{/*<button className='plusMinusButton'>-</button>
								<button className='plusMinusButton'>+</button>*/}

								<Button onClick={handleAddFields} className='plusMinusButton rounded-circle'>
									+
								</Button>
								<Button onClick={handleRemoveFields} className='plusMinusButton rounded-circle'>
									-
								</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card className='edit-datause-card'>
				<Accordion.Toggle as={Button} variant='link' eventKey='5'>
					<Card.Header
						className='datause-accordion saved-search-arrow'
						onClick={() => (!keywords ? setKeywords(true) : setKeywords(false))}>
						<SVGIcon
							width='20px'
							height='20px'
							name='chevronbottom'
							fill={'#fff'}
							className={keywords ? 'flip180 edit-datause-arrow' : 'edit-datause-arrow'}
						/>
						Keywords
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='5'>
					<Card.Body className='datause-card-body'>
						<Form>
							<Form.Group>
								<Form.Label className='black-14'>Keywords (optional)</Form.Label>
								<p className='gray800-13-opacity datause-edit-p'>
									Select maximum 5 keywords that will help make your data use easily searchable
								</p>
								<Creatable
									options={keywordsData}
									onChange={(opt, meta) => console.log(opt, meta)}
									isMulti
									components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
								/>
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card className='edit-datause-card'>
				<Accordion.Toggle as={Button} variant='link' eventKey='6'>
					<Card.Header
						className='datause-accordion saved-search-arrow'
						onClick={() => (!relatedResources ? setRelatedResources(true) : setRelatedResources(false))}>
						<SVGIcon
							width='20px'
							height='20px'
							name='chevronbottom'
							fill={'#fff'}
							className={relatedResources ? 'flip180 edit-datause-arrow' : 'edit-datause-arrow'}
						/>
						Related resources
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='6'>
					<Card.Body className='datause-card-body'>
						<div className='datause-related-resources'>
							<p className='black-20-semibold'>Related resources </p>
							<p className='black-14'>(optional)</p>
						</div>

						<p className='gray800-13-opacity'>
							Link this to other papers, data uses, datasets, tools, courses and people. Resources must be added to the Gateway first.
						</p>
						<hr className='datause-border' />
						{/*{props.relatedObjects.map(object => {
									return (
										<div className='relatedObjectRectangle'>
											<RelatedObject
												showRelationshipQuestion={true} 
												objectId={object.objectId}
												pid={object.pid}
												objectType={object.objectType}
												doRemoveObject={props.doRemoveObject}
												doUpdateReason={updateReason}
												reason={object.reason}
												didDelete={props.didDelete}
												updateDeleteFlag={props.updateDeleteFlag}
												inCollection={true}
											/>
										</div>
									);
								})} */}
						{showRelatedObject &&
							data.data.relatedObjects.map(object => {
								return (
									<div className='relatedObjectRectangle'>
										<RelatedObject
											showRelationshipQuestion={true}
											objectId={object.objectId}
											pid={object.pid}
											objectType={object.objectType}
											//doRemoveObject={doRemoveObject}
											//doUpdateReason={updateReason}
											reason={object.reason}
											//didDelete={didDelete}
											//updateDeleteFlag={updateDeleteFlag}
										/>
									</div>
								);
							})}
						<Button variant='outline-success' className='datatuse-add-resources dark-14' onClick={relatedResourcesComp}>
							+ Add resources
						</Button>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default EditFormDataUse;
