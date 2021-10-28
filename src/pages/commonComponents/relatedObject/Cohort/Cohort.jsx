/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SVGIcon from '../../../../images/SVGIcon';
import RemoveButton from '../RemoveButton/RemoveButton';
import Title from '../Title/Title';
import Tag from '../Tag/Tag';
import { cohort } from './constants';
import '../../CommonComponents.scss';
import _ from 'lodash';

const Cohort = ({ data, activeLink, onSearchPage, showRelationshipQuestion, updateOnFilterBadge, removeButton }) => {
	return (
		<Row data-test-id='related-cohort-object' className='noMargin'>
			<Col sm={10} lg={10} className='pad-left-24'>
				<Title activeLink={activeLink} name={data.name} id={data.id} type='cohort' />
				<br />
				{!data.persons || data.persons <= 0 ? (
					<span className='gray800-14'>Author not listed</span>
				) : (
					data.persons.map((person, index) => {
						let name = `${person.firstname} ${person.lastname}${data.persons.length === index + 1 ? '' : ', '}`;
						return (
							<Title className='gray800-14' activeLink={activeLink} name={name} id={person.id} type='person' key={`person-${index}`} />
						);
					})
				)}
			</Col>
			<Col sm={2} lg={2} className='pad-right-24'>
				{showRelationshipQuestion && <RemoveButton removeButtonHandler={removeButton} />}
			</Col>
			<Col sm={12} lg={12} className='pad-left-24 pad-right-24 pad-top-16'>
				<Tag tagName={cohort.TAB} tagType={data.type} updateOnFilterBadgeHandler={updateOnFilterBadge}>
					<SVGIcon name='cohort' fill={'#3c3c3b'} className='badgeSvg mr-2' />
				</Tag>
				{!_.isEmpty(data.filterCriteria) &&
					[...new Set(data.filterCriteria)].map(criteria => {
						return (
							<Tag
								tagName={criteria}
								activeLink={activeLink}
								onSearchPage={onSearchPage}
								updateOnFilterBadgeHandler={updateOnFilterBadge}
								{...cohort.FC}
							/>
						);
					})}
			</Col>
			<div class='pad-left-24 pad-right-24 pad-top-24 pad-bottom-16 col-lg-12 col-sm-12'>
				{data.totalResultCount && data.numberOfDatasets ? (
					<span className='gray800-14'>
						{data.totalResultCount} entries across {data.numberOfDatasets} datasets
					</span>
				) : (
					''
				)}
			</div>
		</Row>
	);
};

Cohort.propTypes = {
	data: PropTypes.object.isRequired,
	activeLink: PropTypes.bool.isRequired,
	showRelationshipQuestion: PropTypes.bool.isRequired,
	onSearchPage: PropTypes.bool.isRequired,
	updateOnFilterBadge: PropTypes.func.isRequired,
	removeButton: PropTypes.func.isRequired,
};

export default Cohort;
