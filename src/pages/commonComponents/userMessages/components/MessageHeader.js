import React, { useState, Fragment } from 'react';

const MessageHeader = ( {topic, onRequestAccess} ) => { 
    return (
        <Fragment>
            <div className="messageArea-header-desc">
                <h1 className="black-20 ">{topic.subTitle}</h1>
                <div className="badge-tag">{topic.title}</div>
            </div>
            <button className="button-tertiary" onClick={e => onRequestAccess(e)}>Request Access</button>
        </Fragment>
    )
}

export default MessageHeader;