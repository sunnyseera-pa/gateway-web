import React, { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import reduce from 'lodash/reduce';
import { LayoutContent } from '../../../../components/Layout';
import useSearch from '../../../../components/Search/useSearch';
import { useAuth } from '../../../../context/AuthContext';
import serviceDatasetOnboarding from '../../../../services/dataset-onboarding/dataset-onboarding';
import utils from '../../../../utils/DataSetHelper.util';
import '../../Dashboard.scss';
import AccountDatasetsContent from './AccountDatasetsContent';
import AccountDatasetsCreate from './AccountDatasetsCreate';
import AccountDatasetsTabs from './AccountDatasetsTabs';

const AccountDatasets = props => {
	const [key, setKey] = useState();
	const [statusCounts, setStatusCounts] = useState({});
	const { userState } = useAuth();
	const [publisherID, setPublisherId] = useState();

	const { team } = props;

	const searchOptions = useMemo(
		() => ({
			params: {
				maxResults: 0,
				search: '',
				sortBy: 'metadata',
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
		({ search, sortBy }) => {
			getResults(
				{
					search,
					sortBy,
					status: key,
					page: 1,
				},
				key
			);
		},
		[key, publisherID]
	);

	useEffect(() => {
		setPublisherId(utils.getPublisherID(userState[0], team));
		setKey(team === 'admin' ? 'inReview' : !_.isEmpty(props.alert.tab) || 'active');
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
				...data.data.data.counts,
				...reducedValues,
				[key]: data.data.data.results.total,
			});
		}
	}, [data]);

	const AccountDatasetsResults = useCallback(
		({ isLoading, isFetched, datasets, params, team }) => (
			<AccountDatasetsContent
				isLoading={isLoading}
				isFetched={isFetched}
				data={datasets}
				onSubmit={handleSubmit}
				team={team}
				params={params}
				status={key}
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
				/>
			</LayoutContent>
		</div>
	);
};

export default AccountDatasets;
