/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import { addCommonPropTypes } from '../../configs/propTypes';
import Icon from '../Icon';
import LayoutBox from '../LayoutBox';
import * as styles from './Dropdown.styles';

const Dropdown = ({
	defaultValue,
	value,
	options,
	variant,
	iconSelected,
	className,
	mt,
	mb,
	ml,
	mr,
	width,
	minWidth,
	maxWidth,
	size,
	...outerProps
}) => {
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
		<LayoutBox {...{ mt, mb, ml, mr, width, minWidth, maxWidth }}>
			<BootstrapDropdown className={cx('ui-Dropdown', className)} {...outerProps} css={styles.root({ variant, size })}>
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
		</LayoutBox>
	);
};

Dropdown.propTypes = addCommonPropTypes({
	variant: PropTypes.oneOf(['primary', 'secondary']),
});

Dropdown.defaultProps = {
	variant: 'primary',
	options: [],
	iconSelected: <Icon name='check' fill='green600' color='green600' ml={1} size='xl' />,
	size: 'default',
};

export default Dropdown;
