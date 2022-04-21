import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutContent } from '../../../components/Layout';
import Typography from '../../../components/Typography';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import useScript from '../../../hooks/useScript';
import DataUseWidgetCode from '../widgetCode';
import AcceptModal from '../AcceptModal';

const DataUseWidget = ({ userState, team, onClickDataUseUpload, ref, publisherName }) => {
    const { t } = useTranslation();
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
                <Typography variant='h5'>{t('datause.widget.howToHeader')}</Typography>
                <Typography mb={3}>{t('datause.widget.howToDesc')}</Typography>
                <Button mb={3} onClick={clickHandler} disabled={checked}>
                    {t('datause.widget.getWidgetButton')}
                </Button>
                <AcceptModal open={state.showAcceptModal} closed={modalCloseHandler} acceptHandler={acceptHandler} />
                <Typography>{t('datause.widget.tAndCHelp')}</Typography>
                <Checkbox
                    variant='primary'
                    label='I agree to the HDR Widget Terms and Conditions of use'
                    id='termCo  nditions'
                    mb={4}
                    disabled={checkBoxStatus}
                    checked={checked}
                />
                <Typography variant='h6'>{t('datause.widget.heading')}</Typography>
                <Typography color='grey600'>
                    <i>{t('datause.widget.buttonHelp')}</i>
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
