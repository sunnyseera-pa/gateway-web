import React from 'react';
import { Formik } from 'formik';
import SearchBarContentForm from './SearchBarContentForm';

const SearchBarContent = ({ onSubmit, isLoading, sortProps, ...outerProps }) => {
	if (isLoading) return null;

	return (
		<Formik initialValues={{ search: '', sortBy: sortProps.value }} onSubmit={onSubmit}>
			<SearchBarContentForm sortProps={sortProps} {...outerProps} />
		</Formik>
	);
};

export default SearchBarContent;
