import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { useAuth } from '../../../../context/AuthContext';
import SVGIcon from '../../../../images/SVGIcon';
import serviceDatasetOnboarding from '../../../../services/dataset-onboarding/dataset-onboarding';
import googleAnalytics from '../../../../tracking';
import utils from '../../../../utils/DataSetHelper.util';
import { LayoutContent } from '../../../storybookComponents/Layout';
import useSearch from '../../../storybookComponents/Search/useSearch';
import '../../Dashboard.scss';
import AccountDatasetsContent from './AccountDatasetsContent';
import AccountDatasetsTabs from './AccountDatasetsTabs';

const AccountDatasets = props => {
	const [key, setKey] = useState();
	const [alert] = useState(props.alert);
	const { userState } = useAuth();
	const [publisherID, setPublisherId] = useState();

	const { isLoading, data, getResults } = useSearch(serviceDatasetOnboarding.useGetPublisher(publisherID), {
		params: {
			maxResults: 0,
		},
		count: data => {
			return data.counts[key];
		},
	});

	const dataPostDatasetOnboarding = serviceDatasetOnboarding.usePostDatasetOnboarding({ publisherID }, null, {
		enabled: false,
	});

	const { team } = props;

	useEffect(() => {
		const initialKey = !_.isEmpty(props.alert.tab) ? props.alert.tab : 'active';

		setPublisherId(utils.getPublisherID(userState[0], team));
		setKey(team === 'admin' ? 'inReview' : initialKey);
	}, [team]);

	useEffect(() => {
		if (publisherID && key) {
			getResults({
				status: key,
				page: 1,
			});
		}
	}, [publisherID, key]);

	useEffect(() => {
		if (dataPostDatasetOnboarding.data) {
			const {
				data: {
					data: { id },
				},
			} = dataPostDatasetOnboarding;

			if (!_.isUndefined(id)) window.location.href = `/dataset-onboarding/${id}`;
		}
	}, [dataPostDatasetOnboarding.data]);

	const handleSubmit = React.useCallback(
		({ search, sortBy }) => {
			getResults({
				search,
				sortBy,
				status: key,
				page: 1,
			});
		},
		[key, publisherID]
	);

	const createNewDataset = e => {
		e.preventDefault();

		dataPostDatasetOnboarding.refetch();
	};

	const handleSelect = key => {
		setKey(key);
	};

	const generateAlert = () => {
		let { message = '' } = alert;

		return (
			<LayoutContent className='mt-3'>
				<Alert variant={'success'} className='col-sm-12 main-alert'>
					<SVGIcon name='check' width={18} height={18} fill={'#2C8267'} /> {message}
				</Alert>
			</LayoutContent>
		);
	};

	const { isLoading: isLoadingCreateDataset } = dataPostDatasetOnboarding;

	let statusCounts;
	let datasets;

	if (data) {
		const {
			data: {
				data: { counts, listOfDatasets },
			},
		} = data;

		statusCounts = counts;
		datasets = listOfDatasets;
	}

	return (
		<div>
			<>{!_.isEmpty(alert) ? generateAlert() : ''}</>
			<LayoutContent>
				<div className='accountHeader'>
					<Row>
						<Col sm={12} md={8}>
							<div>
								<span className='black-20'>Datasets</span>
							</div>
							<div>
								<span className='gray700-13 '>
									{publisherID !== 'admin'
										? 'View, add, edit, archive and check the status of your datasets.'
										: 'Approve or reject pending datasets'}
								</span>
							</div>
						</Col>
						<Col sm={12} md={4} style={{ textAlign: 'right' }}>
							{team !== 'admin' && (
								<Button
									variant='primary'
									className='addButton'
									onClick={
										(() => googleAnalytics.recordEvent('Datasets', 'Add a new dataset', 'Datasets dashboard button clicked'),
										createNewDataset)
									}>
									+ Add a new dataset
								</Button>
							)}
						</Col>
					</Row>
				</div>
				<AccountDatasetsTabs counts={statusCounts} onSelectTab={handleSelect} team={team} activeKey={key} />
				<AccountDatasetsContent
					isLoading={isLoading || isLoadingCreateDataset}
					data={datasets}
					onSubmit={handleSubmit}
					team={team}
					status={key}
				/>
			</LayoutContent>
		</div>
	);
};

export default AccountDatasets;
