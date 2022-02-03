import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import serviceContributors from '../../../../services/contributors/contributors';
import Typeahead from '../../../../components/Typeahead/Typeahead';
import './DropdownCustom.scss';

const DropdownCustom = props => {
	const [contributorsInfo, setcontributorsInfo] = useState([]);
	const [selected, setSelected] = useState([]);
	useEffect(() => {
		setSelected([props.value]);
		getContributorsInfo();
	}, [props.applicationId]);

	const getContributorsInfo = async () => {
		const res = await serviceContributors.getContributorsInfo(props.applicationId);
		setcontributorsInfo(res.data.data);
	};

	const handleChange = value => {
		const name = `${value[0].firstname} ${value[0].lastname}`;
		setSelected([name]);
		props.onChange(value[0]);
	};

	const filterBy = () => true;

	return (
		<Typeahead
			data-testid='prepopulate'
			id='prepopulate'
			filterBy={filterBy}
			labelKey='firstname'
			onChange={handleChange}
			options={contributorsInfo}
			selected={selected}
			renderMenuItemChildren={(contributor, props, index) => (
				<div>
					<div className='margin-top-8 cursorPointer' data-testid={`darContributorDropdownItem${index}`}>
						<span className='gray800-14' data-testid={`darContributorDropdownName-${index}`}>
							{contributor.firstname} {contributor.lastname}
						</span>
						<br />
						<span className='gray-600-14' data-testid={`darContributorDropdownEmail-${index}`}>
							{_.has(contributor, 'user.email') ? contributor.user.email : 'Email address cannot be shared'}
						</span>
						<span className='gray-600-14 floatRight' data-testid={`darContributorDropdownOrganisation-${index}`}>
							{!_.has(contributor, 'user.email') && contributor.showOrganisation === false
								? 'Organisation is hidden'
								: contributor.organisation}
						</span>
					</div>
				</div>
			)}
		/>
	);
};

DropdownCustom.defaultProps = {
	value: '',
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

export default DropdownCustom;
