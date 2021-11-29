import React from 'react';
import { useFormikContext } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SearchInput from '../SearchInput';
import SortDropdown from '../SortDropdown';
import useCommonStyles from '../../hooks/useCommonStyles';

const SearchControlsForm = ({ sortProps, inputProps, type, mt, mb, mr, width }) => {
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

		const { onReset } = inputProps;

		if (onReset) {
			onReset({
				...values,
				search: '',
			});
		}
	}, [values]);

	const handleChange = React.useCallback(({ target: { name, value } }) => {
		setFieldValue(name, value);

		const { onChange } = inputProps;

		if (onChange) onChange(value);
	}, []);

	const handleOnSort = React.useCallback(value => {
		setFieldValue('sortBy', value);

		const { onSort } = sortProps;

		if (onSort) onSort(value);

		submitForm();
	}, []);

	return (
		<Row className={commonStyles}>
			<Col lg={6}>
				<SearchInput
					placeholder={t('search.placeholder', { type: type.toLowerCase() })}
					variant='primary'
					{...inputProps}
					value={search}
					onKeyDown={handleKeyDown}
					onChange={handleChange}
					onReset={handleReset}
				/>
			</Col>
			<Col lg={2} />
			{sortProps && (
				<Col lg={4} className='d-flex justify-content-end'>
					<SortDropdown {...sortProps} onSort={handleOnSort} value={sortBy} />
				</Col>
			)}
		</Row>
	);
};

export default SearchControlsForm;
