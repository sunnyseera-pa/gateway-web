import React from 'react';
import { Formik } from 'formik';
import LayoutBox from '../LayoutBox';
import { addCommonPropTypes } from '../../configs/propTypes';
import SearchControlsForm from './SearchControlsForm';

const SearchControls = ({
	onSubmit,
	isLoading,
	sortProps,
	inputProps,
	formRef,
	enableReinitialize,
	mt,
	mb,
	ml,
	mr,
	width,
	minWidth,
	maxWidth,
	...outerProps
}) => {
	if (isLoading) return null;

	return (
		<LayoutBox {...{ mt, mb, ml, mr, width, minWidth, maxWidth }}>
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
		</LayoutBox>
	);
};

SearchControls.propTypes = addCommonPropTypes({});

SearchControls.defaultProps = {
	enableReinitialize: true,
};

export default SearchControls;
