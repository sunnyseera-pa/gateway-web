import React from 'react';
import { Table, Dropdown } from 'react-bootstrap';

const DataUseTable = ({ data, active, pending, archived, showModal, showUnarchiveModal }) => {
	const Modal = () => {
		showModal(true);
	};

	const UnArchiveModal = () => {
		showUnarchiveModal(true);
	};

	return (
		<Table className='data-use-table black-14'>
			<tr>
				<th>Last activity</th>
				<th>Project Title</th>
				<th>Dataset(s)</th>
				{(active || pending || archived) && <th></th>}
			</tr>
			<tbody>
				{data.map(dataUse => (
					<tr>
						<td>{dataUse.lastActivity}</td>
						<td>
							<p>{dataUse.projectTitle}</p>
							<p>{dataUse.institution}</p>
						</td>
						<td>{dataUse.datasets}</td>
						{(active || pending || archived) && (
							<td>
								<Dropdown>
									<Dropdown.Toggle variant='outline-secondary' id='dropdown-basic'>
										Actions
									</Dropdown.Toggle>
									{active && (
										<Dropdown.Menu>
											<Dropdown.Item href='#/action-1'>Edit</Dropdown.Item>
											<Dropdown.Item onClick={Modal}>Archive</Dropdown.Item>
										</Dropdown.Menu>
									)}
									{pending && (
										<Dropdown.Menu>
											<Dropdown.Item href='#/action-1'>Approve</Dropdown.Item>
											<Dropdown.Item href='#/action-2'>Reject</Dropdown.Item>
										</Dropdown.Menu>
									)}
									{archived && (
										<Dropdown.Menu>
											<Dropdown.Item onClick={UnArchiveModal}>Unarchive</Dropdown.Item>
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
};

export default DataUseTable;
