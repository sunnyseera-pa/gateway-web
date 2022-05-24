import React from 'react';
import Alert from '../../../../components/Alert';
import { LayoutContent } from '../../../../components/Layout';
import { useAuth } from '../../../../context/AuthContext';
import { isCustodian } from '../../../../utils/auth';
import DataUsePage from '../../../dataUse/DataUsePage';
import DataUseUpload from '../../../dataUse/upload/DataUseUpload';
import DataUseWidget from '../../../dataUse/widget/DataUseWidget';

const AccountDataUse = ({ tabId, team, publisherDetails, alert = {} }) => {
    const { userState } = useAuth();

    const [dataUseUpload, setDataUseUpload] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState(false);

    const handleClickUpload = React.useCallback(() => {
        setDataUseUpload(true);
    }, []);

    const handleSubmitUpload = React.useCallback(() => {
        setDataUseUpload(false);
    }, []);

    const handleAlertClose = React.useCallback(() => {
        setAlertMessage('');
    }, []);

    React.useEffect(() => {
        setAlertMessage(alert.message);
    }, [alert.message]);

    return (
        <>
            {alertMessage && (
                <LayoutContent>
                    <Alert variant='success' autoclose onClose={handleAlertClose}>
                        {alertMessage}
                    </Alert>
                </LayoutContent>
            )}

            {tabId === 'datause' && dataUseUpload && <DataUseUpload userState={userState} team={team} onSubmit={handleSubmitUpload} />}

            {tabId === 'datause' && !dataUseUpload && (
                <DataUsePage userState={userState} team={team} onClickDataUseUpload={handleClickUpload} />
            )}

            {tabId === 'datause_widget' && isCustodian(team) && (
                <DataUseWidget userState={userState} team={team} publisherName={publisherDetails.name} />
            )}
        </>
    );
};

AccountDataUse.defaultProps = {
    onSelectTab: () => {},
};

export default AccountDataUse;
