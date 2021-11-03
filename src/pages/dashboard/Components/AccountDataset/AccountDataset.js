import React from 'react';
import { useParams } from 'react-router';
import service from '../../../../services/datasets';
import DatasetCard from '../../../commonComponents/DatasetCard';
import utils from '../../../../utils/DataSetHelper.util';
import NotFound from '../../../commonComponents/NotFound';
import Loading from '../../../commonComponents/Loading';
import AccountContent from '../AccountContent';
import ActionBar from '../../../commonComponents/actionbar/ActionBar';
import { useAuth } from '../../../../context/AuthContext';

const AccountDataset = () => {
	const { id } = useParams();
	const { userState } = useAuth();
	const { data, isFetched, isLoading, isError } = service.useGetDataset(id);

	if (!data) {
		if (isError && isFetched) {
			return (
				<AccountContent>
					<NotFound word='dataset' />
				</AccountContent>
			);
		} else if (isLoading) {
			return (
				<AccountContent>
					<Loading />
				</AccountContent>
			);
		}
	}

	const {
		data: { data: dataset },
	} = data;

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
				<button>xyz</button>
			</ActionBar>
		</AccountContent>
	);
};

export default AccountDataset;
