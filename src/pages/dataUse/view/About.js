import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const About = ({ data }) => {
	console.log(data);
	return (
		<Container>
			{data.map(a => (
				<>
					<Container className='datause-card'>
						Safe people
						<Row>
							<Col>Organisation name</Col>
							<Col>{a.org}</Col>
						</Row>
						<Row>
							<Col>Organisation ID</Col>
							<Col>{a.safePeople.orgID}</Col>
						</Row>
						<Row>
							<Col>Organisation sector</Col>
							<Col>{a.safePeople.orgSector}</Col>
						</Row>
						<Row>
							<Col>Applicant name(s)</Col>
							<Col>{a.safePeople.applicantNames}</Col>
						</Row>
						<Row>
							<Col>Applicant ID</Col>
							<Col>{a.safePeople.applicantID}</Col>
						</Row>
						<Row>
							<Col>Funders/Sponsor</Col>
							<Col>{a.safePeople.funders}</Col>
						</Row>
						<Row>
							<Col>DEA accredited researcher status</Col>
							<Col>{a.safePeople.accreditationStatus}</Col>
						</Row>
						<Row>
							<Col>Sub-licence arrangements (if any)?</Col>
							<Col>{a.safePeople.subLicence}</Col>
						</Row>
					</Container>
					<Container className='datause-card'>
						safe projects
						<Row>
							<Col>Project ID</Col>
							<Col>{a.safeProjects.projectID}</Col>
						</Row>
						<Row>
							<Col>Project title</Col>
							<Col>{a.title}</Col>
						</Row>
						<Row>
							<Col>Lay summary</Col>
							<Col>{a.safeProjects.laySummary}</Col>
						</Row>
						<Row>
							<Col>Public benefit statement</Col>
							<Col>{a.safeProjects.publicBenefitStatement}</Col>
						</Row>
						<Row>
							<Col>Request category type</Col>
							<Col>{a.safeProjects.requestCategoryType}</Col>
						</Row>
						<Row>
							<Col>Technical summary</Col>
							<Col>{a.safeProjects.technicalSummary}</Col>
						</Row>
						<Row>
							<Col>Other approval committees</Col>
							<Col>{a.safeProjects.OtherApprovalCommittees}</Col>
						</Row>
						<Row>
							<Col>Project start date</Col>
							<Col>{a.safeProjects.projectStartDate}</Col>
						</Row>
						<Row>
							<Col>Project end date</Col>
							<Col>{a.safeProjects.projectEndDate}</Col>
						</Row>
						<Row>
							<Col>Latest approval date</Col>
							<Col>{a.safeProjects.latestApprovalDate}</Col>
						</Row>
					</Container>
					<Container className='datause-card'>
						safe data
						<Row>
							<Col>Dataset(s) name</Col>
							<Col>{a.safeData.datasetNames}</Col>
						</Row>
						<Row>
							<Col>Data sensitivity level</Col>
							<Col>{a.safeData.dataSensitvityLevel}</Col>
						</Row>
						<Row>
							<Col>Legal basis for provision of data</Col>
							<Col>{a.safeData.legalBasis}</Col>
						</Row>
						<Row>
							<Col>Common law of duty of confidentiality</Col>
							<Col>{a.safeData.commonLawConfidentiality}</Col>
						</Row>
						<Row>
							<Col>National data opt-out applied?</Col>
							<Col>{a.safeData.nationalOpt}</Col>
						</Row>
						<Row>
							<Col>Request frequency</Col>
							<Col>{a.safeData.requestFrequency}</Col>
						</Row>
						<Row>
							<Col>Description of how the data will be used</Col>
							<Col>{a.safeData.descriptionUsage}</Col>
						</Row>
						<Row>
							<Col>Description of the confidential data being used</Col>
							<Col>{a.safeData.descriptionConfidentialUsage}</Col>
						</Row>
						<Row>
							<Col>Release/Access date</Col>
							<Col>{a.safeData.releaseAccessDate}</Col>
						</Row>
					</Container>
					<Container className='datause-card'>
						safe setting
						<Row>
							<Col>Trusted research environment or any other specified location</Col>
							<Col>{a.safeSetting.dataProcessPrivacy}</Col>
						</Row>
						<Row>
							<Col>How has data been processed to enhance privacy?</Col>
							<Col>{a.safeSetting.trustedResearchEnv}</Col>
						</Row>
					</Container>
					<Container className='datause-card'>
						safe output
						<Row>
							<Col>Link to research outputs</Col>
							<Col>{a.safeOutput.link}</Col>
						</Row>
					</Container>
				</>
			))}

			<Row>
				<p>
					Data custodians are responsible for providing information about their approved data uses register. Where not all fields are
					completed, we hide empty fields to make the page easier to read, but you can choose to view them.
				</p>
				<Button>Hide all emptpy fields</Button>
			</Row>
		</Container>
	);
};

export default About;
