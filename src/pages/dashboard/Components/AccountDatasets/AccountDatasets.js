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
import { useHistory } from 'react-router';
import { getParams } from '../../../../utils/GeneralHelper.util';
import { omit } from '../../../../configs/propTypes';

const AccountDatasets = props => {
	const history = useHistory();
	const [historyParams, setHistoryParams] = useState(omit(getParams(history.location.search), ['tab']));
	const [key, setKey] = useState();
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
			onSuccess: (data, params) => {
				setHistoryParams(null);

				const searchParams = new URLSearchParams(params);
				history.push(`/account?tab=datasets&${searchParams}`);
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
		if (!_.isEmpty(historyParams)) {
			setHistoryParams(historyParams);
		}
	}, [historyParams]);

	useEffect(() => {
		setPublisherId(utils.getPublisherID(userState[0], team));

		if (team === 'admin') {
			setKey('inReview');
		} else if (historyParams.status) {
			setKey(historyParams.status);
		} else if (!_.isEmpty(props.alert.tab)) {
			setKey(props.alert.tab);
		} else {
			setKey('active');
		}
	}, [team]);

	useEffect(() => {
		if (publisherID && key && !historyParams) {
			getCachedResults(
				{
					status: key,
				},
				key
			);
		}
	}, [publisherID, key, historyParams]);

	useEffect(() => {
		if (historyParams && key) {
			getCachedResults(historyParams, key);
		}
	}, [key, historyParams]);

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
