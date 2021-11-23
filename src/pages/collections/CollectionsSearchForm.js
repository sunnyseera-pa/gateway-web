import React from 'react';
import { useFormikContext } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import '../commonComponents/searchBar/SearchBar.scss';
import SearchInput from '../commonComponents/SearchInput';
import SortDropdown from '../commonComponents/SortDropdown';

const CollectionsSearchForm = ({ onChangeInput, onResetInput, onChangeSort, sortProps, isLoading, type }) => {
	const { t } = useTranslation();
	const {
		submitForm,
		values: { search, sort },
		values,
		setFieldValue,
	} = useFormikContext();

	const handleKeyDown = React.useCallback(e => {
		if (e.key === 'Enter') {
			submitForm();
		}
	}, []);

	const handleReset = React.useCallback(() => {
		setFieldValue('search', '');
		onResetInput(values);
	}, [values]);

	const handleChange = React.useCallback(({ target: { name, value } }) => {
		setFieldValue(name, value);
		onChangeInput(value);
	}, []);

	const handleOnSort = React.useCallback(value => {
		setFieldValue('sort', value);
		onChangeSort(value);
	}, []);

	React.useEffect(() => {
		onChangeInput(search);
	}, [search]);

	let col1Size = 7;
	let col2Size = 3;

	if (isLoading) return null;

	return (
		<Row>
			<Col sm={1} lg={1} />
			<Col lg={col1Size}>
				<SearchInput
					placeholder={t('search.placeholder', { type })}
					onChange={handleChange}
					onReset={handleReset}
					onSubmit={submitForm}
					onKeyDown={handleKeyDown}
					value={search}
					variant='primary'
				/>
			</Col>
			<Col lg={col2Size} className='text-right'>
				<SortDropdown {...sortProps} handleSort={handleOnSort} value={sort} />
			</Col>
			<Col sm={1} lg={1} />
		</Row>
	);
};

export default CollectionsSearchForm;
