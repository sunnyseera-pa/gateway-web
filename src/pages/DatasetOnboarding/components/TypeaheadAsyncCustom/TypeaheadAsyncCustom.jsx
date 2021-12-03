/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import serviceLocations from '../../../../services/locations/locations';
import DatasetOnboardingHelperUtil from '../../../../utils/DatasetOnboardingHelper.util';
import * as styles from './TypeaheadAsyncCustom.styles';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function TypeaheadAsyncCustom(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState([]);
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		console.log(props.value);
		if (props.value) {
			setSelected(getFormattedValues(props.value));
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

	const filterBy = () => true;

	return (
		<AsyncTypeahead
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
			selected={selected}
			placeholder='Search for a location...'
			renderMenuItemChildren={(option, props) => (
				<>
					<div>
						<span css={styles.location}>{option.location}</span>
						<span css={styles.hierarchy}>{option.hierarchy}</span>
					</div>
				</>
			)}
		/>
	);
}

export default TypeaheadAsyncCustom;
