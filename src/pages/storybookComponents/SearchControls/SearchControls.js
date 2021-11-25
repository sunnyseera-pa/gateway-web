import React from 'react';
import { Formik } from 'formik';
import SearchControlsForm from './SearchControlsForm';

const SearchControls = ({ onSubmit, isLoading, sortProps, ...outerProps }) => {
	if (isLoading) return null;

	return (
		<Formik initialValues={{ search: '', sortBy: sortProps ? sortProps.value : '' }} onSubmit={onSubmit}>
			<SearchControlsForm sortProps={sortProps} {...outerProps} />
		</Formik>
	);
};

export default SearchControls;
