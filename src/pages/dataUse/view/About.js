import React, { useState } from 'react';
import { Container, Row, Col, Button, OverlayTrigger } from 'react-bootstrap';
import { isArray } from 'lodash';
import moment from 'moment';
import SVGIcon from '../../../images/SVGIcon';
import Guidance from '../../commonComponents/Guidance';
import Tag from '../../commonComponents/relatedObject/Tag/Tag';

const About = ({ data, renderTooltip }) => {
	const [closedLaySummary, setClosedLaySummary] = useState(true);
	const [closedPublicBenefit, setClosedPublicBenefit] = useState(true);
	const [closedDataUse, setClosedDataUse] = useState(true);
	const [hide, setHide] = useState(true);
	const notSpecified = <p className='gray800-14-opacity'>Not specified</p>;

	let count =
		Object.keys(data).length === 0
			? data &&
			  data.reduce(function recur(sum, obj) {
					return sum + (obj === '' || (Object(obj) === obj && Object.values(obj).reduce(recur, 0)));
			  }, 0)
			: 0;

	return (
		<>
			<>
				<Container className='datause-card datause-safeInfo'>
					<p className='black-14-bold'>Safe people</p>

					<Row className='soft-black-14 datause-view-grid '>
						<Col md={4}>Organisation name</Col>
						<Guidance
							renderTooltip={renderTooltip}
							text='The name of the legal entity that signs the contract to access the data.'
							id='organisationNameToolTip'
						/>
						<Col md={7}>
							<span data-testid='organisation-name-details'>
								{data.organisationName.length > 0 ? (
									<>
										{data.organisationName.split(',').map((value, i) => (
											<Tag
												key={`organisationName-${i}`}
												tagName={value.trim()}
												url='/search?search=&tab=Datauses&datauseorganisationname='
												onSearchPage={false}
												activeLink={true}
												tagType='tag'
												className='badge-datause-bold'
											/>
										))}
									</>
								) : (
									notSpecified
								)}
							</span>
						</Col>
					</Row>

					{!data.organisationId && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Organisation ID</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='A unique identifier for an organisation that is preferably an industry used standard such as Grid.ac (see https://www.grid.ac/institutes)'
							/>
							<Col>
								<span data-testid='organisationId-details'>
									{data.organisationId && data.organisationId.length > 0 ? data.organisationId : notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.organisationSector && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Organisation sector</Col>
							<Guidance renderTooltip={renderTooltip} text='Sector which the applicant(s) work falls under.' />
							<Col md={7}>
								<span data-testid='datauserganisationsector-details'>
									{data.organisationSector && data.organisationSector.length > 0 ? (
										<Tag
											tagName={data.organisationSector}
											tagType='tag'
											url='/search?search=&tab=Datauses&datauserganisationsector='
											onSearchPage={false}
											activeLink={true}
										/>
									) : (
										notSpecified
									)}
								</span>
							</Col>
						</Row>
					)}
					{(!data.gatewayApplicants || data.gatewayApplicants.length === 0) &&
					(!data.nonGatewayApplicants || data.nonGatewayApplicants.length === 0) &&
					hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Applicant name(s)</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='The name of the Principal Investigator, as well as any other individuals that have been authorised to use the data.'
							/>
							<Col md={7}>
								<span data-testid='applicant-details'>
									{(data.gatewayApplicants && data.gatewayApplicants.length > 0) ||
									(data.nonGatewayApplicants && data.nonGatewayApplicants.length > 0) ? (
										<>
											{data &&
												data.gatewayApplicants.map((gatewayApplicant, i) => (
													<Tag
														key={`gatewayApplicant-${i}`}
														tagId={gatewayApplicant.id}
														tagName={`${gatewayApplicant.firstname} ${gatewayApplicant.lastname}`}
														tagType='tag'
														url='/person/'
														onSearchPage={false}
														showTagType={false}
														activeLink={true}
														className='hdruser badge-datause-bold'>
														<span className='datatuse-personicon-bg'>
															<SVGIcon name='personiconwithbg' width={17} height={16} fill={'#3db28c'} />
														</span>
													</Tag>
												))}
											{data &&
												data.nonGatewayApplicants.map(nonGatewayApplicant => (
													<span className='nonhdruser badge-datause-bold badge-tag'>{nonGatewayApplicant}</span>
												))}
										</>
									) : (
										notSpecified
									)}
								</span>
							</Col>
						</Row>
					)}
					{!data.applicantId && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Applicant ID</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='A unique identifier for the applicant that is preferably an industry used standard such as Grid.ac (see https://www.grid.ac/)'
							/>
							<Col md={7}>
								<span data-testid='applicantId-details'>
									{data.applicantId && data.applicantId.length > 0 ? data.applicantId : notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{data.fundersAndSponsors && data.fundersAndSponsors.length === 0 && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Funders/Sponsor</Col>
							<Guidance renderTooltip={renderTooltip} text='The name of any funders or sponsors involved in the project' />
							<Col md={6}>
								<span data-testid='funders-sponsor-details'>
									{data.fundersAndSponsors.length > 0
										? data.fundersAndSponsors.map((value, i) => (
												<Tag
													key={`fundersandsponsors-${i}`}
													tagName={value}
													tagType='tag'
													url='/search?search=&tab=Datauses&datausefundersandsponsors='
													onSearchPage={false}
													activeLink={true}
												/>
										  ))
										: notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.accreditedResearcherStatus && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>DEA accredited researcher status</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='The accreditation status of the Principal Investigator/applicant, as defined by the ONS Research Code of Practice and Accreditation criteria.'
							/>
							<Col md={7}>
								<span data-testid='researcher-details'>
									{data.accreditedResearcherStatus && data.accreditedResearcherStatus.length > 0
										? data.accreditedResearcherStatus
										: notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.sublicenceArrangements && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Sub-licence arrangements (if any)?</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='Identifies whether there are any permissions for the applicant to share the data beyond the named parties.'
							/>
							<Col md={7}>
								<span data-testid='sub-licence-details'>
									{data.sublicenceArrangements && data.sublicenceArrangements.length > 0 ? data.sublicenceArrangements : notSpecified}
								</span>
							</Col>
						</Row>
					)}
				</Container>
				<Container className='datause-card datause-safeInfo'>
					<p className='black-14-bold'>Safe projects</p>
					{!data.projectIdText && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Project ID</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='A unique identifier for the project that is preferably an industry used standard, such as IRAS ID. However for non-research projects, a unique reference number created by the data custodian on receipt of the application is sufficient.'
							/>
							<Col md={6}>
								<span data-testid='projectId-details'>
									{data.projectIdText && data.projectIdText.length > 0 ? data.projectIdText : notSpecified}
								</span>
							</Col>
						</Row>
					)}

					<Row className='soft-black-14 datause-view-grid'>
						<Col md={4}>Project title</Col>
						<Guidance
							renderTooltip={renderTooltip}
							text='The title of the project/research study/request that the applicant is investigating through the use of health data.'
						/>
						<Col md={7}>
							<span data-testid='project-title-details'>
								{data.projectTitle && data.projectTitle.length > 0 ? data.projectTitle : notSpecified}
							</span>
						</Col>
					</Row>

					<Row className='soft-black-14 datause-view-grid'>
						<Col md={4}>
							Lay summary
							{data.laySummary && data.laySummary.length >= 250 ? (
								<button
									className='datause-arrow'
									onClick={() => (!closedLaySummary ? setClosedLaySummary(true) : setClosedLaySummary(false))}>
									<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#475da7'} className={closedLaySummary ? '' : 'flip180'} />
								</button>
							) : (
								''
							)}
						</Col>
						<Guidance
							renderTooltip={renderTooltip}
							text='A concise and clear description of the project, (e.g. as required by URKI in funding applications). It should outline the problem, objectives and expected outcomes in language that is understandable to the general public and contain a maximum of 300 words.'
						/>
						<Col md={7}>
							<span data-testid='laySummary-details'>
								{data.laySummary && data.laySummary.length > 0 ? (
									closedLaySummary ? (
										<>
											{data.laySummary.substr(0, 250)}
											{data.laySummary.length >= 250 ? '...' : ''}
										</>
									) : (
										data.laySummary
									)
								) : (
									notSpecified
								)}
							</span>
						</Col>
					</Row>

					<Row className='soft-black-14 datause-view-grid'>
						<Col md={4}>
							Public benefit statement
							{data.publicBenefitStatement && data.publicBenefitStatement.length >= 250 ? (
								<button
									className='datause-arrow'
									onClick={() => (!closedPublicBenefit ? setClosedPublicBenefit(true) : setClosedPublicBenefit(false))}>
									<SVGIcon
										width='20px'
										height='20px'
										name='chevronbottom'
										fill={'#475da7'}
										className={closedPublicBenefit ? '' : 'flip180'}
									/>
								</button>
							) : (
								''
							)}
						</Col>
						<Guidance
							renderTooltip={renderTooltip}
							text='A description in plain English of the anticipated outcomes, or impact of project on the general public.'
						/>
						<Col md={7}>
							<span data-testid='publicBenefitStatement-details'>
								{data.publicBenefitStatement && data.publicBenefitStatement.length > 0 ? (
									closedPublicBenefit ? (
										<>
											{data.publicBenefitStatement.substr(0, 250)}
											{data.publicBenefitStatement.length >= 250 ? '...' : ''}
										</>
									) : (
										data.publicBenefitStatement
									)
								) : (
									notSpecified
								)}
							</span>
						</Col>
					</Row>

					{!data.requestCategoryType && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Request category type</Col>
							<Guidance renderTooltip={renderTooltip} text='This categorises the main purpose of the data being shared.' />
							<Col md={7}>
								<span data-testid='request-type-details'>
									{data.requestCategoryType && data.requestCategoryType.length > 0 ? data.requestCategoryType : notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.technicalSummary && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Technical summary</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='A summary of the proposed research, in a manner that is suitable for a specialist reader.'
							/>
							<Col md={7}>
								<span data-testid='technical-summary-details'>
									{data.technicalSummary && data.technicalSummary.length > 0 ? data.technicalSummary : notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{(!data.otherApprovalCommittees || data.otherApprovalCommittees.length === 0) && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Other approval committees</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='Reference to other decision-making bodies that the project has already been authorised by.'
							/>
							<Col md={7}>
								<span data-testid='otherApprovalCommittees-details'>
									{data.otherApprovalCommittees && data.otherApprovalCommittees.length > 0 ? data.otherApprovalCommittees : notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.projectStartDate && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Project start date</Col>
							<Guidance renderTooltip={renderTooltip} text='The date the project is scheduled to start or actual start date.' />
							<Col md={6}>
								<span data-testid='project-start-date-details'>
									{data.projectStartDate && data.projectStartDate.length > 0
										? moment(data.projectStartDate).format('YYYY-MM-DD')
										: notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.projectEndDate && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Project end date</Col>
							<Guidance renderTooltip={renderTooltip} text='The date the project is scheduled to finish or actual end date.' />
							<Col md={7}>
								<span data-testid='project-start-end-details'>
									{data.projectEndDate && data.projectEndDate.length > 0 ? moment(data.projectEndDate).format('YYYY-MM-DD') : notSpecified}
								</span>
							</Col>
						</Row>
					)}
					<Row className='soft-black-14 datause-view-grid'>
						<Col md={4}>Latest approval date</Col>
						<Guidance
							renderTooltip={renderTooltip}
							text='The last date the data access request for this project was approved by a data custodian.'
						/>
						<Col md={7}>
							<span data-testid='latest-approval-details'>
								{data.latestApprovalDate && data.latestApprovalDate.length > 0
									? moment(data.latestApprovalDate).format('YYYY-MM-DD')
									: notSpecified}
							</span>
						</Col>
					</Row>
				</Container>
				<Container className='datause-card datause-view-grid datause-safeInfo'>
					<p className='black-14-bold'>Safe data</p>
					<Row className='soft-black-14 datause-view-grid'>
						<Col md={4}>Dataset(s) name</Col>
						<Guidance renderTooltip={renderTooltip} text='The name of the dataset(s) being accessed.' />
						<Col md={7}>
							<span data-testid='dataset-details'>
								{(data.gatewayDatasetsInfo && data.gatewayDatasetsInfo.length > 0) ||
								(data.nonGatewayDatasets && data.nonGatewayDatasets.length > 0) ? (
									<>
										{data &&
											data.gatewayDatasetsInfo.map((gatewayDataset, i) => (
												<>
													{isArray(gatewayDataset) ? (
														<Tag
															key={`gatewayDataset-0-${i}`}
															tagName={gatewayDataset[0].name}
															tagId={gatewayDataset[0].pid}
															tagType='tag'
															url='/dataset/'
															onSearchPage={false}
															activeLink={true}
															className='badge-datause-bold'
														/>
													) : (
														<Tag
															key={`gatewayDataset-${i}`}
															tagName={gatewayDataset.name}
															tagId={gatewayDataset.pid}
															tagType='tag'
															url='/dataset/'
															onSearchPage={false}
															activeLink={true}
															className='badge-datause-bold'
														/>
													)}
												</>
											))}

										{data &&
											data.nonGatewayDatasets.map((nonGatewayDataset, i) => (
												<>
													{' '}
													<span className='nonhdrdataset badge-datause-bold badge-tag' key={`nonhdrdataset-${i}`}>
														{nonGatewayDataset}
													</span>
												</>
											))}
									</>
								) : (
									notSpecified
								)}
							</span>
						</Col>
					</Row>

					{!data.dataSensitivityLevel && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Data sensitivity level</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='The level of identifiability of the data being accessed, as defined by Understanding Patient Data. In the case of multiple datasets being accessed, the sensitivity level for the dataset with the most sensitive data should be used: Personally Identifiable > De-Personalised > Anonymous'
							/>
							<Col md={7}>
								<span data-testid='data-sensitivity-details'>
									{data.dataSensitivityLevel && data.dataSensitivityLevel.length > 0 ? data.dataSensitivityLevel : notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.legalBasisForDataArticle6 && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Legal basis for provision of data under Article 6</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='The lawful basis for processing are set out in Article 6 of the GDPR. At least one legal basis must apply whenever you process personal data. Please select appropriate Article 6 lawful basis. Processing shall be lawful only if and to the extent that at least one of the following applies.'
							/>
							<Col md={7}>
								<span data-testid='legal-basis-6-details'>
									{data.legalBasisForDataArticle6 && data.legalBasisForDataArticle6.length > 0
										? data.legalBasisForDataArticle6
										: notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.legalBasisForDataArticle9 && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Lawful conditions for provision of data under Article 9</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text="Processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, and the processing of genetic data, biometric data for the purpose of uniquely identifying a natural person, data concerning health or data concerning a natural person's sex life or sexual orientation shall be prohibited. This does not apply if one of the following applies."
							/>
							<Col md={7}>
								<span data-testid='legal-basis-9-details'>
									{data.legalBasisForDataArticle9 && data.legalBasisForDataArticle9.length > 0
										? data.legalBasisForDataArticle9
										: notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.dutyOfConfidentiality && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Common law of duty of confidentiality</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='In the application of the Common Law Duty of Confidentiality there are 2 options that enable a release: Consent (Reasonable Expectation) or Section 251 NHS Act 2006.'
							/>
							<Col md={7}>
								<span data-testid='duty-details'>
									{data.dutyOfConfidentiality && data.dutyOfConfidentiality.length > 0 ? data.dutyOfConfidentiality : notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.nationalDataOptOut && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>National data opt-out applied?</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='Specifies whether the preference for people to opt-out of their confidential patient information being used for secondary use has been applied to the data prior to release.'
							/>
							<Col md={7}>
								<span data-testid='data-opt-out-details'>
									{data.nationalDataOptOut && data.nationalDataOptOut.length > 0 ? data.nationalDataOptOut : notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.requestFrequency && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Request frequency</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='Determines whether this a "one-off" request or a recurring dataset to be provided over a specific time period.'
							/>
							<Col md={7}>
								<span data-testid='request-requency-details'>
									{data.requestFrequency && data.requestFrequency.length > 0 ? data.requestFrequency : notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.datasetLinkageDescription && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>For linked datasets, specify how the linkage will take place</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='The information relevant to data linkage, including organisations undertaking linkages and data flows.'
							/>
							<Col md={7}>
								<span data-testid='linkage-details'>
									{data.datasetLinkageDescription && data.datasetLinkageDescription.length > 0
										? data.datasetLinkageDescription
										: notSpecified}
								</span>
							</Col>
						</Row>
					)}
					{!data.confidentialDataDescription && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>
								Description of the confidential data being used
								{data.confidentialDataDescription && data.confidentialDataDescription.length >= 250 ? (
									<button className='datause-arrow' onClick={() => (!closedDataUse ? setClosedDataUse(true) : setClosedDataUse(false))}>
										<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#475da7'} className={closedDataUse ? '' : 'flip180'} />
									</button>
								) : (
									''
								)}
							</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='A description of the specific patient identifiable fields that have been included in the dataset(s) being accessed.'
							/>
							<Col md={7}>
								{closedDataUse
									? data.confidentialDataDescription
										? data.confidentialDataDescription.substr(0, 150)
										: notSpecified
									: data.confidentialDataDescription}
							</Col>
						</Row>
					)}
					{!data.accessDate && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>Release/Access date</Col>
							<Guidance renderTooltip={renderTooltip} text='The date the data access was granted and active research started.' />
							<Col md={7}>
								<span data-testid='access-date-details'>
									{data.accessDate && data.accessDate.length > 0 ? moment(data.accessDate).format('YYYY-MM-DD') : notSpecified}
								</span>
							</Col>
						</Row>
					)}
				</Container>
				<Container className='datause-card datause-safeInfo'>
					<p className='black-14-bold'>Safe setting</p>
					<Row className='soft-black-14 datause-view-grid'>
						<Col md={4}>Access type</Col>
						<Guidance
							renderTooltip={renderTooltip}
							text='An indication of how data is accessed, whether through access to a Data Safe Haven/Trusted Research Environment or through data release in any other local environment.'
						/>
						<Col md={7}>
							<span data-testid='access-type-details'>
								{data.accessType && data.accessType.length > 0 ? data.accessType : notSpecified}
							</span>
						</Col>
					</Row>

					{!data.privacyEnhancements && hide ? (
						(() => {
							count++;
						})()
					) : (
						<Row className='soft-black-14 datause-view-grid'>
							<Col md={4}>How has data been processed to enhance privacy?</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='Description of the tools or software used to reduce level of identifiable data being shared.'
							/>
							<Col md={7}>
								<span data-testid='privacy-details'>
									{data.privacyEnhancements && data.privacyEnhancements.length > 0 ? data.privacyEnhancements : notSpecified}
								</span>
							</Col>
						</Row>
					)}
				</Container>

				{(!data.gatewayOutputsToolsInfo || data.gatewayOutputsToolsInfo.length === 0) &&
				(!data.gatewayOutputsPapers || data.gatewayOutputsPapers.length === 0) &&
				(!data.nonGatewayOutputs || data.nonGatewayOutputs.length === 0) &&
				hide ? (
					(() => {
						count++;
					})()
				) : (
					<Container className='datause-card datause-safeInfo'>
						<p className='black-14-bold'>Safe output</p>
						<Row className='soft-black-14'>
							<Col md={4}>Link to research outputs</Col>
							<Guidance
								renderTooltip={renderTooltip}
								text='A URL link to any academic or non-academic research outputs, as they become available, including code used.'
							/>
							<Col md={7}>
								<span data-testid='output-details'>
									{(data.gatewayOutputsToolsInfo && data.gatewayOutputsToolsInfo.length > 0) ||
									(data.gatewayOutputsPapers && data.gatewayOutputsPapers.length > 0) ||
									(data.nonGatewayOutputs && data.nonGatewayOutputs.length > 0) ? (
										<>
											{data &&
												data.gatewayOutputsToolsInfo.map((gatewayOutputsTool, i) => (
													<Tag
														key={`gatewayOutputsTool-${i}`}
														tagId={gatewayOutputsTool.id}
														tagName={gatewayOutputsTool.name}
														tagType='tag'
														url='/tool/'
														onSearchPage={false}
														showTagType={false}
														activeLink={true}
														className='badge-datause-bold'
													/>
												))}{' '}
											{data &&
												data.gatewayOutputsPapersInfo.map((gatewayOutputsPaper, i) => (
													<Tag
														key={`gatewayOutputsPaper-${i}`}
														tagId={gatewayOutputsPaper.id}
														tagName={gatewayOutputsPaper.name}
														tagType='tag'
														url='/paper/'
														onSearchPage={false}
														showTagType={false}
														activeLink={true}
														className='badge-datause-bold'
													/>
												))}{' '}
											{data &&
												data.nonGatewayOutputs.map(nonGatewayOutput => (
													<div>
														<a href={nonGatewayOutput} className='purple-blue-14'>
															{nonGatewayOutput}
														</a>
													</div>
												))}
										</>
									) : (
										notSpecified
									)}
								</span>
							</Col>
						</Row>
					</Container>
				)}
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
				<Button className='datause-button' onClick={() => (hide ? setHide(false) : setHide(true))} data-testid='hidefields'>
					{!hide ? 'Hide all empty fields' : 'Show all empty fields (' + count + ')'}
				</Button>
			</Row>
		</>
	);
};

export default About;
