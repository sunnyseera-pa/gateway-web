import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';
import { baseURL } from '../../../../configs/url.config';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import './CreateNewVersionModal.scss';

const CreateNewVersionModal = ({ open, close, publisher, pid, currentVersionId }) => {
    let history = useHistory();

    const onHandleClose = e => {
        e.preventDefault();
        close();
    };

    const onCreateNewVersion = e => {
        if (!_.isEmpty(pid) && !_.isEmpty(publisher)) {

            axios.post(baseURL + '/api/v1/dataset-onboarding', { publisherID: publisher, pid, currentVersionId }).then(res => {
                let { id } = res.data.data;
                history.push({ pathname: `/dataset-onboarding/${id}` });
                close();


                /* let alert = {
					publisher,
					nav: `dataaccessrequests&team=${publisher}`,
					tab: 'inReview',
					message: `You have successfully requested updates to ‘${projectName}’ application`,
				};
				// redirect to dashboard with alert
                history.push({ pathname: `/account`, search: `?tab=dataaccessrequests&team=`, state: { alert } }); */
            });
        }
    };

    return (
        <Fragment>
            <Modal show={open} onHide={close} size='lg' aria-labelledby='contained-modal-title-vcenter' centered className='updateRequest'>
                <div className='updateRequest-header'>
                    <div className='updateRequest-header--wrap'>
                        <div className='updateRequest-head'>
                            <h1 className='black-20-semibold'>Create new version?</h1>
                            <CloseButtonSvg className='updateRequest-head--close' onClick={e => onHandleClose(e)} />
                        </div>
                        <p>
                            Are you sure that you want to create a new draft version of this dataset?
						</p>
                    </div>
                </div>
                <div className='updateRequest-footer'>
                    <div className='updateRequest-footer--wrap'>
                        <button onClick={e => onHandleClose(e)} className='button-secondary' data-spec='btn-cancel'>
                            No, nevermind
						</button>
                        <button className='button-primary' onClick={e => onCreateNewVersion(e)} data-spec='btn-submit'>
                            Create new version
						</button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default CreateNewVersionModal;
