import React, { useState, useEffect } from 'react';
import { LayoutContent } from '../../../components/Layout';
import Typography from '../../../components/Typography';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import useScript from '../../../hooks/useScript';
import DataUseWidgetCode from '../widgetCode';
import AcceptModal from '../AcceptModal';

const DataUseWidget = ({ userState, team, onClickDataUseUpload, ref, publisherName }) => {
    useScript('https://unpkg.com/hdruk-gateway-widgets?module');
    const [checkBoxStatus, setCheckBoxStatus] = useState(true);
    const [checked, setChecked] = useState(false);
    const [showWidgetCode, setShowWidgetCode] = useState(false);
    const [state, setState] = useState({
        showAcceptModal: false,
    });
    const codeString = `<script type="module"src="https://unpkg.com/hdruk-gateway-widgets?module"></script>\n<hdruk-data-uses id="${publisherName}"/>`;

    useEffect(() => {}, [checkBoxStatus]);

    const clickHandler = () => {
        setState({ ...state, showAcceptModal: true });
    };

    const modalCloseHandler = () => {
        setState({ ...state, showAcceptModal: false });
    };

    const acceptHandler = () => {
        setState({ ...state, showAcceptModal: false });
        setCheckBoxStatus(false);
        setChecked(true);
        setShowWidgetCode(true);
    };

    const copyToClipBoardHandler = () => {
        navigator.clipboard.writeText(codeString);
    };

    return (
        <LayoutContent>
            <div className='accountHeader'>
                <Typography variant='h5'>How to start using your widget</Typography>
                <Typography mb={3}>
                    Below is an interactive example of how your widget could look and be used. Please note that this design is compatible
                    with mobile devices and can be resized to fit anywhere on your website. To start using this widget please accept the
                    terms and conditions by clicking on the 'Get widget' button below.
                </Typography>
                <Button mb={3} onClick={clickHandler} disabled={checked}>
                    Get widget
                </Button>
                <AcceptModal open={state.showAcceptModal} closed={modalCloseHandler} acceptHandler={acceptHandler} />
                <Typography>By embedding content in your website or app, you are agreeing to the Terms and Conditions</Typography>
                <Checkbox
                    variant='primary'
                    label='I agree to the HDR Widget Terms and Conditions of use'
                    id='termCo  nditions'
                    mb={4}
                    disabled={checkBoxStatus}
                    checked={checked}
                />
                <Typography variant='h6'>Data use widget</Typography>
                <Typography color='grey600'>
                    <i>Click the button below to see your filtered data uses</i>
                </Typography>
                {showWidgetCode ? (
                    <DataUseWidgetCode codeString={codeString} copyToClipBoard={copyToClipBoardHandler} />
                ) : (
                    <hdruk-data-uses id={publisherName} />
                )}
            </div>
        </LayoutContent>
    );
};

export default DataUseWidget;
