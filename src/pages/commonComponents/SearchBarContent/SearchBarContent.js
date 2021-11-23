import React from 'react';
import { Formik } from 'formik';
import SearchBarContentForm from './SearchBarContentForm';

const SearchBarContent = ({ onSubmit, isLoading, ...outerProps }) => {
	if (isLoading) return null;

	return (
		<Formik initialValues={{ search: '', sort: '' }} onSubmit={onSubmit}>
			<SearchBarContentForm {...outerProps} />
		</Formik>
	);
};

export default SearchBarContent;
