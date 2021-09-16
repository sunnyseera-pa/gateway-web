import React, { useState } from 'react';
import { Container, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';

const About = ({ data }) => {
	const [closedLaySummary, setClosedLaySummary] = useState(true);
	const [closedPublicBenefit, setClosedPublicBenefit] = useState(true);
	const [closedDataUse, setClosedDataUse] = useState(true);

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
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Organisation name</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.org}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Organisation ID</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safePeople.orgID}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Organisation sector</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safePeople.orgSector}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Applicant name(s)</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safePeople.applicantNames}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Applicant ID</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safePeople.applicantID}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Funders/Sponsor</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safePeople.funders}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>DEA accredited researcher status</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safePeople.accreditationStatus}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Sub-licence arrangements (if any)?</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safePeople.subLicence}</Col>
						</Row>
					</Container>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe projects</p>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project ID</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeProjects.projectID}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project title</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.title}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>
								Lay summary
								<button
									className='datause-arrow'
									onClick={() => (!closedLaySummary ? setClosedLaySummary(true) : setClosedLaySummary(false))}>
									<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#475da7'} className={closedLaySummary ? 'flip180' : ''} />
								</button>
							</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{closedLaySummary ? a.safeProjects.laySummary.substr(0, 250) : a.safeProjects.laySummary}</Col>
						</Row>
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
								{closedPublicBenefit ? a.safeProjects.publicBenefitStatement.substr(0, 250) : a.safeProjects.publicBenefitStatement}
							</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Request category type</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeProjects.requestCategoryType}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Technical summary</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeProjects.technicalSummary}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Other approval committees</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeProjects.OtherApprovalCommittees}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project start date</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeProjects.projectStartDate}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project end date</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeProjects.projectEndDate}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Latest approval date</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeProjects.latestApprovalDate}</Col>
						</Row>
					</Container>
					<Container className='datause-card datause-view-grid'>
						<p className='black-14-bold'>Safe data</p>
						<Row className='soft-black-14'>
							<Col>Dataset(s) name</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeData.datasetNames}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Data sensitivity level</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeData.dataSensitvityLevel}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Legal basis for provision of data</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeData.legalBasis}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Common law of duty of confidentiality</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeData.commonLawConfidentiality}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>National data opt-out applied?</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeData.nationalOpt}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Request frequency</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeData.requestFrequency}</Col>
						</Row>
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
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Description of the confidential data being used</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeData.descriptionConfidentialUsage}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Release/Access date</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeData.releaseAccessDate}</Col>
						</Row>
					</Container>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe setting</p>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Trusted research environment or any other specified location</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeSetting.dataProcessPrivacy}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>How has data been processed to enhance privacy?</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeSetting.trustedResearchEnv}</Col>
						</Row>
					</Container>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe output</p>
						<Row className='soft-black-14'>
							<Col>Link to research outputs</Col>
							<OverlayTrigger placement='top' overlay={exampleTooltip}>
								<Button className='datause-info-icon-button'>
									<SVGIcon name='info' width={8} height={8} fill={'#475da7'} className='datause-info-icon' />
								</Button>
							</OverlayTrigger>
							<Col>{a.safeOutput.link}</Col>
						</Row>
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
				<Button>Show/Hide all empty fields</Button>
			</Row>
		</>
	);
};

export default About;
