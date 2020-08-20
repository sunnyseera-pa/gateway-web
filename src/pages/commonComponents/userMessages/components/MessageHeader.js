import React, { Fragment } from 'react';

const MessageHeader = ( {topic, onRequestAccess} ) => { 
    return (
        <Fragment>
            <div className="messageArea-header-desc">
                <h1 className="black-20 ">{topic.title}</h1>
                {topic.tags.map((tag, index) => 
                    <div key={`tag-${index}`} className="badge-tag">{tag}</div>
                )}
            </div>
            <button className="button-tertiary" onClick={e => onRequestAccess(e)}>Request Access</button>
        </Fragment>
    )
}

export default MessageHeader;