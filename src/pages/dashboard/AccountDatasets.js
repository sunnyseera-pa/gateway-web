import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import serviceDatasetOnboarding from '../../services/dataset-onboarding/dataset-onboarding';
import { useAuth } from '../../context/AuthContext';
import SVGIcon from '../../images/SVGIcon';
import googleAnalytics from '../../tracking';
import utils from '../../utils/DataSetHelper.util';
import DatasetCard from '../commonComponents/DatasetCard';
import Loading from '../commonComponents/Loading';
import SearchResults from '../commonComponents/SearchResults';
import { LayoutContent } from '../storybookComponents/Layout';
import SearchBarContent from '../storybookComponents/SearchBarContent';
import './Dashboard.scss';

var baseURL = require('../commonComponents/BaseURL').getURL();

const AccountDatasets = props => {
	const [key, setKey] = useState();
	const [alert] = useState(props.alert);
	const { userState } = useAuth();
	const [publisherID, setPublisherId] = useState();
	const history = useHistory();
	const [searchValue, setSearchValue] = useState('');
	const { t } = useTranslation();

	const { team } = props;
	const dataPublisher = serviceDatasetOnboarding.useGetPublisher(publisherID);
	const dataPostDatasetOnboarding = serviceDatasetOnboarding.usePostDatasetOnboarding({ publisherID }, null, {
		enabled: false,
	});

	useEffect(() => {
		const initialKey = !_.isEmpty(props.alert.tab) ? props.alert.tab : 'active';

		setPublisherId(utils.getPublisherID(userState[0], team));
		setKey(team === 'admin' ? 'inReview' : initialKey);
	}, [team]);

	useEffect(() => {
		if (publisherID && key) {
			dataPublisher.mutate({
				status: key,
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
			dataPublisher.mutateAsync({
				search,
				sortBy,
				status: key,
			});
		},
		[key, publisherID]
	);

	const handleChangeInput = React.useCallback(
		value => {
			setSearchValue(value);
		},
		[searchValue]
	);

	const createNewDataset = e => {
		e.preventDefault();

		dataPostDatasetOnboarding.refetch();
	};

	const handleSelect = key => {
		setKey(key);
	};

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

	const { isLoading, data } = dataPublisher;
	const { isLoading: isLoadingCreateDataset } = dataPostDatasetOnboarding;

	if (isLoading && isLoadingCreateDataset) {
		return (
			<LayoutContent>
				<Loading />
			</LayoutContent>
		);
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
				{data &&
					(() => {
						const {
							data: {
								data: { counts, listOfDatasets },
							},
						} = data;

						return (
							<>
								<div className='tabsBackground'>
									<Row>
										<Col sm={12} lg={12}>
											{team === 'admin' ? (
												<Tabs className='dataAccessTabs gray700-13' activeKey={key} onSelect={handleSelect}>
													<Tab eventKey='inReview' title={'Pending approval (' + counts.inReview + ')'}>
														{' '}
													</Tab>
												</Tabs>
											) : (
												<Tabs className='dataAccessTabs gray700-13' activeKey={key} onSelect={handleSelect}>
													<Tab eventKey='active' title={'Active (' + counts.active + ')'}>
														{' '}
													</Tab>
													<Tab eventKey='inReview' title={'Pending approval (' + counts.inReview + ')'}>
														{' '}
													</Tab>
													<Tab eventKey='rejected' title={'Rejected (' + counts.rejected + ')'}>
														{' '}
													</Tab>
													<Tab eventKey='archive' title={'Archived (' + counts.archive + ')'}>
														{' '}
													</Tab>
												</Tabs>
											)}
										</Col>
									</Row>
								</div>
								<SearchBarContent
									type={t(`dataset.${key}`)}
									onSubmit={handleSubmit}
									onChangeInput={handleChangeInput}
									sortProps={{ defaultValue: 'metadataQuality', options: ['recentActivity', 'recentlyPublished', 'metadataQuality'] }}
								/>

								<SearchResults
									data={listOfDatasets}
									results={data =>
										data.map(dataset => (
											<DatasetCard
												id={dataset._id}
												title={dataset.name}
												publisher={dataset.datasetv2.summary.publisher.name}
												version={dataset.datasetVersion}
												isDraft={true}
												datasetStatus={dataset.activeflag}
												timeStamps={dataset.timestamps}
												completion={dataset.percentageCompleted}
												listOfVersions={dataset.listOfVersions}
											/>
										))
									}
									count={listOfDatasets.length}
									maxResult={5}
									datasetIndex={0}
									type='dataset'
								/>
							</>
						);
					})()}
				{/* {(() => {
					switch (key) {
						case 'inReview':
							return (
								<div>
									{reviewCount <= 0 ? (
										<NotFound word='datasets' />
									) : (
										datasetList.map(dataset => {
											if (dataset.activeflag !== 'inReview') {
												return <></>;
											} else {
												return (
													<DatasetCard
														slaProps={
															hasActivityHistory(dataset)
																? {
																		icon: <EyeIcon role='button' onClick={() => handleActivityLogClick(dataset.pid)} />,
																  }
																: {}
														}
														path={hasActivityHistory(dataset) ? getDatasetPath(dataset.pid) : ''}
														id={dataset._id}
														title={dataset.name}
														publisher={dataset.datasetv2.summary.publisher.name}
														version={dataset.datasetVersion}
														isDraft={true}
														datasetStatus={dataset.activeflag}
														timeStamps={dataset.timestamps}
														completion={dataset.percentageCompleted}
														listOfVersions={dataset.listOfVersions}
													/>
												);
											}
										})
									)}
								</div>
							);
						case 'rejected':
							return (
								<div>
									{rejectedCount <= 0 ? (
										<NotFound word='datasets' />
									) : (
										datasetList.map(dataset => {
											if (dataset.activeflag !== 'rejected') {
												return <></>;
											} else {
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
														rejectionText={dataset.applicationStatusDesc}
														rejectionAuthor={dataset.applicationStatusAuthor}
														listOfVersions={dataset.listOfVersions}
													/>
												);
											}
										})
									)}
								</div>
							);
						case 'archive':
							return (
								<div>
									{archiveCount <= 0 ? (
										<NotFound word='datasets' />
									) : (
										datasetList.map(dataset => {
											if (dataset.activeflag !== 'archive') {
												return <></>;
											} else {
												return (
													<DatasetCard
														id={dataset._id}
														title={dataset.name}
														//publisher={dataset.datasetv2.summary.publisher.name}
														version={dataset.datasetVersion}
														isDraft={true}
														datasetStatus={dataset.activeflag}
														timeStamps={dataset.timestamps}
														completion={dataset.percentageCompleted}
														listOfVersions={dataset.listOfVersions}
													/>
												);
											}
										})
									)}
								</div>
							);
						default:
							return key;
					}
				})()} */}
			</LayoutContent>
		</div>
	);
};

export default AccountDatasets;
