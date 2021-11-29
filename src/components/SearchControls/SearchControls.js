import React from 'react';
import { Formik } from 'formik';
import SearchControlsForm from './SearchControlsForm';

const SearchControls = ({ onSubmit, isLoading, sortProps, inputProps, ...outerProps }) => {
	if (isLoading) return null;

	return (
		<Formik initialValues={{ search: inputProps ? inputProps.value : '', sortBy: sortProps ? sortProps.value : '' }} onSubmit={onSubmit}>
			<SearchControlsForm sortProps={sortProps} inputProps={inputProps} {...outerProps} />
		</Formik>
	);
};

export default SearchControls;
