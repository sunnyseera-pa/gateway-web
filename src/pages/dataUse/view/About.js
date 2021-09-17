import React, { useState } from 'react';
import { Container, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';

const About = ({ data, aboutComp }) => {
	const [closedLaySummary, setClosedLaySummary] = useState(true);
	const [closedPublicBenefit, setClosedPublicBenefit] = useState(true);
	const [closedDataUse, setClosedDataUse] = useState(true);
	const [hide, setHide] = useState(false);

	const exampleTooltip = props => (
		<Tooltip className='datause-info-icon-tooltip' {...props}>
			Example tooltip
		</Tooltip>
	);

	return (
		<>
			{data.map(a => (
				<>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe people</p>
						{!a.org > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Project ID</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>{a.org.length > 0 ? a.org : hide && <p className='gray800-14-opacity'>Not specified</p>}</Col>
							</Row>
						)}
						{!a.safePeople.orgID > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Organisation ID</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>{a.safePeople.orgID.length > 0 ? a.safePeople.orgID : <p className='gray800-14-opacity'>Not specified</p>}</Col>
							</Row>
						)}
						{!a.safePeople.orgSector > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Organisation sector</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safePeople.orgSector.length > 0 ? a.safePeople.orgSector : <p className='gray800-14-opacity'>Not specified</p>}
								</Col>
							</Row>
						)}
						{!a.safePeople.applicantNames > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Applicant name(s)</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safePeople.applicantNames.length > 0 ? (
										a.safePeople.applicantNames
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}

						{!a.safePeople.applicantID > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Applicant ID</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safePeople.applicantID.length > 0 ? a.safePeople.applicantID : <p className='gray800-14-opacity'>Not specified</p>}
								</Col>
							</Row>
						)}

						{!a.safePeople.funders > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Funders/Sponsor</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safePeople.funders.length > 0 ? a.safePeople.funders.length : <p className='gray800-14-opacity'>Not specified</p>}
								</Col>
							</Row>
						)}

						{!a.safePeople.accreditationStatus > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>DEA accredited researcher status</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safePeople.accreditationStatus.length > 0 ? (
										a.safePeople.accreditationStatus
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}

						{!a.safePeople.subLicence > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Sub-licence arrangements (if any)?</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safePeople.subLicence.length > 0 ? a.safePeople.subLicence : <p className='gray800-14-opacity'>Not specified</p>}
								</Col>
							</Row>
						)}
					</Container>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe projects</p>
						{!a.safeProjects.projectID > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Project ID</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeProjects.projectID.length > 0 ? a.safeProjects.projectID : <p className='gray800-14-opacity'>Not specified</p>}
								</Col>
							</Row>
						)}
						{!a.title > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Project title</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>{a.title.length > 0 ? a.title : <p className='gray800-14-opacity'>Not specified</p>}</Col>
							</Row>
						)}
						{!a.safeProjects.laySummary > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>
									Lay summary
									<button
										className='datause-arrow'
										onClick={() => (!closedLaySummary ? setClosedLaySummary(true) : setClosedLaySummary(false))}>
										<SVGIcon
											width='20px'
											height='20px'
											name='chevronbottom'
											fill={'#475da7'}
											className={closedLaySummary ? 'flip180' : ''}
										/>
									</button>
								</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeProjects.laySummary.length > 0 ? (
										closedLaySummary ? (
											a.safeProjects.laySummary.substr(0, 250)
										) : (
											a.safeProjects.laySummary
										)
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}
						{!a.safeProjects.publicBenefitStatement > 0 && hide ? (
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
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeProjects.publicBenefitStatement.length > 0 ? (
										closedPublicBenefit ? (
											a.safeProjects.publicBenefitStatement.substr(0, 250)
										) : (
											a.safeProjects.publicBenefitStatement
										)
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}
						{!a.safeProjects.requestCategoryType && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Request category type</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeProjects.requestCategoryType.length > 0 ? (
										a.safeProjects.requestCategoryType
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}
						{!a.safeProjects.technicalSummary && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Technical summary</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeProjects.technicalSummary.length > 0 ? (
										a.safeProjects.technicalSummary
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}

						{!a.safeProjects.otherApprovalCommittees && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Other approval committees</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeProjects.otherApprovalCommittees.length > 0 ? (
										a.safeProjects.otherApprovalCommittees
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}

						{!a.safeProjects.projectStartDate > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Project start date</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeProjects.projectStartDate.length > 0 ? (
										a.safeProjects.projectStartDate
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}

						{!a.safeProjects.projectEndDate > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Project end date</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeProjects.projectEndDate.length > 0 ? (
										a.safeProjects.projectEndDate
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}

						{!a.safeProjects.latestApprovalDate > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Latest approval date</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeProjects.latestApprovalDate.length > 0 ? (
										a.safeProjects.latestApprovalDate
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}
					</Container>
					<Container className='datause-card datause-view-grid'>
						<p className='black-14-bold'>Safe data</p>
						{!a.safeData.datasetNames > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14'>
								<Col>Dataset(s) name</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeData.datasetNames.length > 0 ? a.safeData.datasetNames : <p className='gray800-14-opacity'>Not specified</p>}
								</Col>
							</Row>
						)}
						{!a.safeData.dataSensitvityLevel > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Data sensitivity level</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeData.dataSensitvityLevel.length > 0 ? (
										a.safeData.dataSensitvityLevel
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}
						{!a.safeData.legalBasis > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Legal basis for provision of data</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>{a.safeData.legalBasis.length > 0 ? a.safeData.legalBasis : <p className='gray800-14-opacity'>Not specified</p>}</Col>
							</Row>
						)}
						{!a.safeData.commonLawConfidentiality > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Common law of duty of confidentiality</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeData.commonLawConfidentiality.length > 0 ? (
										a.safeData.commonLawConfidentiality
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}
						{!a.safeData.nationalOpt > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>National data opt-out applied?</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeData.nationalOpt.length > 0 ? a.safeData.nationalOpt : <p className='gray800-14-opacity'>Not specified</p>}
								</Col>
							</Row>
						)}
						{!a.safeData.requestFrequency > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Request frequency</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeData.requestFrequency.length > 0 ? (
										a.safeData.requestFrequency
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}
						{!a.safeData.descriptionUsage > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>
									Description of how the data will be used
									<button className='datause-arrow' onClick={() => (!closedDataUse ? setClosedDataUse(true) : setClosedDataUse(false))}>
										<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#475da7'} className={closedDataUse ? 'flip180' : ''} />
									</button>
								</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>{closedDataUse ? a.safeData.descriptionUsage.join().substr(0, 150) : a.safeData.descriptionUsage}</Col>
							</Row>
						)}
						{!a.safeData.descriptionConfidentialUsage > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Description of the confidential data being used</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeData.descriptionConfidentialUsage.length > 0 ? (
										a.safeData.descriptionConfidentialUsage
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}
						{!a.safeData.releaseAccessDate > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Release/Access date</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeData.releaseAccessDate.length > 0 ? (
										a.safeData.releaseAccessDate
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}
					</Container>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe setting</p>
						{!a.safeSetting.dataProcessPrivacy > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>Trusted research environment or any other specified location</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeSetting.dataProcessPrivacy.length > 0 ? (
										a.safeSetting.dataProcessPrivacy
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}

						{!a.safeSetting.trustedResearchEnv > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14 datause-view-grid'>
								<Col>How has data been processed to enhance privacy?</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>
									{a.safeSetting.trustedResearchEnv.length > 0 ? (
										a.safeSetting.trustedResearchEnv
									) : (
										<p className='gray800-14-opacity'>Not specified</p>
									)}
								</Col>
							</Row>
						)}
					</Container>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe output</p>
						{!a.safeOutput.link > 0 && hide ? (
							''
						) : (
							<Row className='soft-black-14'>
								<Col>Link to research outputs</Col>
								<OverlayTrigger placement='top' overlay={exampleTooltip}>
									<Button className='datause-info-icon-button'>
										<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
									</Button>
								</OverlayTrigger>
								<Col>{a.safeOutput.link.length > 0 ? a.safeOutput.link : <p className='gray800-14-opacity'>Not specified</p>}</Col>
							</Row>
						)}
					</Container>
				</>
			))}
			<Row>
				<Col className='datause-about-info'>
					<p className='soft-black-14'>
						Data custodians are responsible for providing information about their approved data uses register. Where not all fields are
						completed, we hide empty fields to make the page easier to read, but you can choose to view them.
					</p>
				</Col>
			</Row>
			<Row className='datause-hidefields-button'>
				<Button className='datause-emptyfields-button' onClick={() => (hide ? setHide(false) : setHide(true))}>
					{!hide ? 'Hide all empty fields' : 'Show all empty fields'}
				</Button>
			</Row>
		</>
	);
};

export default About;
