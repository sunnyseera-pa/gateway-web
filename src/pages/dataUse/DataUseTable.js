import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Table, Dropdown } from 'react-bootstrap';
import { isUndefined } from 'lodash';

const DataUseTable = ({ team, data, active, pending, archived, showArchiveModal, showUnarchiveModal }) => {
	const renderDatasets = dataUse => {
		const datasets = dataUse.datasetTitles.map((datasetTitle, index) => {
			const datasetId = dataUse.datasetIds[index];
			if (isUndefined(datasetId)) {
				return <div className='data-use-namedDataset'>{datasetTitle}</div>;
			} else {
				return (
					<div>
						<Link className='data-use-link' to={'/dataset/' + datasetId} target='_blank'>
							{datasetTitle}
						</Link>
					</div>
				);
			}
		});

		return datasets;
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
						<td>{moment(dataUse.lastActivity).format('DD/MM/YYYY')}</td>
						<td>
							<Link className='data-use-link' to={'/datause/' + dataUse.id} target='_blank'>
								{dataUse.projectTitle}
							</Link>
							<p>{dataUse.organisationName}</p>
						</td>
						<td>
							<p>{renderDatasets(dataUse)}</p>
						</td>
						{(active || pending || archived) && (
							<td>
								{active && (
									<Dropdown>
										<Dropdown.Toggle variant='outline-secondary' className='data-use-action'>
											Actions
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item href='#/action-1'>Edit</Dropdown.Item>
											{team !== 'user' && <Dropdown.Item onClick={() => showArchiveModal(dataUse._id)}>Archive</Dropdown.Item>}
										</Dropdown.Menu>
									</Dropdown>
								)}
								{pending && team === 'admin' && (
									<Dropdown>
										<Dropdown.Toggle variant='outline-secondary' className='data-use-action'>
											Actions
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item href='#/action-1'>Approve</Dropdown.Item>
											<Dropdown.Item href='#/action-2'>Reject</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								)}
								{archived && (
									<Dropdown>
										<Dropdown.Toggle variant='outline-secondary' className='data-use-action'>
											Actions
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item onClick={() => showUnarchiveModal(dataUse._id)}>Unarchive</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								)}
							</td>
						)}
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default DataUseTable;
