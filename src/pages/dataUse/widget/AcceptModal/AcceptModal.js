/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import leaglText from './TermsAndConditions';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import * as styles from './AcceptModal.styles';

const AcceptModal = ({ open, closed, acceptHandler }) => {
    const { t } = useTranslation();
    const [disableAcceptStatus, setAcceptStatus] = useState(true);
    const listInnerRef = useRef();
    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - (scrollHeight / 100) * 5) {
                setAcceptStatus(false);
            } else {
                setAcceptStatus(true);
            }
        }
    };
    return (
        <Modal show={open} onHide={closed} className='decisionModal' size='xl' aria-labelledby='contained-modal-title-vcenter' centered>
            <div className='decisionModal-header'>
                <div className='decisionModal-header--wrap'>
                    <div className='decisionModal-head'>
                        <div>
                            <h1 className='black-20-semibold'>HEALTH DATA RESEARCH UK</h1>
                            <h3>{t('datause.widget.heading')}</h3>
                        </div>

                        <CloseButtonSvg className='decisionModal-head--close' onClick={closed} />
                    </div>
                </div>
            </div>

            <div className='decisionModal-body'>
                <div
                    className='decisionModal-body--wrap'
                    onScroll={onScroll}
                    ref={listInnerRef}
                    css={styles.body}
                    style={{ overflowY: 'auto' }}>
                    <div css={styles.innerBody}>
                        <ReactMarkdown source={leaglText} />
                    </div>
                </div>
                <hr />
                <div css={styles.footer}>
                    <Button
                        data-testid='cancel-button'
                        className='btn-light float-left'
                        onClick={() => {
                            closed();
                        }}>
                        {t('datause.widget.modal.cancel')}
                    </Button>
                    <Button
                        disabled={disableAcceptStatus}
                        type='submit'
                        data-testid='accept-button'
                        className='button-secondary float-right'
                        onClick={acceptHandler}>
                        {t('datause.widget.modal.accept')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

AcceptModal.propTypes = {
    open: PropTypes.bool.isRequired,
    closed: PropTypes.func.isRequired,
    acceptHandler: PropTypes.func.isRequired,
};

export default AcceptModal;
