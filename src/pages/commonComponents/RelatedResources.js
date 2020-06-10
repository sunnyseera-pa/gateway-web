import React, {Fragment, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';

function RelatedResources() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            <Button variant='white' href={''} target="_blank" className="TechDetailButton mr-2" onClick={handleShow}>
                + Add resources
            </Button>
            {/* <Button variant="white"  className="TechDetailButton" onClick={handleShow}>
                View the toolkit
            </Button> */}
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="darModal" >
                <iframe src="https://hda-toolkit.org/story_html5.html" className="darIframe"> </iframe>
                

                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                    Save Changes
                    </Button>
                </Modal.Footer> */}


            </Modal>
        </Fragment>
    )
}

export default RelatedResources;
