/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useMemo } from 'react';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import * as styles from './Dropdown.styles';
import Icon from '../../storybookComponents/Icon';
import { addCommonPropTypes } from '../../../configs/propTypes';
import { cx } from '@emotion/css';
import { ReactComponent as VersionAccepted } from '../../../images/check.svg';

const Dropdown = ({ defaultValue, value, options, variant, iconSelected, className, ...outerProps }) => {
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
		<BootstrapDropdown className={cx('ui-Dropdown', className)} {...outerProps} css={styles.root({ variant })}>
			<BootstrapDropdown.Toggle variant={variant}>{selectedOption && selectedOption.value}</BootstrapDropdown.Toggle>
			<BootstrapDropdown.Menu>
				{options.map(option => {
					const { value: eventKey, label } = parseOption(option);

					console.log('XYZ', eventKey === currentValue);

					return (
						<BootstrapDropdown.Item eventKey={eventKey} className='d-flex'>
							<div className='flex-grow'>{label}</div>
							{eventKey === currentValue && iconSelected}
						</BootstrapDropdown.Item>
					);
				})}
			</BootstrapDropdown.Menu>
		</BootstrapDropdown>
	);
};

Dropdown.propTypes = addCommonPropTypes({});

Dropdown.defaultProps = {
	variant: 'primary',
	options: [],
	iconSelected: <Icon name='check' fill='green600' color='green600' ml={1} size='xl' />,
};

export default Dropdown;
