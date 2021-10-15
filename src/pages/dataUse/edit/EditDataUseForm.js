import React, { useState } from 'react';
import { Accordion, Card, Button, Row } from 'react-bootstrap';
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
					<Card.Body>Body content for panel 1</Card.Body>
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
					<Card.Body>Body content for panel 2</Card.Body>
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
					<Card.Body>Body content for panel 2</Card.Body>
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
					<Card.Body>Body content for panel 2</Card.Body>
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
					<Card.Body>Body content for panel 2</Card.Body>
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
					<Card.Body>Body content for panel 2</Card.Body>
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
					<Card.Body>Body content for panel 2</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default EditFormDataUse;
