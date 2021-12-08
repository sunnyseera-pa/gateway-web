import React from 'react';
import { cx } from '@emotion/css';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import useCommonStyles from '../../hooks/useCommonStyles';
import { PROP_TYPES_DROPDOWN } from '../Dropdown/Dropdown.propTypes';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const SortDropdown = ({ onSort, className, options, mt, mb, ml, mr, width, value, direction, allowDirection, ...outerProps }) => {
	const { t } = useTranslation();
	const [state, setState] = React.useState({});
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

	React.useEffect(() => {
		setState({
			value,
			direction,
		});
	}, [value, direction]);

	return (
		<div className={cx('ui-SortDropdown', className, commonStyles, 'd-flex align-items-center')}>
			<Dropdown
				onSelect={handleSort}
				options={options.map(value => ({
					label: t(`sortby.options.${value}`),
					value,
				}))}
				value={state.value}
				{...outerProps}
			/>
			{allowDirection && (
				<Button onClick={handleOrder} ml={2} variant='link'>
					{state.direction === 'desc' && <Icon name='sort-desc' size='lg' />}
					{state.direction === 'asc' && <Icon name='sort-asc' size='lg' />}
				</Button>
			)}
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
