import React from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import '../../Dashboard.scss';

const AccountDatasetsTabs = ({ counts = { inReview: 0, active: 0, rejected: 0, archive: 0 }, team, onSelectTab, activeKey }) => {
	return (
		<div className='tabsBackground mb-0'>
			<Row>
				<Col sm={12} lg={12}>
					{team === 'admin' ? (
						<Tabs className='dataAccessTabs gray700-13' activeKey={activeKey} onSelect={onSelectTab}>
							<Tab eventKey='inReview' title={'Pending approval (' + counts.inReview + ')'}>
								{' '}
							</Tab>
						</Tabs>
					) : (
						<Tabs className='dataAccessTabs gray700-13' activeKey={activeKey} onSelect={onSelectTab}>
							<Tab eventKey='active' title={'Active (' + counts.active + ')'}>
								{' '}
							</Tab>
							<Tab eventKey='inReview' title={'Pending approval (' + counts.inReview + ')'}>
								{' '}
							</Tab>
							<Tab eventKey='rejected' title={'Rejected (' + counts.rejected + ')'}>
								{' '}
							</Tab>
							<Tab eventKey='archive' title={'Archived (' + counts.archive + ')'}>
								{' '}
							</Tab>
						</Tabs>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default AccountDatasetsTabs;
