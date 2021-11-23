import React from 'react';
import { useFormikContext } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SearchInput from '../SearchInput';
import SortDropdown from '../SortDropdown';

const SearchBarSimpleForm = ({ onChangeInput, onResetInput, onChangeSort, sortProps, isLoading, type }) => {
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

	if (isLoading) return null;

	return (
		<Row>
			<Col sm={1} />
			<Col sm={10}>
				<Row>
					<Col lg={8}>
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
			</Col>
			<Col sm={1} />
		</Row>
	);
};

export default SearchBarSimpleForm;
