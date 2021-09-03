import React from 'react';
import { Table, Dropdown } from 'react-bootstrap';

const DataUseTable = ({ data, active }) => (
	<Table striped bordered hover>
		<thead>
			<tr>
				<th>Last activity</th>
				<th>Project Title</th>
				<th>Dataset(s)</th>
				{active && <th></th>}
			</tr>
		</thead>
		<tbody>
			{data.map(a => (
				<tr>
					<td>{a.lastActivity}</td>
					<td>
						<p>{a.projectTitle}</p>
						<p>{a.institution}</p>
					</td>
					<td>{a.datasets}</td>
					{active && (
						<td>
							<Dropdown>
								<Dropdown.Toggle variant='outline-secondary' id='dropdown-basic'>
									Actions
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item href='#/action-1'>Edit</Dropdown.Item>
									<Dropdown.Item href='#/action-2'>Archive</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</td>
					)}
				</tr>
			))}
		</tbody>
	</Table>
);

export default DataUseTable;
