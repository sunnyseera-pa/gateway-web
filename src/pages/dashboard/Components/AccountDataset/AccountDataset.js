import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useAuth } from '../../../../context/AuthContext';
import serviceActivityLog from '../../../../services/activitylog/activitylog';
import serviceDatasetOnboarding from '../../../../services/dataset-onboarding/dataset-onboarding';
import serviceDatasets from '../../../../services/datasets/datasets';
import { getTeam } from '../../../../utils/auth';
import utils from '../../../../utils/DataSetHelper.util';
import DatasetOnboardingHelper from '../../../../utils/DatasetOnboardingHelper.util';
import ActionBar from '../../../commonComponents/actionbar/ActionBar';
import DatasetCard from '../../../commonComponents/DatasetCard';
import Loading from '../../../commonComponents/Loading';
import NotFound from '../../../commonComponents/NotFound';
import SLA from '../../../commonComponents/sla/SLA';
import AccountContent from '../AccountContent';

const AccountDataset = props => {
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
					data: { listOfDatasets: datasets },
				},
			} = dataPublisher.data;

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

			return datasets[currentIndex + i]._id;
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
				<NotFound text='The activity log for this dataset cannot be accessed. It must be set to in review.' />
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
			{dataActivityLog.data &&
				dataActivityLog.data.data.logs.map(({ version, meta: { applicationStatus } }) => (
					<Row>
						<div className='col-md-12'>
							<div className='layoutCard mb-0'>
								<div className='datasetHeader mb-0 mt-2'>
									<div className='datasetHeader-title'>
										<h1>{version}</h1>
									</div>
									<div className='datasetHeader-status'>
										<SLA
											classProperty={DatasetOnboardingHelper.datasetStatusColours[applicationStatus]}
											text={DatasetOnboardingHelper.datasetSLAText[applicationStatus]}
										/>
									</div>
								</div>
								<div className='body'>Text goes here</div>
							</div>
						</div>
					</Row>
				))}
			<ActionBar userState={userState}>
				<div className='action-bar-actions'>
					{showPrevious && !statusError && (
						<Button variant='light' onClick={() => handlePaginationClick(-1)}>
							Previous
						</Button>
					)}
					{showNext && !statusError && (
						<Button variant='light' onClick={() => handlePaginationClick(1)}>
							Next
						</Button>
					)}
				</div>
			</ActionBar>
		</AccountContent>
	);
};

AccountDataset.defaultProps = {
	activeflag: 'inReview',
};

export default AccountDataset;
