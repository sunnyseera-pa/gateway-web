import React from 'react';
import { Table } from 'react-bootstrap';

const DataUseTable = ({ data }) => (
	<Table striped bordered hover>
		<thead>
			<tr>
				<th>Last activity</th>
				<th>Project Title</th>
				<th>Dataset(s)</th>
				<th></th>
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
					<td>buttons here</td>
				</tr>
			))}
		</tbody>
	</Table>
);

export default DataUseTable;
