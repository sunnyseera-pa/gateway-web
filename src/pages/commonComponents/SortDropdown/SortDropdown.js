import React from 'react';
import { cx } from '@emotion/css';
import Dropdown from '../../../components/Dropdown';
import PropTypes from 'prop-types';
import { PROP_TYPES_DROPDOWN } from '../../../components/Dropdown/Dropdown.propTypes';
import { useTranslation } from 'react-i18next';

const SortDropdown = ({ onSort, className, options, ...outerProps }) => {
	const { t } = useTranslation();
	const [selectedOption, setSelectedOption] = React.useState();

	const handleSelect = React.useCallback(value => {
		setSelectedOption(value);

		onSort(value);
	}, []);

	return (
		<Dropdown
			className={cx('ui-SortDropdown', className)}
			onSelect={handleSelect}
			options={options.map(value => ({
				label: t(`sortby.options.${value}`),
				value: value,
			}))}
			value={selectedOption}
			{...outerProps}
		/>
	);
};

SortDropdown.propTypes = {
	...PROP_TYPES_DROPDOWN,
	onSort: PropTypes.func.isRequired,
};

export default SortDropdown;
