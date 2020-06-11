import React, {Fragment, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import SearchBar from '../commonComponents/SearchBar';
import SimpleSearchBar from '../commonComponents/SimpleSearchBar';

function RelatedResources(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return (
        <Fragment className="FlexCenter">
            {console.log('here props: ' + JSON.stringify(props.userState[0]))}
            <Button variant='white' href={''} target="_blank" className="TechDetailButton mr-2" onClick={handleShow}>
                + Add resources
            </Button>
            {/* <Button variant="white"  className="TechDetailButton" onClick={handleShow}>
                View the toolkit
            </Button> */}
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered className="RelatedResourcesModal" dialogClassName="modal-70w">
                

                <Modal.Header closeButton>
                    <Modal.Title >
                        <span className="Black-20px">Add related resources</span>
                        <br />
                        <span className="Gray800-14px">Search for datasets, tools, papers, projects  and people</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SimpleSearchBar userState={props.userState} />
                    BODY
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='white' className="TechDetailButton" >
                        Unselect all
                    </Button>
                    <Button variant="primary" className="White-14px" >
                        Add resources
                    </Button>
                </Modal.Footer>


            </Modal>
        </Fragment>
    )
}

export default RelatedResources;
