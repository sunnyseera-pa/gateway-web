import React from 'react';
import FilterSelection from '../components/FilterSelection';
import SortDropdown from '../components/SortDropdown';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './FiltersPanel.scss';

const FiltersPanel = () => (
	<Container>
		<Row>
			<Col className='title'>Showing # results of 'query'</Col>
			<Col>
				<Button variant='outline-success' className='saved'>
					Save
				</Button>
				<Button variant='light' className='saved-preference'>
					Saved preference
				</Button>
				[SortDropdownMenu]
			</Col>
		</Row>
		<Row>
			<FilterSelection selectedCount selectedItems onHandelClearAll onHandelClearAll />
		</Row>
	</Container>
);

export default FiltersPanel;
