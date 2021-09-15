import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const About = ({ data }) => {
	return (
		<>
			{data.map(a => (
				<>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe people</p>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Organisation name</Col>
							<Col>{a.org}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Organisation ID</Col>
							<Col>{a.safePeople.orgID}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Organisation sector</Col>
							<Col>{a.safePeople.orgSector}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Applicant name(s)</Col>
							<Col>{a.safePeople.applicantNames}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Applicant ID</Col>
							<Col>{a.safePeople.applicantID}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Funders/Sponsor</Col>
							<Col>{a.safePeople.funders}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>DEA accredited researcher status</Col>
							<Col>{a.safePeople.accreditationStatus}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Sub-licence arrangements (if any)?</Col>
							<Col>{a.safePeople.subLicence}</Col>
						</Row>
					</Container>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe projects</p>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project ID</Col>
							<Col>{a.safeProjects.projectID}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project title</Col>
							<Col>{a.title}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Lay summary</Col>
							<Col>{a.safeProjects.laySummary}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Public benefit statement</Col>
							<Col>{a.safeProjects.publicBenefitStatement}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Request category type</Col>
							<Col>{a.safeProjects.requestCategoryType}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Technical summary</Col>
							<Col>{a.safeProjects.technicalSummary}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Other approval committees</Col>
							<Col>{a.safeProjects.OtherApprovalCommittees}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project start date</Col>
							<Col>{a.safeProjects.projectStartDate}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Project end date</Col>
							<Col>{a.safeProjects.projectEndDate}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Latest approval date</Col>
							<Col>{a.safeProjects.latestApprovalDate}</Col>
						</Row>
					</Container>
					<Container className='datause-card datause-view-grid'>
						<p className='black-14-bold'>Safe data</p>
						<Row className='soft-black-14'>
							<Col>Dataset(s) name</Col>
							<Col>{a.safeData.datasetNames}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Data sensitivity level</Col>
							<Col>{a.safeData.dataSensitvityLevel}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Legal basis for provision of data</Col>
							<Col>{a.safeData.legalBasis}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Common law of duty of confidentiality</Col>
							<Col>{a.safeData.commonLawConfidentiality}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>National data opt-out applied?</Col>
							<Col>{a.safeData.nationalOpt}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Request frequency</Col>
							<Col>{a.safeData.requestFrequency}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Description of how the data will be used</Col>
							<Col>{a.safeData.descriptionUsage}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Description of the confidential data being used</Col>
							<Col>{a.safeData.descriptionConfidentialUsage}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Release/Access date</Col>
							<Col>{a.safeData.releaseAccessDate}</Col>
						</Row>
					</Container>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe setting</p>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>Trusted research environment or any other specified location</Col>
							<Col>{a.safeSetting.dataProcessPrivacy}</Col>
						</Row>
						<Row className='soft-black-14 datause-view-grid'>
							<Col>How has data been processed to enhance privacy?</Col>
							<Col>{a.safeSetting.trustedResearchEnv}</Col>
						</Row>
					</Container>
					<Container className='datause-card'>
						<p className='black-14-bold'>Safe output</p>
						<Row className='soft-black-14'>
							<Col>Link to research outputs</Col>
							<Col>{a.safeOutput.link}</Col>
						</Row>
					</Container>
				</>
			))}

			<Row>
				<p className='soft-black-14'>
					Data custodians are responsible for providing information about their approved data uses register. Where not all fields are
					completed, we hide empty fields to make the page easier to read, but you can choose to view them.
				</p>
				<Button>Hide all emptpy fields</Button>
			</Row>
		</>
	);
};

export default About;
