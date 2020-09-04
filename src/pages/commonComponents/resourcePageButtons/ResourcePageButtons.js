import React from 'react';
import { Button } from "react-bootstrap";
import AddToCollection from "../addToCollection/AddToCollection";

const ResourcePageButtons = (props) => {  
    
    return ( 
        !props.userState[0].loggedIn ? (
            ""
        ) : (
            <>
                <Button 
                variant="white" 
                href={"/" + props.data.type + "/edit/" + props.data.id}
                className="techDetailButton mr-2"
                >
                    Edit
                </Button> 
                
                <AddToCollection className="addToCollectionButton" data={props.data} userState={props.userState} />
            </>

        )
    );
};

export default ResourcePageButtons;