import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import DatasetCard from '../../../commonComponents/DatasetCard';
import SearchResults from '../../../commonComponents/SearchResults';
import Icon from '../../../storybookComponents/Icon';
import SearchControls from '../../../storybookComponents/SearchControls';
import '../../Dashboard.scss';

const AccountDatasetsContent = ({ data = [], onSubmit, isLoading, status, team }) => {
	const [searchValue, setSearchValue] = useState();
	const history = useHistory();

	const { t } = useTranslation();

	const handleChangeInput = React.useCallback(value => {
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

		if (status === 'inReview' && hasActivityHistory(dataset)) {
			datasetCardProps.slaProps = {
				icon: <Icon name='eye' role='button' onClick={() => handleActivityLogClick(dataset.pid)} mr={1} />,
			};

			datasetCardProps.path = getDatasetPath(dataset.pid);
		} else if (status === 'rejected') {
			datasetCardProps.rejectionText = dataset.applicationStatusDesc;
			datasetCardProps.rejectionAuthor = dataset.applicationStatusAuthor;
		}

		return datasetCardProps;
	};

	return (
		<>
			<SearchControls type={t(`dataset.${status}`)} onSubmit={onSubmit} onChangeInput={handleChangeInput} onResetInput={onSubmit} />

			<SearchResults
				data={data}
				results={data =>
					data.map(dataset => (
						<DatasetCard
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

export default AccountDatasetsContent;
