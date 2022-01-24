import React from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import '../../Dashboard.scss';

const AccountDatasetsTabs = ({ counts = { inReview: 0, active: 0, rejected: 0, archive: 0 }, team, onSelectTab, activeKey }) => {
	const { t } = useTranslation();

	return (
		<div className='tabsBackground mb-0'>
			<Row>
				<Col sm={12} lg={12}>
					{team === 'admin' ? (
						<Tabs className='dataAccessTabs gray700-13' activeKey={activeKey} onSelect={onSelectTab}>
							<Tab
								eventKey='inReview'
								title={t('tabs.counts.inReview', {
									count: counts.inReview,
								})}>
								{' '}
							</Tab>
						</Tabs>
					) : (
						<Tabs className='dataAccessTabs gray700-13' activeKey={activeKey} onSelect={onSelectTab}>
							<Tab
								eventKey='active,draft'
								title={t('tabs.counts.active', {
									count: counts.active + counts.draft,
								})}>
								{' '}
							</Tab>
							<Tab
								eventKey='inReview'
								title={t('tabs.counts.inReview', {
									count: counts.inReview,
								})}>
								{' '}
							</Tab>
							<Tab
								eventKey='rejected'
								title={t('tabs.counts.rejected', {
									count: counts.rejected,
								})}>
								{' '}
							</Tab>
							<Tab
								eventKey='archive'
								title={t('tabs.counts.archive', {
									count: counts.archive,
								})}>
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
