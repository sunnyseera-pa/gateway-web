import React from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import DataUsePage from '../../../dataUse/DataUsePage';
import Typography from '../../../../components/Typography';
import { LayoutContent } from '../../../../components/Layout';

const AccountDataUse = ({ tabId, userState, team, onClickDataUseUpload, onSelectTab, ref }) => {
    const [activeTab, setActiveTab] = React.useState(tabId);

    const handleSelectTab = React.useCallback(activeKey => {
        setActiveTab(activeKey);

        onSelectTab(activeKey);
    });

    return (
        <>
            <LayoutContent>
                <div className='accountHeader'>
                    <Typography variant='h5'>Data uses</Typography>
                    <Typography>Lorem ipsum something something something</Typography>
                </div>
                <div className='tabsBackground'>
                    <Tabs className='gray700-13 data-use-tabs' activeKey={activeTab} onSelect={handleSelectTab}>
                        <Tab eventKey='datause' title='Dashboard' />
                        <Tab eventKey='datause_widget' title='Data use widget' />
                    </Tabs>
                </div>
            </LayoutContent>

            {tabId === 'datause' && <DataUsePage userState={userState} team={team} onClickDataUseUpload={onClickDataUseUpload} ref={ref} />}
        </>
    );
};

AccountDataUse.defaultProps = {
    onSelectTab: () => {},
};

export default AccountDataUse;
