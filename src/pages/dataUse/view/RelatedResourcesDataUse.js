import React from 'react';
import DropdownMenu from './DataUseDropdown';
import { Row, Col, Container } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';

const RelatedResources = ({ data }) => {
	return (
		<>
			<Row className='datause-relatedresource-search'>
				<Col md={9}>
					<span className='datause-relatedresources-search  form-control'>
						<span className='datause-relatedresources-searchicon'>
							<SVGIcon name='searchicon' width={20} height={20} fill={'#2c8267'} stroke='none' type='submit' />
						</span>
						<span>
							<input className='datause-relatedresources-search-input' type='text' placeholder='Search within related resources' />
						</span>
					</span>
				</Col>
				<Col md={3}>
					<DropdownMenu />
				</Col>
			</Row>
			{data.map(a => (
				<Container className='datause-card datause-relatedresource-cointainer'>
					<Row className='purple-bold-16'>
						<Col>{a.title}</Col>
					</Row>
					<Row className='black-14'>
						<Col>{a.org}</Col>
					</Row>
					<Row>
						<Col>{a.keywordType}</Col>
					</Row>
					<Row>
						<Col className='gray-600-14'>Datasets</Col>
						<Col>{a.keywords}</Col>
					</Row>
					<Row>
						<Col className='gray-600-14'>Data custodian</Col>
						<Col>{a.custodian}</Col>
					</Row>
					<div className='datause-comments-divider'>
						<hr />
						<span className='gray700-13'>Relationship between these resources</span>
					</div>
					<Container className='datause-comments-section'>
						<Row>
							<Col md={10} className='gray700-13-bold'>
								{a.comments.author}
							</Col>
							<Col md={2} className='gray700-13 datause-comments-date'>
								{a.comments.date}
							</Col>
						</Row>
						<Row className='soft-black-14'>
							<Col>{a.comments.description}</Col>
						</Row>
					</Container>
				</Container>
			))}
		</>
	);
};

export default RelatedResources;
