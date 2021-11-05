import { mockInReviewDataset, mockRejectedDataset } from '../../services/datasets/mockMsw';
import utils from '../DataSetHelper.util';

describe('Given the dataset inReview util', () => {
	describe('When it is not inReview', () => {
		it('Then returns false', () => {
			expect(utils.isInReview(mockRejectedDataset)).toBe(false);
		});
	});

	describe('When it is inReview', () => {
		it('Then returns true', () => {
			expect(utils.isInReview(mockInReviewDataset)).toBe(true);
		});
	});
});
