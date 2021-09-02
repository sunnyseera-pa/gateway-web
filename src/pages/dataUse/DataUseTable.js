import React from 'react';
import { Table } from 'react-bootstrap';

const DataUseTable = ({ data }) => {
	console.log(data);
	//add a filter for the status and then pass that to the parent for tabs?
	return (
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
						<td>{a.projectTitle}</td>
						<td>{a.institution}</td>
						<td>{a.datasets}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default DataUseTable;
