import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as SearchResults from '../../../commonComponents/SearchResults';
import AccountDatasetsContent from './AccountDatasetsContent';
import { mockGetPublisher } from '../../../../services/dataset-onboarding/mockMsw';
import * as SearchControls from '../../../../components/SearchControls';
import * as DatasetCard from '../../../commonComponents/DatasetCard';

const mockSubmit = jest.fn();

const searchResultsSpy = jest.spyOn(SearchResults, 'default');
const searchControlsSpy = jest.spyOn(SearchControls, 'default');
const datasetCardSpy = jest.spyOn(DatasetCard, 'default');

jest.mock('../../../commonComponents/relatedObject/RelatedObject', () => <div />);

const props = {
	data: [],
	onSubmit: mockSubmit,
	isLoading: true,
	isFetched: false,
	status: 'inReview',
	team: 'admin',
};

let wrapper;

describe('Given the AccountDatasetsContent component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<AccountDatasetsContent {...props} />, {
				wrapper: Providers,
			});
		});

		it('The should call SearchResults with the correct arguments', () => {
			expect(searchResultsSpy.mock.calls[0][0]).toMatchObject({
				count: 0,
				data: [],
				isLoading: true,
			});
		});

		it('The should not call SearchControls with the correct arguments', () => {
			expect(searchControlsSpy.mock.calls).toHaveLength(0);
		});

		describe('And has data', () => {
			beforeAll(() => {
				searchResultsSpy.mockClear();

				wrapper = render(
					<AccountDatasetsContent {...props} data={mockGetPublisher.data.listOfDatasets} isFetched={true} isLoading={false} />,
					{
						wrapper: Providers,
					}
				);
			});

			it('The should call SearchResults with the correct arguments', () => {
				expect(searchResultsSpy.mock.calls[0][0]).toMatchObject({
					count: 19,
					data: mockGetPublisher.data.listOfDatasets,
					isLoading: false,
					results: expect.any(Function),
					search: undefined,
					type: 'dataset',
				});
			});

			it('The should call SearchControls with the correct arguments', () => {
				expect(searchControlsSpy.mock.calls[0][0]).toEqual({
					onSubmit: expect.any(Function),
					inputProps: { onChange: expect.any(Function), onReset: expect.any(Function), onSubmit: expect.any(Function) },
					mt: 5,
					sortProps: { defaultValue: 'metadataQuality', options: ['recentActivity', 'recentlyPublished', 'metadataQuality', 'popularity'] },
					type: 'dataset.inReview',
				});
			});

			describe('And status is archive', () => {
				beforeAll(() => {
					wrapper = render(
						<AccountDatasetsContent
							{...props}
							data={mockGetPublisher.data.listOfDatasets}
							isFetched={true}
							isLoading={false}
							status='archive'
						/>,
						{
							wrapper: Providers,
						}
					);
				});

				it('The should call Datasetcard with the correct arguments', () => {
					const {
						_id: id,
						name: title,
						datasetv2: {
							summary: {
								publisher: { name: publisher },
							},
						},
						datasetVersion: version,
						activeflag: datasetStatus,
						timestamps: timeStamps,
						percentageCompleted: completion,
						listOfVersions,
					} = mockGetPublisher.data.listOfDatasets[0];

					expect(datasetCardSpy.mock.calls[0][0]).toEqual({
						id,
						title,
						publisher,
						version,
						datasetStatus,
						timeStamps,
						completion,
						isDraft: true,
						listOfVersions,
						path: '/account/datasets/adc28a1e-f7e2-41d0-92e6-b9e4c11f9f1a',
						slaProps: expect.any(Object),
					});
				});

				describe('And status is rejected', () => {
					beforeAll(() => {
						datasetCardSpy.mockClear();

						wrapper = render(
							<AccountDatasetsContent
								{...props}
								data={mockGetPublisher.data.listOfDatasets}
								isFetched={true}
								isLoading={false}
								status='rejected'
							/>,
							{
								wrapper: Providers,
							}
						);
					});

					it('The should call Datasetcard with the correct arguments', () => {
						const {
							_id: id,
							name: title,
							datasetv2: {
								summary: {
									publisher: { name: publisher },
								},
							},
							datasetVersion: version,
							activeflag: datasetStatus,
							timestamps: timeStamps,
							percentageCompleted: completion,
							listOfVersions,
						} = mockGetPublisher.data.listOfDatasets[0];

						expect(datasetCardSpy.mock.calls[0][0]).toEqual({
							id,
							title,
							publisher,
							version,
							datasetStatus,
							timeStamps,
							completion,
							isDraft: true,
							listOfVersions,
							rejectionAuthor: undefined,
							rejectionText: undefined,
						});
					});
				});
			});
		});
	});
});
