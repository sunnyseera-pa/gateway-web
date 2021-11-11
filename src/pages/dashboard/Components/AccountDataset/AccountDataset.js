import _ from 'lodash';
import React, { Suspense, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { Redirect, useHistory, useParams } from 'react-router';
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
	const history = useHistory();
	const { userState } = useAuth();
	const [team, setTeam] = useState();
	const [currentDataset, setCurrentDataset] = useState();
	const [state, setState] = useState({
		showPrevious: true,
		showDisabled: true,
		statusError: false,
	});

	const dataActivityLog = serviceActivityLog.usePostActivityLog();
	const publisherId = utils.getPublisherID(userState[0], team);

	const filterCurrentDataset = datasets => {
		return datasets.find(dataset => dataset.pid === id);
	};

	const dataPublisher = serviceDatasetOnboarding.useGetPublisher(Array.isArray(publisherId) ? publisherId[0] : publisherId, null, {
		onSuccess: data => {
			const {
				data: {
					data: { listOfDatasets: datasets },
				},
			} = data;

			const dataset = filterCurrentDataset(datasets);

			setCurrentDataset(dataset);

			if (dataset) {
				dataActivityLog.mutateAsync({
					versionIds: [...dataset.listOfVersions.map(version => version._id), dataset._id],
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

			const datasets = listOfDatasets.filter(dataset => DataSetHelper.isInReview(dataset));

			const currentIndex = _.findIndex(datasets, dataset => {
				return dataset.pid == id;
			});

			let buttonState = {
				showNext: currentIndex < datasets.length - 1,
				showPrevious: currentIndex > 0,
			};

			if (currentIndex === -1) {
				setState({
					...buttonState,
					statusError: true,
				});

				return;
			} else {
				setState({
					...buttonState,
					statusError: false,
				});
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

			history.push(`/account/datasets/${pid}`);
		},
		[id, dataPublisher.data, team]
	);

	const { showPrevious, showNext, statusError } = state;

	if (dataPublisher.isLoading || dataActivityLog.isLoading) {
		return (
			<AccountContent>
				<Loading />
			</AccountContent>
		);
	}

	if (dataPublisher.isFetched) {
		if (dataPublisher.data && !filterCurrentDataset(dataPublisher.data.data.data.listOfDatasets)) {
			NotificationManager.error('The accessed dataset does not exist', 'Page not found', 10000);

			history.push('/account?tab=datasets');

			return null;
		} else if (statusError) {
			NotificationManager.error('The status of the dataset must be in review', 'Invalid status', 10000);

			history.push('/account?tab=datasets');

			return null;
		}
	}

	return (
		currentDataset && (
			<Suspense fallback={t('loading')}>
				<AccountContent>
					<DatasetCard
						id={currentDataset._id}
						title={currentDataset.name}
						publisher={currentDataset.datasetv2.summary.publisher.name}
						version={currentDataset.datasetVersion}
						isDraft={true}
						datasetStatus={currentDataset.activeflag}
						timeStamps={currentDataset.timestamps}
						completion={currentDataset.percentageCompleted}
						listOfVersions={currentDataset.listOfVersions}
					/>

					{dataActivityLog.data &&
						dataActivityLog.data.data.logs.map(version => <ActivityLogCard key={version.versionNumber} {...version} />)}

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
		)
	);
};

AccountDataset.defaultProps = {
	activeflag: 'inReview',
};

export default AccountDataset;
