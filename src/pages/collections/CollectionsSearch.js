import React from 'react';
import { Formik } from 'formik';
import '../commonComponents/searchBar/SearchBar.scss';
import CollectionsSearchForm from './CollectionsSearchForm';

const CollectionsSearch = ({ onSubmit, isLoading, ...outerProps }) => {
	if (isLoading) return null;

	return (
		<Formik initialValues={{ search: '', sort: '' }} onSubmit={onSubmit}>
			<CollectionsSearchForm {...outerProps} />
		</Formik>
	);
};

export default CollectionsSearch;
