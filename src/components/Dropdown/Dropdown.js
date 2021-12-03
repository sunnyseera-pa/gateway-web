/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useMemo } from 'react';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as styles from './Dropdown.styles';
import Icon from '../Icon';
import { addCommonPropTypes } from '../../configs/propTypes';
import { cx } from '@emotion/css';
import useCommonStyles from '../../hooks/useCommonStyles';

const Dropdown = ({ defaultValue, value, options, variant, iconSelected, className, mt, mb, ml, mr, width, ...outerProps }) => {
	const commonStyles = useCommonStyles({ mt, mb, ml, mr, width });
	const currentValue = !value ? defaultValue : value;

	const parseOption = option => {
		return typeof option === 'string'
			? {
					value: option,
					label: option,
			  }
			: option;
	};

	const selectedOption = useMemo(
		() =>
			parseOption(
				options.find(option => {
					return parseOption(option).value === currentValue;
				})
			),
		[currentValue]
	);

	return (
		<BootstrapDropdown className={cx('ui-Dropdown', className, commonStyles)} {...outerProps} css={styles.root({ variant })}>
			<BootstrapDropdown.Toggle variant={variant}>{selectedOption && selectedOption.label}</BootstrapDropdown.Toggle>
			<BootstrapDropdown.Menu>
				{options.map(option => {
					const { value: eventKey, label } = parseOption(option);

					return (
						<BootstrapDropdown.Item eventKey={eventKey} key={eventKey} className='d-flex'>
							<div className='flex-grow'>{label}</div>
							{eventKey === currentValue && iconSelected}
						</BootstrapDropdown.Item>
					);
				})}
			</BootstrapDropdown.Menu>
		</BootstrapDropdown>
	);
};

Dropdown.propTypes = addCommonPropTypes({
	variant: PropTypes.oneOf(['primary', 'secondary']),
});

Dropdown.defaultProps = {
	variant: 'primary',
	options: [],
	iconSelected: <Icon name='check' fill='green600' color='green600' ml={1} size='xl' />,
};

export default Dropdown;
