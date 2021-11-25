import React from 'react';
import { useFormikContext } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SearchInput from '../SearchInput';
import SortDropdown from '../../pages/commonComponents/SortDropdown';
import useCommonStyles from '../../hooks/useCommonStyles';

const SearchControlsForm = ({ onChangeInput, onResetInput, onChangeSort, sortProps, isLoading, type, mt, mb, mr, width }) => {
	const { t } = useTranslation();
	const commonStyles = useCommonStyles({ mt, mb, mr, mb, width });

	const {
		submitForm,
		values: { search, sortBy },
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
		if (onResetInput)
			onResetInput({
				...values,
				search: '',
			});
	}, [values]);

	const handleChange = React.useCallback(({ target: { name, value } }) => {
		setFieldValue(name, value);
		if (onChangeInput) onChangeInput(value);
	}, []);

	const handleOnSort = React.useCallback(value => {
		setFieldValue('sortBy', value);

		if (onChangeSort) onChangeSort(value);

		submitForm();
	}, []);

	React.useEffect(() => {
		if (onChangeInput) onChangeInput(search);
	}, [search]);

	if (isLoading) return null;

	return (
		<Row className={commonStyles}>
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
			{sortProps && (
				<Col lg={4} className='d-flex justify-content-end'>
					<SortDropdown {...sortProps} onSort={handleOnSort} value={sortBy} ml={2} />
				</Col>
			)}
		</Row>
	);
};

export default SearchControlsForm;
