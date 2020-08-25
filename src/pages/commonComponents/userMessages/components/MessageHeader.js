import React, { Fragment } from 'react';

const MessageHeader = ( {topic, modalRequired, onRequestAccess, onShowModal} ) => { 
    return (
        <Fragment>
            <div className="messageArea-header-desc">
                <h1 className="black-20 ">{topic.title}</h1>
                {topic.tags.map((tag, index) => 
                    <div key={`tag-${index}`} className="badge-tag">{tag}</div>
                )}
            </div>
            <div className="messageArea-header-action">
                { modalRequired ? <button className="button-tertiary mr-2" onClick={e => onShowModal(e)}>How to request access</button> : null}
                <button className="btn btn-primary addButton" onClick={e => onRequestAccess(e)}>Request Access</button>
            </div>
        </Fragment>
    )
}

export default MessageHeader;