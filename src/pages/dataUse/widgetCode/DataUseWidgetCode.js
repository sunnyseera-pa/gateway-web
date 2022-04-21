/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Typography from '../../../components/Typography';
import Button from '../../../components/Button';
import styles from './DataUseWidgetCode.styles';

const DataUseWidgetCode = ({ codeString, copyToClipBoard }) => {
    const { t } = useTranslation();
    const tooltip = <Tooltip id='tooltip'>{t('datause.widget.copyCodeClipBoard')}</Tooltip>;
    return (
        <div className='row'>
            <div className='col-12'>
                <Typography variant='h6' mb={3}>
                    {t('datause.widget.copyCodeHelp')}
                </Typography>{' '}
            </div>
            <div className='col-12'>
                <div css={styles}>
                    <pre>
                        <code>{codeString}</code>
                    </pre>
                </div>
            </div>
            <div className='col-12'>
                <OverlayTrigger placement='bottom' overlay={tooltip} trigger='click'>
                    <Button className='float-right' onClick={copyToClipBoard} type='button' mt={2}>
                        {t('datause.widget.copyCodeButton')}
                    </Button>
                </OverlayTrigger>
            </div>
        </div>
    );
};

DataUseWidgetCode.propTypes = {
    codeString: PropTypes.string.isRequired,
    copyToClipBoard: PropTypes.func.isRequired,
};

export default DataUseWidgetCode;
