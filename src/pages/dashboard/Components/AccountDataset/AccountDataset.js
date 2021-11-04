import _ from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useAuth } from '../../../../context/AuthContext';
import serviceDatasetOnboarding from '../../../../services/dataset-onboarding/dataset-onboarding';
import serviceDatasets from '../../../../services/datasets/datasets';
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
	const [state, setState] = useState({
		showPrevious: true,
		showDisabled: true,
		statusError: false,
	});

	const dataDataset = serviceDatasets.useGetDataset(id);
	const publisherId = utils.getPublisherID(userState[0], team);
	const dataPublisher = serviceDatasetOnboarding.useGetPublisher('applicant');

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

			const inReview = datasets.filter(dataset => dataset.activeflag === props.activeflag);

			const currentIndex = _.findIndex(inReview, dataset => {
				return dataset.pid == id;
			});

			setState({
				showNext: currentIndex < inReview.length - 1,
				showPrevious: currentIndex > 0,
			});

			if (currentIndex === -1) {
				setState({
					statusError: true,
				});

				return;
			}

			return inReview[currentIndex + i].pid;
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

	if (statusError) {
		return (
			<AccountContent>
				<NotFound text='The activity log for this dataset cannot be accessed. It must be set to in review.' />
			</AccountContent>
		);
	}

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
