import React from 'react';
import { Formik } from 'formik';
import SearchBarSimpleForm from './SearchBarSimpleForm';

const SearchBarSimple = ({ onSubmit, isLoading, ...outerProps }) => {
	if (isLoading) return null;

	return (
		<Formik initialValues={{ search: '', sort: '' }} onSubmit={onSubmit}>
			<SearchBarSimpleForm {...outerProps} />
		</Formik>
	);
};

export default SearchBarSimple;
