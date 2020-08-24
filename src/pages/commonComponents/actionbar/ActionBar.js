import React from 'react';
import { Row } from "react-bootstrap";
import './ActionBar.scss'; 

const ActionBar = (props) => { 
    
    return (

        // console.log('props: ' + JSON.stringify(props.userState[0].loggedIn))
        !props.userState[0].loggedIn ? (
            ""
        ) : (
            <div className="actionBar"> 
                <Row className="floatRight">
                    {props.children}
                </Row>
            </div>
        )
    );
};

export default ActionBar;
