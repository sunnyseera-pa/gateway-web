import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import pluralize from 'pluralize';
import DatasetCard from '../../../commonComponents/DatasetCard';
import SearchResults from '../../../commonComponents/SearchResults';
import Icon from '../../../../components/Icon';
import SearchControls from '../../../../components/SearchControls';
import '../../Dashboard.scss';
import MessageNotFound from '../../../commonComponents/MessageNotFound';

const AccountDatasetsContent = ({ data = [], onSubmit, isLoading, isFetched, status, params, team, count }) => {
	const [searchValue, setSearchValue] = useState();
	const history = useHistory();

	const { t } = useTranslation();
	const handleChange = React.useCallback(value => {
		setSearchValue(value);
	}, []);

	const getDatasetPath = id => {
		return `/account/datasets/${id}`;
	};

	const handleActivityLogClick = id => {
		history.push(getDatasetPath(id));
	};

	const hasActivityHistory = React.useCallback(
		dataset => {
			return dataset.listOfVersions.length > 0 && team === 'admin';
		},
		[team]
	);

	const getDatasetCardProps = dataset => {
		const datasetCardProps = {};

		if (dataset.activeflag === 'inReview' && hasActivityHistory(dataset)) {
			datasetCardProps.slaProps = {
				icon: <Icon name='eye' role='button' onClick={() => handleActivityLogClick(dataset.pid)} mr={1} />,
			};

			datasetCardProps.path = getDatasetPath(dataset.pid);
		} else if (dataset.activeflag === 'rejected') {
			datasetCardProps.rejectionText = dataset.applicationStatusDesc;
			datasetCardProps.rejectionAuthor = dataset.applicationStatusAuthor;
		}

		return datasetCardProps;
	};

	const { search, sortBy, sortDirection, maxResults } = params;

	return (
		<>
			{isFetched && (
				<SearchControls
					type={t(`dataset.${status}`)}
					mt={3}
					onSubmit={onSubmit}
					inputProps={{
						onChange: handleChange,
						mt: 2,
						value: search,
					}}
					sortProps={{
						direction: sortDirection,
						value: sortBy,
						options: ['alphabetic', 'latest', 'recentlyadded', 'metadata', 'popularity'],
						mt: 2,
						allowDirection: true,
						minWidth: '300px',
					}}
				/>
			)}

			<SearchResults
				data={data}
				errorMessage={({ type }) => <MessageNotFound word={pluralize(type)} />}
				results={data =>
					data.map(dataset => (
						<DatasetCard
							key={dataset._id}
							id={dataset._id}
							title={dataset.name}
							publisher={status !== 'archive' && dataset.datasetv2.summary.publisher.name}
							version={dataset.datasetVersion}
							isDraft={true}
							datasetStatus={dataset.activeflag}
							timeStamps={dataset.timestamps}
							completion={dataset.percentageCompleted}
							listOfVersions={dataset.listOfVersions}
							{...getDatasetCardProps(dataset)}
						/>
					))
				}
				count={count}
				maxResults={maxResults}
				type='dataset'
				isLoading={isLoading}
				search={searchValue}
			/>
		</>
	);
};

AccountDatasetsContent.defaultProps = {
	params: {
		search: '',
		sortBy: 'latest',
		sortDirection: 'desc',
	},
};

export default AccountDatasetsContent;
