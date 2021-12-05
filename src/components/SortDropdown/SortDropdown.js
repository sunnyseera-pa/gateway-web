import React from 'react';
import { cx } from '@emotion/css';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import useCommonStyles from '../../hooks/useCommonStyles';
import { PROP_TYPES_DROPDOWN } from '../Dropdown/Dropdown.propTypes';
import { useTranslation } from 'react-i18next';

const SortDropdown = ({ onSort, className, options, mt, mb, ml, mr, width, value, direction, ...outerProps }) => {
	const { t } = useTranslation();
	const [state, setState] = React.useState({ value, direction });
	const commonStyles = useCommonStyles({ mt, mb, ml, mr, width });

	const handleSort = React.useCallback(
		value => {
			const newState = {
				...state,
				value,
			};

			setState(newState);
			onSort(newState);
		},
		[state]
	);

	const handleOrder = React.useCallback(() => {
		const direction = state.direction === 'asc' ? 'desc' : 'asc';
		const newState = {
			...state,
			direction,
		};

		setState(newState);
		onSort(newState);
	}, [state]);

	return (
		<div style={{ display: 'flex', alignItems: 'center' }} className={cx('ui-SortDropdown', className, commonStyles)}>
			<Dropdown
				onSelect={handleSort}
				options={options.map(value => ({
					label: t(`sortby.options.${value}`),
					value,
				}))}
				value={state.value}
				{...outerProps}
			/>
			<Icon name='arrow-down' role='button' onClick={handleOrder} ml={2} />
		</div>
	);
};

SortDropdown.propTypes = {
	...PROP_TYPES_DROPDOWN,
	onSort: PropTypes.func.isRequired,
	allowDirection: PropTypes.bool,
};

SortDropdown.defaultProps = {
	allowDirection: false,
	direction: 'asc',
};

export default SortDropdown;
