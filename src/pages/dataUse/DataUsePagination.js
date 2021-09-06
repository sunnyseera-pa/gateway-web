import React from 'react';
import { Pagination } from 'react-bootstrap';

const DataUsePagination = ({ rowsPerPage, totalRows, paginate }) => {
	const pageNumbers = [];
	for (let i = 1; i < Math.ceil(totalRows / rowsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav>
			<ul className='pagination'>
				{pageNumbers.map(number => (
					<li key={number} className='page-item'>
						<Pagination>
							<Pagination.Item onClick={() => paginate(number)}>{number}</Pagination.Item>
						</Pagination>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default DataUsePagination;
