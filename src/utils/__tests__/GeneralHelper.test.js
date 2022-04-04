import { isEditMode } from '../GeneralHelper.util';

describe('Test GeneralHelper Utility', () => {
    it('should test isEditMode fn valid url', () => {
        let validSrc = '/projects/edit/456765';
        let isEdit = isEditMode(validSrc);

        expect(isEdit).toBe(true);
    });

    it('should test isEditMode fn inValid url', () => {
        let invalidSrc = '/projects/465465';
        let isEdit = isEditMode(invalidSrc);

        expect(isEdit).toBe(false);
    });
});
