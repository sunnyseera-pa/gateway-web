import _ from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useAuth } from '../../../../context/AuthContext';
import serviceDatasetOnboarding from '../../../../services/dataset-onboarding';
import serviceDatasets from '../../../../services/datasets';
import { getTeam } from '../../../../utils/auth';
import utils from '../../../../utils/DataSetHelper.util';
import ActionBar from '../../../commonComponents/actionbar/ActionBar';
import DatasetCard from '../../../commonComponents/DatasetCard';
import Loading from '../../../commonComponents/Loading';
import NotFound from '../../../commonComponents/NotFound';
import AccountContent from '../AccountContent';

const AccountDataset = props => {
	const { id } = useParams();
	const { userState } = useAuth();
	const [team, setTeam] = useState();
	const dataDataset = serviceDatasets.useGetDataset(id);
	const [state, setState] = useState({
		showPrevious: true,
		showDisabled: true,
	});
	const publisherId = utils.getPublisherID(userState[0], team);
	const dataPublisher = serviceDatasetOnboarding.useGetPublisher(publisherId);

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

			return datasets[currentIndex + i].pid;
		}
	};

	React.useEffect(() => {
		goToDataset(0);
	}, [dataPublisher.data]);

	const handlePaginationClick = React.useCallback(
		i => {
			const pid = goToDataset(i);

			window.location = `/account/datasets/${pid}`;
		},
		[id, dataPublisher.data, team]
	);

	if (!dataDataset.data && dataDataset.isError && dataDataset.isFetched) {
		return (
			<AccountContent>
				<NotFound word='dataset' />
			</AccountContent>
		);
	}

	if (dataDataset.isLoading || dataPublisher.isLoading) {
		return (
			<AccountContent>
				<Loading />
			</AccountContent>
		);
	}

	const {
		data: { data: dataset },
	} = dataDataset.data;

	const { showPrevious, showNext } = state;

	const getRejectedProps = dataset => {
		if (utils.isRejected(dataset)) {
			return {
				rejectionText: dataset.applicationStatusDesc,
				rejectionAuthor: dataset.applicationStatusAuthor,
			};
		}
	};

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
				{...getRejectedProps(dataset)}
			/>
			<ActionBar userState={userState}>
				<div className='action-bar-actions'>
					{showPrevious && (
						<Button variant='light' onClick={() => handlePaginationClick(-1)}>
							Previous
						</Button>
					)}
					{showNext && (
						<Button variant='light' onClick={() => handlePaginationClick(1)}>
							Next
						</Button>
					)}
				</div>
			</ActionBar>
		</AccountContent>
	);
};

export default AccountDataset;
