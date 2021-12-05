import React from 'react';
import { Formik } from 'formik';
import SearchControlsForm from './SearchControlsForm';

const SearchControls = ({ onSubmit, isLoading, sortProps, inputProps, formRef, enableReinitialize, ...outerProps }) => {
	if (isLoading) return null;

	return (
		<Formik
			initialValues={{
				search: inputProps && !!inputProps.value ? inputProps.value : '',
				sortBy: sortProps && !!sortProps.value ? sortProps.value : '',
				sortDirection: sortProps && !!sortProps.direction ? sortProps.direction : '',
			}}
			onSubmit={onSubmit}
			innerRef={formRef}
			enableReinitialize={enableReinitialize}>
			<SearchControlsForm sortProps={sortProps} inputProps={inputProps} {...outerProps} />
		</Formik>
	);
};

SearchControls.defaultProps = {
	enableReinitialize: false,
};

export default SearchControls;
