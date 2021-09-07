import React from 'react';
import { Table, Dropdown } from 'react-bootstrap';

const DataUseTable = ({ data, active, pending, archived, userState }) => (
	<Table className='data-use-table black-14'>
		<tr>
			<th>Last activity</th>
			<th>Project Title</th>
			<th>Dataset(s)</th>
			{(active || pending || archived) && <th></th>}
		</tr>
		<tbody>
			{data.map(a => (
				<tr>
					<td>{a.lastActivity}</td>
					<td>
						<p>{a.projectTitle}</p>
						<p>{a.institution}</p>
					</td>
					<td>{a.datasets}</td>
					{(active || pending || archived) && (
						<td>
							<Dropdown>
								<Dropdown.Toggle variant='outline-secondary' id='dropdown-basic'>
									Actions
								</Dropdown.Toggle>
								{active && (
									<Dropdown.Menu>
										<Dropdown.Item href='#/action-1'>Edit</Dropdown.Item>
										<Dropdown.Item href='#/action-2'>Archive</Dropdown.Item>
									</Dropdown.Menu>
								)}
								{pending && (
									<Dropdown.Menu>
										<Dropdown.Item href='#/action-1'>Approve</Dropdown.Item>
										<Dropdown.Item href='#/action-2'>Reject</Dropdown.Item>
									</Dropdown.Menu>
								)}
								{archived &&
									role ===
										'Custodian'(
											<Dropdown.Menu>
												<Dropdown.Item href='#/action-1'>Unarchive</Dropdown.Item>
											</Dropdown.Menu>
										)}
							</Dropdown>
						</td>
					)}
				</tr>
			))}
		</tbody>
	</Table>
);

export default DataUseTable;
