import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import DatasetCard from '../../../commonComponents/DatasetCard';
import SearchResults from '../../../commonComponents/SearchResults';
import Icon from '../../../../components/Icon';
import SearchControls from '../../../../components/SearchControls';
import '../../Dashboard.scss';

const AccountDatasetsContent = ({ data = [], onSubmit, isLoading, isFetched, status, params, team }) => {
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
			console.log('asdasdasd', team, dataset.listOfVersions);
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

	const { search, sortBy } = params;

	return (
		<>
			{isFetched && (
				<SearchControls
					type={t(`dataset.${status}`)}
					mt={3}
					onSubmit={onSubmit}
					inputProps={{
						onReset: onSubmit,
						onChange: handleChange,
						mt: 2,
						value: search,
					}}
					sortProps={{
						value: sortBy,
						defaultValue: 'metadata',
						options: ['latest', 'recentlyadded', 'metadata', 'popularity'],
						mt: 2,
					}}
				/>
			)}

			<SearchResults
				data={data}
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
				count={data.length}
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
		sortBy: 'metadata',
	},
};

export default AccountDatasetsContent;
