import _ from 'lodash';
import React, { Suspense, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useAuth } from '../../../../context/AuthContext';
import serviceActivityLog from '../../../../services/activitylog/activitylog';
import serviceDatasetOnboarding from '../../../../services/dataset-onboarding/dataset-onboarding';
import serviceDatasets from '../../../../services/datasets/datasets';
import { getTeam } from '../../../../utils/auth';
import { default as DataSetHelper, default as utils } from '../../../../utils/DataSetHelper.util';
import ActionBar from '../../../commonComponents/actionbar/ActionBar';
import DatasetCard from '../../../commonComponents/DatasetCard';
import Loading from '../../../commonComponents/Loading';
import NotFound from '../../../commonComponents/NotFound';
import AccountContent from '../AccountContent';
import ActivityLogCard from '../ActivityLogCard';

const AccountDataset = props => {
	const { t } = useTranslation();
	const { id } = useParams();
	const { userState } = useAuth();
	const [team, setTeam] = useState();
	const [state, setState] = useState({
		showPrevious: true,
		showDisabled: true,
		statusError: false,
	});

	const dataDataset = serviceDatasets.useGetDataset(id);
	const dataActivityLog = serviceActivityLog.usePostActivityLog();
	const publisherId = utils.getPublisherID(userState[0], team);

	const dataPublisher = serviceDatasetOnboarding.useGetPublisher(Array.isArray(publisherId) ? publisherId[0] : publisherId, null, {
		onSuccess: data => {
			const {
				data: {
					data: { listOfDatasets: datasets },
				},
			} = data;

			const dataset = datasets.find(dataset => dataset.pid === id);

			if (dataset && dataset.listOfVersions.length > 0) {
				dataActivityLog.mutateAsync({
					versionIds: dataset.listOfVersions.map(version => version._id),
					type: 'dataset',
				});
			}
		},
	});

	React.useEffect(() => {
		setTeam(getTeam(props));
	}, [id]);

	const goToDataset = i => {
		if (dataPublisher.data) {
			const {
				data: {
					data: { listOfDatasets },
				},
			} = dataPublisher.data;

			// const datasets = listOfDatasets.filter(dataset => DataSetHelper.isInReview(dataset));
			const datasets = listOfDatasets.filter(dataset => !DataSetHelper.isNotActive(dataset) || DataSetHelper.isInReview(dataset));

			// const datasets = listOfDatasets;

			console.log('listOfDatasets', listOfDatasets);
			console.log('Datasets', datasets);

			const currentIndex = _.findIndex(datasets, dataset => {
				return dataset.pid == id;
			});

			setState({
				showNext: currentIndex < datasets.length - 1,
				showPrevious: currentIndex > 0,
			});

			if (currentIndex === -1) {
				setState({
					statusError: true,
				});

				return;
			}

			return datasets[currentIndex + i].pid;
		}
	};

	React.useEffect(() => {
		goToDataset(0);
	}, [dataPublisher.data]);

	const handlePaginationClick = React.useCallback(
		i => {
			const pid = goToDataset(i);

			window.location.assign(`/account/datasets/${pid}`);
		},
		[id, dataPublisher.data, team]
	);

	const { showPrevious, showNext, statusError } = state;

	if (!dataDataset.data && dataDataset.isError && dataDataset.isFetched) {
		return (
			<AccountContent>
				<NotFound word='dataset' />
			</AccountContent>
		);
	}

	if (statusError) {
		return (
			<AccountContent>
				<NotFound
					text={t('dataset.activitylog.notfound', {
						status: 'in review',
					})}
				/>
			</AccountContent>
		);
	}

	if (dataDataset.isLoading || dataPublisher.isLoading || dataActivityLog.isLoading) {
		return (
			<AccountContent>
				<Loading />
			</AccountContent>
		);
	}

	const {
		data: { data: dataset },
	} = dataDataset.data;

	return (
		<Suspense fallback={t('Loading')}>
			<AccountContent>
				<DatasetCard
					id={dataset._id}
					title={dataset.name}
					publisher={dataset.datasetv2.summary.publisher.name}
					version={dataset.datasetVersion}
					isDraft={true}
					datasetStatus={dataset.activeflag}
					timeStamps={dataset.timestamps}
					completion={dataset.percentageCompleted}
					listOfVersions={dataset.listOfVersions || []}
				/>

				{dataActivityLog.data && dataActivityLog.data.data.logs.map(version => <ActivityLogCard {...version} />)}

				<ActionBar userState={userState}>
					<div className='action-bar-actions'>
						{showPrevious && !statusError && (
							<Button variant='light' onClick={() => handlePaginationClick(-1)}>
								{t('previous')}
							</Button>
						)}
						{showNext && !statusError && (
							<Button variant='light' onClick={() => handlePaginationClick(1)}>
								{t('next')}
							</Button>
						)}
					</div>
				</ActionBar>
			</AccountContent>
		</Suspense>
	);
};

AccountDataset.defaultProps = {
	activeflag: 'inReview',
};

export default AccountDataset;
