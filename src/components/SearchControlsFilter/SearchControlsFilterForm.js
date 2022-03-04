import { useFormikContext } from 'formik';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useCommonStyles from '../../hooks/useCommonStyles';
import Dropdown from '../Dropdown';
import SearchInput from '../SearchInput';

const SearchControlsFilterForm = ({ dropdownProps, inputProps, type, mt, mb, mr, ml, width, minWidth, maxWidth }) => {
    const { t } = useTranslation();
    const commonStyles = useCommonStyles({ mt, mb, mr, ml, width, minWidth, maxWidth });

    const {
        submitForm,
        values: { search, filterValue },
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

        if (inputProps.onReset) inputProps.onReset();
    }, [values]);

    const handleChange = React.useCallback(({ target: { name, value } }) => {
        setFieldValue(name, value);

        const { onChange } = inputProps;

        if (onChange) onChange(value);
    }, []);

    const handleOnSelect = React.useCallback(
        value => {
            const { onSelect } = dropdownProps;

            setFieldValue('filterValue', value);

            if (onSelect) onSelect(value);

            submitForm();
        },
        [values]
    );

    return (
        <Row className={commonStyles}>
            <Col lg={6}>
                <SearchInput
                    placeholder={t('search.placeholder', { type: type.toLowerCase() })}
                    variant='primary'
                    value={search}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    onReset={handleReset}
                />
            </Col>
            <Col lg={2} />
            {dropdownProps && (
                <Col lg={4} className='d-flex justify-content-end'>
                    <Dropdown {...dropdownProps} onSelect={handleOnSelect} value={filterValue} />
                </Col>
            )}
        </Row>
    );
};

export default SearchControlsFilterForm;
