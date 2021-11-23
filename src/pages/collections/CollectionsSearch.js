import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SearchInput from '../commonComponents/SearchInput';
import SortDropdown from '../commonComponents/SortDropdown';
import '../commonComponents/searchBar/SearchBar.scss';

const CollectionsSearch = props => {
	const { t } = useTranslation();
	const [searchValue, setSearchValue] = useState('');

	let col1Size = 7;
	let col2Size = 3;

	const handleSearch = e => {
		setSearchValue(e.target.value);

		if (props.doUpdateCollectionsSearchString) {
			props.doUpdateCollectionsSearchString(e.target.value);
		}
	};

	if (props.isLoading) {
		return '';
	}

	if (!props.isLoading) {
		return (
			<Row>
				<Col sm={1} lg={1} />
				<Col lg={col1Size}>
					<SearchInput
						placeholder={t('search.placeholder', { type: 'collection' })}
						onChange={handleSearch}
						onReset={() => handleSearch('')}
						value={searchValue}
						onKeyDown={props.doCollectionsSearchMethod}
						variant='primary'
					/>
				</Col>

				<Col lg={col2Size} className='text-right'>
					<SortDropdown
						onSort={props.handleSort}
						isCollectionsSearch={props.isCollectionsSearch}
						value={props.sort}
						options={props.dropdownItems}
					/>
				</Col>
				<Col sm={1} lg={1} />
			</Row>
		);
	}
};

export default CollectionsSearch;
