import React from 'react';
import { useParams } from 'react-router';
import service from '../../../../services/datasets';
import DatasetCard from '../../../commonComponents/DatasetCard';
import utils from '../../../../utils/DataSetHelper.util';
import { useAuth } from '../../../../context/AuthContext';

const AccountDataset = () => {
	const { id } = useParams();
	const { userState } = useAuth();
	const { data } = service.useGetDataset(id);

	console.log('User state', userState);

	if (!data) return null;

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
	);
};

export default AccountDataset;
