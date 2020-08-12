import React, { useState, Fragment } from 'react';
import moment from 'moment';
import '../UserMessages.scss';


const TopicItem = (props) => { 

    const { onTopicClick, topic:  {  createdDate, title, subTitle, _id, active = false } } = props;

    const onItemClick =  (e, id) => {
        e.preventDefault();
        onTopicClick(id);
    }

    const setCreatedDate = () => {
        if(typeof createdDate !== 'undefined') {
            let reg = /^.*new.*$/gmi;
            return reg.test(createdDate) ? 'New message' : moment(createdDate).format('d MMM HH:mm');
        } else {
            return '';
        }
    }

    return (
        <div className={`sideDrawer-nav-item ${active ? 'selected-item' : ''}`} onClick={(e) => onItemClick(e, _id)}>
            <div className="nav-meta gray500-13">{setCreatedDate()}</div>
            <div className="nav-title black-bold-16">{title}</div>
            <div className="nav-desc gray500-13">{subTitle}</div>
        </div>
    )
}

export default TopicItem;
