/** @jsx jsx */
import React from 'react';
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { AsyncTypeahead as BootstrapTypeaheadAsync, Typeahead as BootstrapTypeahead } from 'react-bootstrap-typeahead';
import { pick } from '../../configs/propTypes';
import Input from '../Input';
import { PROP_TYPES_INPUT } from '../Input/Input.propTypes';
import { PROP_TYPES_LAYOUTBOX } from '../LayoutBox/LayoutBox.propTypes';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const Typeahead = ({
    className,
    selected,
    variant,
    textPrepend,
    iconPrepend,
    textAppend,
    iconAppend,
    mt,
    mr,
    mb,
    ml,
    minWidth,
    maxWidth,
    width,
    async,
    isLoading,
    disabled,
    label,
    ...outerProps
}) => {
    const iconsAppend =
        isLoading || iconAppend ? (
            <>
                {isLoading && <div className='rbt-loader' />}
                {iconAppend}
            </>
        ) : null;

    return (
        <Input
            className={cx(className, 'ui-Typeahead')}
            variant={variant}
            textPrepend={textPrepend}
            iconPrepend={iconPrepend}
            textAppend={textAppend}
            iconAppend={iconsAppend}
            mt={mt}
            mb={mb}
            mr={mr}
            ml={ml}
            width={width}
            maxWidth={maxWidth}
            minWidth={minWidth}
            disabled={disabled}
            label={label}>
            {!async && <BootstrapTypeahead {...outerProps} selected={selected} disabled={disabled} />}
            {async && <BootstrapTypeaheadAsync {...outerProps} selected={selected} disabled={disabled} />}
        </Input>
    );
};

Typeahead.propTypes = {
    ...pick(PROP_TYPES_INPUT, ['className', 'selected', 'variant', 'textPrepend', 'iconPrepend', 'textAppend', 'iconAppend']),
    selected: PropTypes.array,
    async: PropTypes.bool,
    ...PROP_TYPES_LAYOUTBOX,
};

Typeahead.defaultProps = {
    selected: [],
    variant: 'primary',
    async: false,
};

export default Typeahead;
