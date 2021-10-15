import React, { useState } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';

const EditFormDataUse = () => {
	const [closed, setClosed] = useState(true);

	return (
		<Accordion defaultActiveKey='0' className='datause-accordion-header'>
			<Card>
				<Accordion.Toggle as={Button} variant='link' eventKey='0'>
					<Card.Header className='datause-accordion'>
						<button className='saved-search-arrow' onClick={() => (!closed ? setClosed(true) : setClosed(false))}>
							<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#fff'} className={closed ? 'flip180' : ''} />
						</button>
						Safe People
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='0'>
					<Card.Body>
						<Form>
							<Form.Group>
								<Form.Label>Organisation name</Form.Label>
								<p>The name of the legal entity that signs the contract to access the data</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Organisation ID (optional)</Form.Label>
								<p>
									A unique identifier for an organisation that is preferably an industry used standard such as <a href='grid.ac'>Grid.ac</a>
								</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Organisation sector (optional)</Form.Label>
								<p>The type of organisation that has signed a contract to access the data</p>
								<Form.Control as='select'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Applicant name(s) (optional)</Form.Label>
								<p>
									The name of the Principal Investigator, as well as any other individuals that have been authorised to use the data. If
									they are on the Gateway, please provide their profile URL
								</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Applicant ID (optional)</Form.Label>
								<p>
									ORCID identifier. This provides a persistent digital identifier that you own and control, and that distinguishes you from
									every other researcher. An ORCID profile can be created at https://orcid.org/
								</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Funders/Sponsor (optional)</Form.Label>
								<p>The name of any funders or sponsors involved in the project</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>DEA accredited researcher? (optional)</Form.Label>
								<p>
									Depending on the type of data you are requesting, you might be required to become an accredited researcher. Most access to
									data in the Secure Research Service (SRS) will be by researchers accredited under the Digital Economy Act 2017 (DEA). This
									specifies the accreditation status of the principal applicant/researcher, as defined by the ONS Research Code of Practice
									and Accreditation criteria
								</p>
								<Form.Control as='select'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Sub-licence arrangements (if any)? (optional)</Form.Label>
								<p>
									Identifies whether there are any permissions for the applicant to share the data beyond the named parties. e.g., NHS
									Digital may approve a data release to the ONS, who then makes decisions about access to accredited researchers undertaking
									approved projects in their own trusted research environment.
								</p>
								<Form.Control as='select'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card>
				<Accordion.Toggle as={Button} variant='link' eventKey='1'>
					<Card.Header className='datause-accordion'>
						<button className='saved-search-arrow' onClick={() => (!closed ? setClosed(true) : setClosed(false))}>
							<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#fff'} className={closed ? 'flip180' : ''} />
						</button>
						Safe project
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey='1'>
					<Card.Body>
						<Form>
							<Form.Group>
								<Form.Label>Project ID</Form.Label>
								<p>
									A unique identifier for the project that is preferably an industry used standard, such as IRAS ID. However for
									non-research projects, a unique reference number created by the data custodian on receipt of the application is sufficient
								</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Project title</Form.Label>
								<p>The title of the project/research study/request that the applicant is investigating through the use of health data</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Lay summar (optional)</Form.Label>
								<p>
									A concise and clear description of the project, (e.g. as required by URKI in funding applications). It should outline the
									problem, objectives and expected outcomes in language that is understandable to the general public
								</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Public benefit statement (optional)</Form.Label>
								<p>A description in plain English of the anticipated outcomes, or impact of project on the general public</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Request category type (optional)</Form.Label>
								<p>This categorises the 'purpose of the share' (i.e., research, policy development, etc)</p>
								<Form.Control as='select'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Technical summary (optional)</Form.Label>
								<p>A summary of the proposed research, in a manner that is suitable for a specialist reader</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Other approval committees (optional)</Form.Label>
								<p>Reference to other decision-making bodies that the project has already been authorised by</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Project start date (optional)</Form.Label>
								<p>The date the project is scheduled to start or actual start date</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Project end date (optional)</Form.Label>
								<p>The date the project is scheduled to end or actual end date</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Latest approval date (optional)</Form.Label>
								<p>The last date the data access request for this project was approved by a data custodian</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card>
				<Accordion.Toggle as={Button} variant='link' eventKey='2'>
					<Card.Header className='datause-accordion'>
						<button className='saved-search-arrow' onClick={() => (!closed ? setClosed(true) : setClosed(false))}>
							<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#fff'} className={closed ? 'flip180' : ''} />
						</button>
						Safe data
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='2'>
					<Card.Body>
						<Form>
							<Form.Group>
								<Form.Label>Dataset(s) name</Form.Label>
								<p>The name of the dataset(s) being accessed</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Dataset sensitivity level (optional)</Form.Label>
								<p>The level of identifiability of the data being accessed, as defined by Understanding Patient Data </p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Legal basis for provision of data under Article 6 (optional)</Form.Label>
								<p>
									The lawful basis for processing are set out in Article 6 of the GDPR. At least one legal basis must apply whenever you
									process personal data. Please select appropriate Article 6 lawful basis. Processing shall be lawful only if and to the
									extent that at least one of the following applies
								</p>
								<Form.Control as='select'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Lawful conditions for provision of data under Article 9 (optional)</Form.Label>
								<p>
									Processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or
									trade union membership, and the processing of genetic data, biometric data for the purpose of uniquely identifying a
									natural person, data concerning health or data concerning a natural person's sex life or sexual orientation shall be
									prohibited. This does not apply if one of the following applies
								</p>
								<Form.Control as='select'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Common law of duty of confidentiality (optional)</Form.Label>
								<p>
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
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>National data opt-out applied? (optional)</Form.Label>
								<p>
									Specifies whether the preference for people to opt-out of their confidential patient information being used for secondary
									use has been applied to the data prior to release
								</p>
								<Form.Control as='select'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Request frequency (optional)</Form.Label>
								<p>Determines whether this a 'one-off' request or a recurring dataset to be provided over a specific time period</p>
								<Form.Control as='select'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>For linked datasets, specify how the linkage will take place (optional)</Form.Label>
								<p>
									Specifies whether applicant intends for the datasets to be linked with any additional datasets. Relevant information on
									the organisations undertaking linkages and how the linkage will take place must also be disclosed. As well as, a summary
									of the risks/mitigations to be considered
								</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Description of how the data will be used (optional)</Form.Label>
								<p>A description of the specific patient identifiable fields that have been included in the dataset(s) being accessed</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>

							<Form.Group>
								<Form.Label>Release/Access date (optional)</Form.Label>
								<p>The date the data access was granted and active research started</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card>
				<Accordion.Toggle as={Button} variant='link' eventKey='3'>
					<Card.Header className='datause-accordion'>
						<button className='saved-search-arrow' onClick={() => (!closed ? setClosed(true) : setClosed(false))}>
							<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#fff'} className={closed ? 'flip180' : ''} />
						</button>
						Safe settings
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='3'>
					<Card.Body>
						<Form>
							<Form.Group>
								<Form.Label>Access type (optional)</Form.Label>
								<p>
									Determines whether the data will be accessed within a Trusted Research Environment (TRE) or via the traditional data
									release modelDetermines whether the data will be accessed within a Trusted Research Environment (TRE) or via the
									traditional data release model
								</p>
								<Form.Control as='select'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>How has data been processed to enhance privacy? (optional)</Form.Label>
								<p>Description of the tools or software used to reduce level of identifiable data being shared</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card>
				<Accordion.Toggle as={Button} variant='link' eventKey='4'>
					<Card.Header className='datause-accordion'>
						<button className='saved-search-arrow' onClick={() => (!closed ? setClosed(true) : setClosed(false))}>
							<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#fff'} className={closed ? 'flip180' : ''} />
						</button>
						Safe output
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='4'>
					<Card.Body>
						<Form>
							<Form.Group>
								<Form.Label>Link to research outputs (optional)</Form.Label>
								<p>
									A URL link to any academic or non-academic research outputs, as they become available, including code used. If the link is
									to a Gateway resource, this will automatically populate in related resources.
								</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card>
				<Accordion.Toggle as={Button} variant='link' eventKey='5'>
					<Card.Header className='datause-accordion'>
						<button className='saved-search-arrow' onClick={() => (!closed ? setClosed(true) : setClosed(false))}>
							<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#fff'} className={closed ? 'flip180' : ''} />
						</button>
						Keywords
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='5'>
					<Card.Body>
						<Form>
							<Form.Group>
								<Form.Label>Keywords (optional)</Form.Label>
								<p>Select maximum 5 keywords that will help make your data use easily searchable</p>
								<Form.Control type='text' placeholder='' />
							</Form.Group>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card>
				<Accordion.Toggle as={Button} variant='link' eventKey='6'>
					<Card.Header className='datause-accordion'>
						<button className='saved-search-arrow' onClick={() => (!closed ? setClosed(true) : setClosed(false))}>
							<SVGIcon width='20px' height='20px' name='chevronbottom' fill={'#fff'} className={closed ? 'flip180' : ''} />
						</button>
						Related resources
					</Card.Header>
				</Accordion.Toggle>
				<Accordion.Collapse className='datause-accordion-collapse' eventKey='6'>
					<Card.Body>
						<p>Related resources (optional)</p>
						<p>Link this to other papers, data uses, datasets, tools, courses and people. Resources must be added to the Gateway first.</p>
						<hr />
						<Button>+ Add resources</Button>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default EditFormDataUse;
