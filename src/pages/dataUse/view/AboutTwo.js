import React, { useState } from 'react';
import { Container, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';

const About = ({ dataAPI }) => {
	const [closedLaySummary, setClosedLaySummary] = useState(true);
	const [closedPublicBenefit, setClosedPublicBenefit] = useState(true);
	const [closedDataUse, setClosedDataUse] = useState(true);
	const [hide, setHide] = useState(true);

	const orgName = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The name of the legal entity that signs the contract to access the data.
		</Tooltip>
	);
	const orgID = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			A unique identifier for an organisation that is preferably an industry used standard such as Grid.ac
		</Tooltip>
	);
	const orgSector = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			Sector which the applicant(s) work falls under.
		</Tooltip>
	);
	const appName = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The name of the Principal Investigator, as well as any other individuals that have been authorised to use the data.
		</Tooltip>
	);
	const appID = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			A unique identifier for the applicant that is preferably an industry used standard such as Grid.ac
		</Tooltip>
	);
	const funderSponsors = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The name of any funders or sponsors involved in the project.
		</Tooltip>
	);
	const accreditedStatus = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The accreditation status of the Principal Investigator/applicant, as defined by the ONS Research Code of Practice and Accreditation
			criteria.
		</Tooltip>
	);
	const subLicence = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			Identifies whether there are any permissions for the applicant to share the data beyond the named parties.
		</Tooltip>
	);
	const projectID = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			A unique identifier for the project that is preferably an industry used standard, such as IRAS ID. However for non-research projects,
			a unique reference number created by the data custodian on receipt of the application is sufficient.
		</Tooltip>
	);
	const projectTitle = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The title of the project/research study/request that the applicant is investigating through the use of health data.
		</Tooltip>
	);
	const laySummary = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			A concise and clear description of the project, (e.g. as required by URKI in funding applications). It should outline the problem,
			objectives and expected outcomes in language that is understandable to the general public and contain a maximum of 300 words.
		</Tooltip>
	);
	const publicBenefitStatement = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			A description in plain English of the anticipated outcomes, or impact of project on the general public.
		</Tooltip>
	);
	const requestType = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			This categorises the main purpose of the data being shared.
		</Tooltip>
	);
	const technicalSummary = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			A summary of the proposed research, in a manner that is suitable for a specialist reader.
		</Tooltip>
	);
	const otherApprovalCommittees = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			Reference to other decision-making bodies that the project has already been authorised by.
		</Tooltip>
	);
	const projectStartDate = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The date the project is scheduled to start or actual start date.
		</Tooltip>
	);
	const projectEndDate = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The date the project is scheduled to finish or actual end date.
		</Tooltip>
	);
	const latestApprovalDate = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The last date the data access request for this project was approved by a data custodian.
		</Tooltip>
	);
	const datasetNames = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The name of the dataset(s) being accessed.
		</Tooltip>
	);
	const dataSensitivityLevel = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The level of identifiability of the data being accessed, as defined by Understanding Patient Data. In the case of multiple datasets
			being accessed, the sensitivity level for the dataset with the most sensitive data should be used: Personally Identifiable >
			De-Personalised > Anonymous
		</Tooltip>
	);
	const legalBasis = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The legal basis that allows the applicant to lawfully process personally identifiable data, as specified by NHS Digital.
		</Tooltip>
	);
	const commonLawConfidentiality = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			In the application of the Common Law Duty of Confidentiality there are 2 options that enable a release: Consent (Reasonable
			Expectation) or Section 251 NHS Act 2006.
		</Tooltip>
	);
	const nationalDatalOptOut = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			Specifies whether the preference for people to opt-out of their confidential patient information being used for secondary use has been
			applied to the data prior to release.
		</Tooltip>
	);
	const requestFrequency = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			Determines whether this a 'one-off' request or a recurring dataset to be provided over a specific time period.
		</Tooltip>
	);
	const dataProcessing = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			Details of how the data requested will be processed (including how the data will be analysed or linked to other datasets).
		</Tooltip>
	);
	const confidentialDataUse = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			A description of the specific patient identifiable fields that have been included in the dataset(s) being accessed.
		</Tooltip>
	);
	const releaseAccessDate = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			The date the data access was granted and active research started.
		</Tooltip>
	);
	const trustedResearchEnv = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			These are highly secure spaces for researchers to access sensitive data (also known as Data Safe Havens). ‘Other’ represents any other
			location that has been used for data access.
		</Tooltip>
	);
	const dataProcessEnahncePrivacy = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			Description of the tools or software used to reduce level of identifiable data being shared.
		</Tooltip>
	);
	const linkToResearchOutputs = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			A URL link to any academic or non-academic research outputs, as they become available, including code used.
		</Tooltip>
	);

	let count =
		Object.keys(dataAPI).length === 0
			? dataAPI &&
			  dataAPI.reduce(function recur(sum, obj) {
					return sum + (obj === '' || (Object(obj) === obj && Object.values(obj).reduce(recur, 0)));
			  }, 0)
			: 0;

	return (
		<>
			<>
				<Container className='datause-card'>
					<p className='black-14-bold'>Safe people</p>
					{!dataAPI.organisationName > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Organisation name</Col>
							<OverlayTrigger placement='top' overlay={orgName}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.organisationName.length > 0 ? (
									<span className='badge-tag badge-datause-bold'>{dataAPI.organisationName}</span>
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}
					{!dataAPI.applicantID > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Organisation ID</Col>
							<OverlayTrigger placement='top' overlay={orgID}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{dataAPI.applicantID.length > 0 ? dataAPI.applicantID : <p className='gray800-14-opacity'>Not specified</p>}</Col>
						</Row>
					)}
					{!dataAPI.organisationSector > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Organisation sector</Col>
							<OverlayTrigger placement='top' overlay={orgSector}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.organisationSector.length > 0 ? (
									<span className='badge-tag badge-datause-bold'>{dataAPI.organisationSector}</span>
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}
					{!dataAPI.gatewayApplicants > 0 && !dataAPI.nonGatewayApplicants > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Applicant name(s)</Col>
							<OverlayTrigger placement='top' overlay={appName}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.gatewayApplicants.length > 0 && dataAPI.nonGatewayApplicants.length > 0 ? (
									<>
										<span className='hdruser badge-tag'>
											{dataAPI && dataAPI.gatewayApplicants && (
												<span className='datatuse-personicon-bg'>
													<SVGIcon name='personicon' width={10} height={10} fill={'#3db28c'} />
												</span>
											)}
											{dataAPI && dataAPI.gatewayApplicants && (
												<a href='/person/{id}' className='soft-black-14 badge-datause-bold'>
													{dataAPI.gatewayApplicants}
												</a>
											)}
										</span>
										<span className='nonhdruser badge-datause-bold badge-tag'>
											{dataAPI && dataAPI.nonGatewayApplicants && (
												<a href='/person/{id}' className='soft-black-14 badge-datause-bold'>
													{dataAPI.nonGatewayApplicants}
												</a>
											)}
										</span>
									</>
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}

					{!dataAPI.applicantID > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Applicant ID</Col>
							<OverlayTrigger placement='top' overlay={appID}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{dataAPI.applicantID.length > 0 ? dataAPI.applicantID : <p className='gray800-14-opacity'>Not specified</p>}</Col>
						</Row>
					)}

					{!dataAPI.fundersAndSponsors > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Funders/Sponsor</Col>
							<OverlayTrigger placement='top' overlay={funderSponsors}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.fundersAndSponsors.length > 0 ? (
									dataAPI.fundersAndSponsors.map(a => <span className='badge-tag badge-datause-bold'>{a}</span>)
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}

					{!dataAPI.accreditedResearcherStatus > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>DEA accredited researcher status</Col>
							<OverlayTrigger placement='top' overlay={accreditedStatus}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.accreditedResearcherStatus.length > 0 ? (
									dataAPI.accreditedResearcherStatus
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}

					{!dataAPI.sublicenceArrangements > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Sub-licence arrangements (if any)?</Col>
							<OverlayTrigger placement='top' overlay={subLicence}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.sublicenceArrangements.length > 0 ? (
									dataAPI.sublicenceArrangements
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}
				</Container>
				<Container className='datause-card'>
					<p className='black-14-bold'>Safe projects</p>
					{!dataAPI.projectId > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project ID</Col>
							<OverlayTrigger placement='top' overlay={projectID}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{dataAPI.projectId.length > 0 ? dataAPI.projectId : <p className='gray800-14-opacity'>Not specified</p>}</Col>
						</Row>
					)}
					{!dataAPI.projectTitle > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project title</Col>
							<OverlayTrigger placement='top' overlay={projectTitle}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{dataAPI.projectTitle.length > 0 ? dataAPI.projectTitle : <p className='gray800-14-opacity'>Not specified</p>}</Col>
						</Row>
					)}
					{!dataAPI.laySummary > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>
								Lay summary
								<button
									className='datause-arrow'
									onClick={() => (!closedLaySummary ? setClosedLaySummary(true) : setClosedLaySummary(false))}>
									<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#475da7'} className={closedLaySummary ? 'flip180' : ''} />
								</button>
							</Col>
							<OverlayTrigger placement='top' overlay={laySummary}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.laySummary.length > 0 ? (
									closedLaySummary ? (
										dataAPI.laySummary.substr(0, 250)
									) : (
										dataAPI.laySummary
									)
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}
					{!dataAPI.publicBenefitStatement > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>
								Public benefit statement
								<button
									className='datause-arrow'
									onClick={() => (!closedPublicBenefit ? setClosedPublicBenefit(true) : setClosedPublicBenefit(false))}>
									<SVGIcon
										width='20px'
										height='20px'
										name='chevronbottom'
										fill={'#475da7'}
										className={closedPublicBenefit ? 'flip180' : ''}
									/>
								</button>
							</Col>
							<OverlayTrigger placement='top' overlay={publicBenefitStatement}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.publicBenefitStatement.length > 0 ? (
									closedPublicBenefit ? (
										dataAPI.publicBenefitStatement.substr(0, 250)
									) : (
										dataAPI.publicBenefitStatement
									)
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}
					{!dataAPI.requestCategoryType && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Request category type</Col>
							<OverlayTrigger placement='top' overlay={requestType}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.requestCategoryType.length > 0 ? dataAPI.requestCategoryType : <p className='gray800-14-opacity'>Not specified</p>}
							</Col>
						</Row>
					)}
					{!dataAPI.technicalSummary && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Technical summary</Col>
							<OverlayTrigger placement='top' overlay={technicalSummary}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.technicalSummary.length > 0 ? dataAPI.technicalSummary : <p className='gray800-14-opacity'>Not specified</p>}
							</Col>
						</Row>
					)}

					{!dataAPI.otherApprovalCommittees && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Other approval committees</Col>
							<OverlayTrigger placement='top' overlay={otherApprovalCommittees}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.otherApprovalCommittees.length > 0 ? (
									dataAPI.otherApprovalCommittees
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}

					{!dataAPI.projectStartDate > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project start date</Col>
							<OverlayTrigger placement='top' overlay={projectStartDate}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.projectStartDate.length > 0 ? dataAPI.projectStartDate : <p className='gray800-14-opacity'>Not specified</p>}
							</Col>
						</Row>
					)}

					{!dataAPI.projectEndDate > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project end date</Col>
							<OverlayTrigger placement='top' overlay={projectEndDate}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{dataAPI.projectEndDate.length > 0 ? dataAPI.projectEndDate : <p className='gray800-14-opacity'>Not specified</p>}</Col>
						</Row>
					)}

					{!dataAPI.latestApprovalDate > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Latest approval date</Col>
							<OverlayTrigger placement='top' overlay={latestApprovalDate}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.latestApprovalDate.length > 0 ? dataAPI.latestApprovalDate : <p className='gray800-14-opacity'>Not specified</p>}
							</Col>
						</Row>
					)}
				</Container>
				<Container className='datause-card datause-view-grid'>
					<p className='black-14-bold'>Safe data</p>
					{!dataAPI.datasetTitles > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14'>
							<Col>Dataset(s) name</Col>
							<OverlayTrigger placement='top' overlay={datasetNames}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{dataAPI.datasetTitles.length > 0 ? dataAPI.datasetTitles : <p className='gray800-14-opacity'>Not specified</p>}</Col>
						</Row>
					)}
					{!dataAPI.dataSensitivityLevel > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Data sensitivity level</Col>
							<OverlayTrigger placement='top' overlay={dataSensitivityLevel}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.dataSensitivityLevel.length > 0 ? (
									dataAPI.dataSensitivityLevel
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}
					{!dataAPI.legalBasisForData > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Legal basis for provision of data</Col>
							<OverlayTrigger placement='top' overlay={legalBasis}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.legalBasisForData.length > 0 ? dataAPI.legalBasisForData : <p className='gray800-14-opacity'>Not specified</p>}
							</Col>
						</Row>
					)}
					{!dataAPI.dutyOfConfidentiality > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Common law of duty of confidentiality</Col>
							<OverlayTrigger placement='top' overlay={commonLawConfidentiality}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.dutyOfConfidentiality.length > 0 ? (
									dataAPI.dutyOfConfidentiality
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}
					{!dataAPI.nationalDataOptOut > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>National data opt-out applied?</Col>
							<OverlayTrigger placement='top' overlay={nationalDatalOptOut}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.nationalDataOptOut.length > 0 ? dataAPI.nationalDataOptOut : <p className='gray800-14-opacity'>Not specified</p>}
							</Col>
						</Row>
					)}
					{!dataAPI.requestFrequency > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Request frequency</Col>
							<OverlayTrigger placement='top' overlay={requestFrequency}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.requestFrequency.length > 0 ? dataAPI.requestFrequency : <p className='gray800-14-opacity'>Not specified</p>}
							</Col>
						</Row>
					)}
					{!dataAPI.dataProcessingDescription > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>
								Description of how the data will be used
								<button className='datause-arrow' onClick={() => (!closedDataUse ? setClosedDataUse(true) : setClosedDataUse(false))}>
									<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#475da7'} className={closedDataUse ? 'flip180' : ''} />
								</button>
							</Col>
							<OverlayTrigger placement='top' overlay={dataProcessing}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{closedDataUse ? dataAPI.dataProcessingDescription.substr(0, 150) : dataAPI.dataProcessingDescription}</Col>
						</Row>
					)}
					{!dataAPI.confidentialDataDescription > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Description of the confidential data being used</Col>
							<OverlayTrigger placement='top' overlay={confidentialDataUse}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.confidentialDataDescription.length > 0 ? (
									dataAPI.confidentialDataDescription
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}
					{!dataAPI.accessDate > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Release/Access date</Col>
							<OverlayTrigger placement='top' overlay={releaseAccessDate}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{dataAPI.accessDate.length > 0 ? dataAPI.accessDate : <p className='gray800-14-opacity'>Not specified</p>}</Col>
						</Row>
					)}
				</Container>
				<Container className='datause-card'>
					<p className='black-14-bold'>Safe setting</p>
					{!dataAPI.dataLocation > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Trusted research environment or any other specified location</Col>
							<OverlayTrigger placement='top' overlay={trustedResearchEnv}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{dataAPI.dataLocation.length > 0 ? dataAPI.dataLocation : <p className='gray800-14-opacity'>Not specified</p>}</Col>
						</Row>
					)}

					{!dataAPI.privacyEnhancements > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col>How has data been processed to enhance privacy?</Col>
							<OverlayTrigger placement='top' overlay={dataProcessEnahncePrivacy}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.privacyEnhancements.length > 0 ? dataAPI.privacyEnhancements : <p className='gray800-14-opacity'>Not specified</p>}
							</Col>
						</Row>
					)}
				</Container>
				<Container className='datause-card'>
					<p className='black-14-bold'>Safe output</p>
					{!dataAPI.researchOutputs > 0 && hide ? (
						''
					) : (
						<Row className='soft-black-14'>
							<Col>Link to research outputs</Col>
							<OverlayTrigger placement='top' overlay={linkToResearchOutputs}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>
								{dataAPI.researchOutputs.length > 0 ? (
									<a href={dataAPI.researchOutputs} className='purple-blue-14'>
										{dataAPI.researchOutputs}
									</a>
								) : (
									<p className='gray800-14-opacity'>Not specified</p>
								)}
							</Col>
						</Row>
					)}
				</Container>
			</>

			<Row>
				<Col className='datause-about-info'>
					<p className='soft-black-14'>
						Data custodians are responsible for providing information about their approved data uses register. Where not all fields are
						completed, we hide empty fields to make the page easier to read, but you can choose to view them.
					</p>
				</Col>
			</Row>
			<Row className='datause-hidefields-button'>
				<Button className='datause-button' onClick={() => (hide ? setHide(false) : setHide(true))}>
					{!hide ? 'Hide all empty fields (' + count + ')' : 'Show all empty fields (' + count + ')'}
				</Button>
			</Row>
		</>
	);
};

export default About;
