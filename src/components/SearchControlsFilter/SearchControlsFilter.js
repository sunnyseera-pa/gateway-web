import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import LayoutBox from '../LayoutBox';
import { PROP_TYPES_LAYOUTBOX } from '../LayoutBox/LayoutBox.propTypes';
import SearchControlsFilterForm from './SearchControlsFilterForm';

const SearchControlsFilter = ({
    onSubmit,
    isLoading,
    dropdownProps,
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
                    filterValue: dropdownProps && !!dropdownProps.value ? dropdownProps.value : '',
                }}
                onSubmit={onSubmit}
                innerRef={formRef}
                enableReinitialize={enableReinitialize}>
                <SearchControlsFilterForm dropdownProps={dropdownProps} inputProps={inputProps} {...outerProps} />
            </Formik>
        </LayoutBox>
    );
};

SearchControlsFilter.propTypes = {
    onSubmit: PropTypes.func,
    ...PROP_TYPES_LAYOUTBOX,
};

SearchControlsFilter.defaultProps = {
    enableReinitialize: true,
};

export default SearchControlsFilter;
