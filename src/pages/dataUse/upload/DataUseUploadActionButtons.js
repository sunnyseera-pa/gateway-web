import React from 'react';
import googleAnalytics from '../../../tracking';

const DataUseUploadActionButtons = ({ dataUseUpload }) => {
    const handleAnalytics = (label, value) => {
        googleAnalytics.recordEvent('Data uses', label, value);
    };

    const handleSubmitDataUses = React.useCallback(() => {
        handleAnalytics('Clicked submit data uses');

        dataUseUpload.current.toggleSubmitModal();
    }, []);

    return (
        <button className='button-secondary' onClick={handleSubmitDataUses}>
            Submit data uses
        </button>
    );
};

export default DataUseUploadActionButtons;
