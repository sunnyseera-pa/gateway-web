import React, { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import reduce from 'lodash/reduce';
import { LayoutContent } from '../../../../components/Layout';
import useSearch from '../../../../components/Search/useSearch';
import { useAuth } from '../../../../context/AuthContext';
import serviceDatasetOnboarding from '../../../../services/dataset-onboarding/dataset-onboarding';
import utils from '../../../../utils/DataSetHelper.util';
import googleAnalytics from '../../../../tracking';
import '../../Dashboard.scss';
import AccountDatasetsContent from './AccountDatasetsContent';
import AccountDatasetsCreate from './AccountDatasetsCreate';
import AccountDatasetsTabs from './AccountDatasetsTabs';
import { MAXRESULTS } from '../../../collections/constants';

const AccountDatasets = props => {
	const [key, setKey] = useState(props.alert ? props.alert.tab : '');
	const [statusCounts, setStatusCounts] = useState({});
	const { userState } = useAuth();
	const [publisherID, setPublisherId] = useState();

	const { team } = props;

	const searchOptions = useMemo(
		() => ({
			initialParams: {
				limit: MAXRESULTS,
				search: '',
				sortBy: 'latest',
				sortDirection: 'desc',
				page: 1,
			},
		}),
		[key]
	);

	const { isLoading, isFetched, data, params, getResults, getCachedResults, getCache } = useSearch(
		serviceDatasetOnboarding.useGetPublisher(publisherID),
		searchOptions
	);

	const handleSelect = key => {
		setKey(key);
	};

	const handleSubmit = React.useCallback(
		({ search, sortBy, sortDirection }) => {
			getResults(
				{
					search,
					sortBy,
					sortDirection,
					status: key,
					page: 1,
				},
				key
			);

			googleAnalytics.recordEvent(
				'Datasets',
				`Searched in account datasets for ${search} ordered by ${sortBy} ${sortDirection}`,
				'Account datasets search changed'
			);
		},
		[key, publisherID]
	);

	useEffect(() => {
		setPublisherId(utils.getPublisherID(userState[0], team));
		setKey(team === 'admin' ? 'inReview' : props.alert.tab || 'active');
	}, [team]);

	useEffect(() => {
		if (publisherID && key) {
			getCachedResults(
				{
					status: key,
				},
				key
			);
		}
	}, [publisherID, key]);

	useEffect(() => {
		if (data) {
			const reducedValues = reduce(
				getCache(),
				(original, { data }, tab) => {
					original[tab] = data.data.results.total;
					return original;
				},
				{}
			);

			setStatusCounts({
				...data.data.data.publisherTotals,
				...reducedValues,
				[key]: data.data.data.results.total,
			});
		}
	}, [data]);

	const AccountDatasetsResults = useCallback(
		({ isLoading, isFetched, datasets, params, team, count }) => (
			<AccountDatasetsContent
				isLoading={isLoading}
				isFetched={isFetched}
				data={datasets}
				onSubmit={handleSubmit}
				team={team}
				params={params}
				status={key}
				count={count}
			/>
		),
		[key]
	);

	return (
		<div>
			<LayoutContent>
				<AccountDatasetsCreate publisherID={publisherID} alert={props.alert} team={team} />

				{isFetched && <AccountDatasetsTabs counts={statusCounts} onSelectTab={handleSelect} team={team} activeKey={key} />}

				<AccountDatasetsResults
					isLoading={isLoading}
					isFetched={isFetched}
					datasets={data && data.data.data.results.listOfDatasets}
					params={params}
					team={team}
					count={statusCounts[key]}
				/>
			</LayoutContent>
		</div>
	);
};

export default AccountDatasets;
