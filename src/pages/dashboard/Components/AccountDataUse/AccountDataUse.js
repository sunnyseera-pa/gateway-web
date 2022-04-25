import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LayoutContent } from '../../../../components/Layout';
import Typography from '../../../../components/Typography';
import { useAuth } from '../../../../context/AuthContext';
import { isAdmin, isCustodian } from '../../../../utils/auth';
import DataUsePage from '../../../dataUse/DataUsePage';
import DataUseUpload from '../../../dataUse/upload/DataUseUpload';
import DataUseWidget from '../../../dataUse/widget/DataUseWidget';

const AccountDataUse = ({ tabId, team, onClickDataUseUpload, onSelectTab, publisherDetails }) => {
    const { t } = useTranslation();
    const { userState } = useAuth();

    const refUpload = React.createRef();
    const ref = React.createRef();

    const [activeTab, setActiveTab] = React.useState(tabId);
    const [dataUseUpload, setDataUseUpload] = React.useState();

    const handleSelectTab = React.useCallback(activeKey => {
        setActiveTab(activeKey);

        onSelectTab(activeKey);
    });

    const handleClickUpload = React.useCallback(() => {
        setDataUseUpload(true);
    }, []);

    const handleSubmitUpload = React.useCallback(() => {
        setDataUseUpload(false);
    }, []);

    React.useEffect(() => {
        setActiveTab(tabId);
    }, [tabId]);

    return (
        <>
            {isCustodian(team) && (
                <LayoutContent>
                    <div className='accountHeader'>
                        <Typography variant='h5'>{tabId == 'datause_widget' ? 'Data use widget' : ''}</Typography>
                        <Typography>{t(`datause.tabDescription.${tabId}`)}</Typography>
                    </div>
                    <div className='tabsBackground'>
                        <Tabs className='gray700-13 data-use-tabs' activeKey={activeTab} onSelect={handleSelectTab}>
                            <Tab eventKey='datause' title='Dashboard' />
                            <Tab eventKey='datause_widget' title='Data use widget' />
                        </Tabs>
                    </div>
                </LayoutContent>
            )}

            {tabId === 'datause' && dataUseUpload && (
                <DataUseUpload userState={userState} team={team} ref={refUpload} dataUsePage={ref} onSubmit={handleSubmitUpload} />
            )}

            {tabId === 'datause' && !dataUseUpload && (
                <DataUsePage userState={userState} team={team} onClickDataUseUpload={handleClickUpload} ref={ref} />
            )}

            {tabId === 'datause_widget' && isCustodian(team) && (
                <DataUseWidget
                    userState={userState}
                    team={team}
                    onClickDataUseUpload={onClickDataUseUpload}
                    ref={ref}
                    publisherName={publisherDetails.name}
                />
            )}
        </>
    );
};

AccountDataUse.defaultProps = {
    onSelectTab: () => {},
};

export default AccountDataUse;
