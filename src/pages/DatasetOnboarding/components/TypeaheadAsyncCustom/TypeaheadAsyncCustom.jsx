/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import serviceLocations from '../../../../services/locations/locations';
import DatasetOnboardingHelperUtil from '../../../../utils/DatasetOnboardingHelper.util';
import Icon from '../../../../components/Icon';
import * as styles from './TypeaheadAsyncCustom.styles';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function TypeaheadAsyncCustom(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState([]);
	const [selected, setSelected] = useState([]);
	const [showIcon, setShowIcon] = useState(true);

	useEffect(() => {
		if (props.value.length) {
			setSelected(getFormattedValues(props.value));
			setShowIcon(false);
		} else {
			setShowIcon(true);
		}
	}, [props.value]);

	const getFormattedValues = values => DatasetOnboardingHelperUtil.getLocationsObj(values);

	const handleSearch = async query => {
		setIsLoading(true);
		const locations = await serviceLocations.getLocations(query, { withCredentials: false });
		const { data } = locations.data;
		if (data) {
			const options = data.map(i => ({
				location: i.location,
				hierarchy: i.hierarchy,
			}));
			setOptions(options);
		}
		setIsLoading(false);
	};

	const handleChange = options => {
		if (options) {
			const value = options.map(i => i.hierarchy);
			setSelected(getFormattedValues(value));
			props.onChange(value);
		}
	};

	const handleInputChange = value => {
		value ? setShowIcon(false) : setShowIcon(true);
	};
	const filterBy = () => true;

	return (
		<AsyncTypeahead
			css={styles.root(showIcon)}
			filterBy={filterBy}
			className={'addFormInputTypeAhead'}
			data-testid='async-location'
			id='async-location'
			isLoading={isLoading}
			labelKey='location'
			minLength={3}
			onSearch={handleSearch}
			options={options}
			multiple
			onChange={handleChange}
			onInputChange={handleInputChange}
			selected={selected}
			renderMenuItemChildren={(option, props) => (
				<div>
					<span className='location'>{option.location}</span>
					<span className='hierarchy'>{option.hierarchy}</span>
				</div>
			)}>
			{({ selected }) => (
				<div className='icons'>
					{showIcon && !selected.length && (
						<span data-testid='searchicon'>
							<Icon name='search' size='xl' mt={2} fill='purple' />
						</span>
					)}
				</div>
			)}
		</AsyncTypeahead>
	);
}

TypeaheadAsyncCustom.defaultProps = {
	id: '',
	value: [],
};

export default TypeaheadAsyncCustom;
