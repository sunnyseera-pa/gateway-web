/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';
import * as styles from './AcceptModal.styles';

const AcceptModal = ({ open, closed, acceptHandler }) => {
    const [acceptStatus, setAcceptStatus] = useState(true);
    const listInnerRef = useRef();
    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                setAcceptStatus(false);
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
                            <h3>Data Use Widget</h3>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper fringilla blandit. Proin consequat
                        tortor a turpis lacinia, consectetur faucibus massa mollis. Mauris sollicitudin viverra bibendum. Donec ultrices in
                        orci quis rhoncus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur varius ante mi, ac
                        vestibulum leo hendrerit id. Duis condimentum pretium diam eget finibus. In aliquam augue a tortor aliquet,
                        tincidunt blandit tellus interdum. Etiam dapibus auctor auctor. Etiam pellentesque molestie hendrerit. In hac
                        habitasse platea dictumst. Nam nec elit volutpat, euismod quam ac, blandit ante. Ut volutpat ex in lorem pharetra
                        interdum. Duis placerat nunc ut ipsum mattis, sit amet dictum velit accumsan. Vestibulum volutpat purus a magna
                        rutrum, sed imperdiet elit vehicula. Aliquam tincidunt nulla neque, a semper sapien pellentesque ac. Integer
                        pulvinar lacus sit amet massa dictum interdum. Nam auctor ac neque ac faucibus. Aenean non velit in neque fermentum
                        ullamcorper sed vel orci. Etiam non sollicitudin nibh. Suspendisse et luctus libero. Maecenas ut massa ipsum. Duis
                        faucibus nibh suscipit diam vehicula, eu efficitur felis cursus. Mauris a elit pulvinar diam faucibus aliquam et
                        tristique eros. Vestibulum suscipit diam lectus, in rutrum enim vehicula sit amet. Phasellus suscipit est sed tortor
                        fringilla hendrerit. Etiam ultricies erat vitae erat tempor euismod. Etiam malesuada posuere diam a rutrum. Praesent
                        in faucibus nisl, eget iaculis augue. Quisque aliquet, sem pulvinar accumsan rhoncus, ipsum felis dapibus nisl, quis
                        vehicula quam nisl at mi. Praesent porttitor metus at justo pulvinar, ut feugiat nisl venenatis. Etiam hendrerit id
                        lacus eu faucibus. Duis ornare risus a nisi gravida, posuere sagittis lacus gravida. Quisque at ante quis arcu
                        pellentesque convallis. Integer faucibus at neque ultrices maximus. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Vivamus porttitor imperdiet nisl tincidunt rutrum. Curabitur sollicitudin enim massa, sodales
                        dictum lorem vulputate ac. Donec dui augue, elementum at quam in, bibendum dignissim risus. Integer gravida pretium
                        dapibus. Maecenas vitae ligula sit amet elit aliquet ornare id ut urna. Morbi congue feugiat sem quis maximus. Nunc
                        ultrices in dui sed dignissim. Nam lobortis viverra lectus ac porttitor. Nullam at ligula eget dolor eleifend
                        ullamcorper eget eu quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Proin dapibus volutpat libero, ac congue felis. Duis id elit condimentum, aliquet nunc at, viverra dui. Suspendisse
                        eu nunc congue, viverra lorem sit amet, porttitor turpis. Duis lacinia vel nibh at dignissim. Vivamus sodales orci
                        ac odio porttitor, nec varius diam lobortis. Vestibulum at vehicula massa. Phasellus ac augue sit amet leo
                        consectetur fermentum sit amet et felis. Aenean semper arcu enim, ut mattis purus hendrerit vulputate. Pellentesque
                        suscipit pellentesque sem sed aliquam. Phasellus a urna porta, porta nisi sed, finibus massa.
                    </div>
                </div>
                <hr />
                <div css={styles.footer}>
                    <Button
                        className='btn-light float-left'
                        onClick={() => {
                            closed();
                        }}>
                        Cancel
                    </Button>
                    <Button
                        disabled={acceptStatus}
                        type='submit'
                        data-testid='accept-button'
                        className='button-secondary float-right'
                        onClick={acceptHandler}>
                        Accept
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
