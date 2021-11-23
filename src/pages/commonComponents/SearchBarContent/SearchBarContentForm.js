import React from 'react';
import { useFormikContext } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SearchInput from '../SearchInput';
import SortDropdown from '../SortDropdown';

const SearchBarContentForm = ({ onChangeInput, onResetInput, onChangeSort, sortProps, isLoading, type }) => {
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
		if (onResetInput) onResetInput(values);
	}, [values]);

	const handleChange = React.useCallback(({ target: { name, value } }) => {
		setFieldValue(name, value);
		if (onChangeInput) onChangeInput(value);
	}, []);

	const handleOnSort = React.useCallback(value => {
		setFieldValue('sort', value);
		if (onChangeSort) onChangeSort(value);
	}, []);

	React.useEffect(() => {
		if (onChangeInput) onChangeInput(search);
	}, [search]);

	if (isLoading) return null;

	return (
		<Row>
			<Col lg={8} className='mb-2 mb-lg-0'>
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
			<Col lg={4} className='d-flex justify-content-end'>
				<SortDropdown {...sortProps} handleSort={handleOnSort} value={sort} />
			</Col>
		</Row>
	);
};

export default SearchBarContentForm;
