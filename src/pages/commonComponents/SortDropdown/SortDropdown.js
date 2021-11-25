import React, { Suspense } from 'react';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';

const SortDropdown = ({ handleSelect, defaultValue, value, type, options, iconSelected }) => {
	const { t } = useTranslation();
	const currentValue = !value ? defaultValue : value;
    console.log(!value);

	return (
        <Suspense fallback={"Loading..."}>
            <p>Test content</p>
            <BootstrapDropdown className='ui-Dropdown' alignRight onSelect={handleSelect}>
                <BootstrapDropdown.Toggle variant='info'>
                    {t(`${type}.label.${currentValue}`)}
                </BootstrapDropdown.Toggle>
                <BootstrapDropdown.Menu>
                    {options.map(item => {
                        return (
                            <BootstrapDropdown.Item eventKey={item} className='gray800-14'>
                                {t(`${type}.option.${item}`)}
                                {item === currentValue && iconSelected}
                            </BootstrapDropdown.Item>
                        );
                    })}
                </BootstrapDropdown.Menu>
            </BootstrapDropdown>
        </Suspense>
	);
};

SortDropdown.defaultProps = {
	options: [],
	defaultValue: 'relevance',
    type: 'sort',
	iconSelected: <Icon name='check' color='green600' ml={1} />,
};

export default SortDropdown;