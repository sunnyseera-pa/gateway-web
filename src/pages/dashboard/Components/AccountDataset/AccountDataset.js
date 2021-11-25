import _ from 'lodash';
import React, { Suspense, useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { Redirect, useHistory, useParams } from 'react-router';
import { useAuth } from '../../../../context/AuthContext';
import serviceActivityLog from '../../../../services/activitylog/activitylog';
import serviceDatasetOnboarding from '../../../../services/dataset-onboarding/dataset-onboarding';
import { getTeam } from '../../../../utils/auth';
import { default as DataSetHelper, default as utils } from '../../../../utils/DataSetHelper.util';
import ActionBar from '../../../commonComponents/actionbar/ActionBar';
import DatasetCard from '../../../commonComponents/DatasetCard';
import Loading from '../../../commonComponents/Loading';
import ActionBarMenu from '../../../commonComponents/ActionBarMenu/ActionBarMenu';
import { LayoutContent } from '../../../../components/Layout';
import AccountDatasetApproveModal from './AccountDatasetApproveModal';
import AccountDatasetRejectModal from './AccountDatasetRejectModal';
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
		showNext: true,
		statusError: false,
		showApproveDatasetModal: false,
		showRejectDatasetModal: false,
	});

	const dataActivityLog = serviceActivityLog.usePostActivityLog();
	const publisherId = utils.getPublisherID(userState[0], team);
	const dataPublisher = serviceDatasetOnboarding.useGetPublisher(publisherId);

	React.useEffect(() => {
		setTeam(getTeam(props));
	}, [id]);

	React.useEffect(() => {
		dataPublisher.mutate();
	}, [dataPublisher]);

	const getValidDatasets = listOfDatasets => {
		return listOfDatasets.filter(dataset => {
			return DataSetHelper.isInReview(dataset) && parseFloat(dataset.datasetVersion) > 1;
		});
	};

	const getDatasetIndex = datasets => {
		return _.findIndex(datasets, dataset => {
			return dataset.pid == id;
		});
	};

	const updateButtonStates = ({ currentIndex, total }) => {
		let buttonState = {
			showNext: Boolean(currentIndex < total - 1),
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
	};

	const getNextPage = i => {
		if (dataPublisher.data) {
			const {
				data: {
					data: { listOfDatasets },
				},
			} = dataPublisher.data;

			const datasets = getValidDatasets(listOfDatasets);
			const currentIndex = getDatasetIndex(datasets);

			return {
				dataset: datasets[currentIndex + i],
				currentIndex,
				total: datasets.length,
			};
		}
	};

	const filterCurrentDataset = datasets => {
		return datasets.find(dataset => dataset.pid === id);
	};

	React.useEffect(() => {
		const page = getNextPage(0);
		if (page) {
			if (page.dataset) {
				const { dataset } = page;

				setCurrentDataset(dataset);

				dataActivityLog.mutateAsync({
					versionIds: [...dataset.listOfVersions.map(version => version._id), dataset._id],
					type: 'dataset',
				});
			}
			updateButtonStates(page);
		}
	}, [dataPublisher.data, id]);

	const handlePaginationClick = React.useCallback(
		i => {
			const { dataset } = getNextPage(i);

			if (dataset) history.push(`/account/datasets/${dataset.pid}`);
		},
		[id, dataPublisher.data, team]
	);

	const { showPrevious, showNext, statusError, showRejectDatasetModal, showApproveDatasetModal } = state;

	const goToNext = useCallback(() => {
		const { showNext } = state;
		if (showNext) {
			handlePaginationClick(1);
		}
	}, []);

	const handleViewForm = React.useCallback(() => {
		history.push(`/dataset-onboarding/${currentDataset._id}`);
	}, [currentDataset]);

	const makeADecisionActions = [
		{
			description: t('dataset.makeADecision'),
			actions: [
				{
					title: t('dataset.approve'),
					onClick: () => {
						setState({ ...state, showApproveDatasetModal: true });
					},
					visible: true,
				},
				{
					title: t('dataset.reject'),
					onClick: () => {
						setState({ ...state, showRejectDatasetModal: true });
					},
					visible: true,
				},
			],
		},
	];

	if (dataPublisher.isLoading || dataActivityLog.isLoading) {
		return (
			<LayoutContent>
				<Loading />
			</LayoutContent>
		);
	}

	if (dataPublisher.isFetched) {
		if (dataPublisher.data && !filterCurrentDataset(dataPublisher.data.data.data.listOfDatasets)) {
			NotificationManager.error('The accessed dataset does not exist', 'Page not found', 10000);

			return <Redirect to='/account?tab=datasets' />;
		} else if (statusError) {
			NotificationManager.error('The status of the dataset must be in review', 'Invalid status', 10000);

			return <Redirect to='/account?tab=datasets' />;
		}
	}

	return currentDataset ? (
		<Suspense fallback={t('loading')}>
			<LayoutContent>
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
					dataActivityLog.data.data.logs.map(version => <ActivityLogCard key={version.datasetVersion} {...version} />)}

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
						<ActionBarMenu label='Make a decision' options={makeADecisionActions} />
						<Button variant='primary' onClick={handleViewForm}>
							{t('viewForm')}
						</Button>
					</div>
				</ActionBar>
				<AccountDatasetApproveModal
					id={currentDataset._id}
					open={showApproveDatasetModal}
					closed={() => setState({ ...state, showApproveDatasetModal: false })}
					goToNext={goToNext}
					showGoToNext={showNext}
				/>
				<AccountDatasetRejectModal
					id={currentDataset._id}
					open={showRejectDatasetModal}
					closed={() => setState({ ...state, showRejectDatasetModal: false })}
					goToNext={goToNext}
					showGoToNext={showNext}
				/>
			</LayoutContent>
		</Suspense>
	) : null;
};

AccountDataset.defaultProps = {
	activeflag: 'inReview',
};

export default AccountDataset;
