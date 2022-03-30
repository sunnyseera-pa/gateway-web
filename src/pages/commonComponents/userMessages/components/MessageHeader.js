import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import googleAnalytics from '../../../../tracking';

const MessageHeader = ({ userState, topic, modalRequired, onRequestAccess, onShowModal, is5Safes }) => {
    let [showDashboard, setShowDashboard] = useState(false);
    let [publisher, setPubliser] = useState('');
    let history = useHistory();

    const showDashboardOption = () => {
        ({ title: publisher } = topic);
        setPubliser(publisher);
        let { teams = [] } = userState;
        if (!_.isEmpty(teams)) {
            const hasPublisher = [...teams].map(t => t.name).includes(publisher);
            setShowDashboard(hasPublisher);
        } else {
            setShowDashboard(false);
        }
    };

    const onRouteChange = e => {
        e.preventDefault();
        history.push({ pathname: `/account`, search: `?tab=dataaccessrequests&team=${publisher}`, state: { team: publisher } });
    };

    useEffect(() => {
        showDashboardOption();
    }, [topic]);

    return (
        <Fragment>
            <div className='messageArea-header-desc'>
                <h1 className='black-20 ' data-test-id='headerTitle'>
                    {topic.title}
                </h1>
                {topic.tags.map((tag, index) => (
                    <div key={`tag-${index}`} className='badge-tag' data-test-id={`headerTag-${index}`}>
                        {tag.name || tag}
                    </div>
                ))}
            </div>
            <div className='messageArea-header-action'>
                {modalRequired && showDashboard ? (
                    <Fragment>
                        <div
                            className='purple-14 mr-2 pointer'
                            onClick={e => {
                                googleAnalytics.recordEvent('Data access request', 'Show applications', 'Message drawer link clicked');
                                onRouteChange(e);
                            }}
                        >
                            Show applications
                        </div>
                        <button
                            className='button-tertiary'
                            onClick={e => {
                                googleAnalytics.recordEvent('Data access request', 'How to request access', 'Message drawer link clicked');
                                onShowModal(e);
                            }}
                        >
                            How to request access
                        </button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <button
                            className='button-tertiary'
                            onClick={e => {
                                googleAnalytics.recordEvent('Data access request', 'How to request access', 'Message drawer link clicked');
                                onShowModal(e);
                            }}
                        >
                            How to request access
                        </button>
                        {topic.is5Safes || (topic.createdDate === 'New message' && is5Safes) ? (
                            <button
                                className='button-secondary ml-2'
                                onClick={e => {
                                    googleAnalytics.recordEvent('Data access request', 'Start application', 'Message drawer link clicked');
                                    onRequestAccess(e);
                                }}
                            >
                                Start application
                            </button>
                        ) : null}
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

export default MessageHeader;
