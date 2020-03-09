
// /ShowObjects/Reviews.js
import React, { Component, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from 'react-rating';
import { useFormik } from 'formik';
import { ReactComponent as EmptyStarIconSvg } from '../../images/starempty.svg';
import { ReactComponent as FullStarIconSvg } from '../../images/star.svg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import NotFound from './NotFound';

var baseURL = require('./../../BaseURL').getURL();

class Reviews extends Component {

  constructor(props) {
    super(props)
    this.state.data = props.data;
    this.state.userState = props.userState;
  }

  // initialize our state
  state = {
    data: [],
    userState: [],
    // isLoading: true 
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data, userState } = this.state;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    // const Rating = require('react-rating');
    return (
      <div>
        {!userState[0].loggedIn  ? '' : 
          <Row className="mt-4 mb-3">
            <Col xs={12} md={12}>
              <ReviewButton id={data.id} userState={userState} />
            </Col>
          </Row>
        }

        {data.reviews.length <= 0 ? <NotFound word="reviews" /> : data.reviews.map((review) => {
          var updatedDate = new Date(review.date);;
          var updatedOnDate = updatedDate.getDay()+" "+monthNames[updatedDate.getMonth()]+" "+updatedDate.getFullYear();
          return <Row className="mt-2">
            <Col>
              <div className="Rectangle">
                <Row>
                  <Col xs={12} md={12}>
                    <span className="Gray800-14px">{review.review}</span>
                  </Col>
                  
                  <Col xs={6} md={6} className="mt-2">
                    <span className="text-left Purple-13px">{review.reviewerID}</span>
                    <span className="text-left Gray500-13px">  on {updatedOnDate}</span>
                  </Col>
                  <Col xs={6} md={6} className="mb-1 text-right">
                    <Rating emptySymbol={<EmptyStarIconSvg />} fullSymbol={<FullStarIconSvg />} placeholderSymbol={<FullStarIconSvg />} placeholderRating={review.rating} readonly={true} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        })}
      </div>
    );
  }
}

const  ReviewButton = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" id="AddReviewButton"  onClick={handleShow}>
        + Add a review
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a review</Modal.Title>
        </Modal.Header>
        <Modal.Body>Reviews help others understand if this tool could be useful to them..

        <AddReviewForm id={props.id} userState={props.userState} handleClose={handleClose} />

        </Modal.Body>
      </Modal>
    </>
  );
}

const AddReviewForm = (props) => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      id: props.id, //passed in like in edit tool
      reviewerID: props.userState[0].id,
      rating: 0,
      projectName: '',
      review: '',
    },
    
    validationSchema: Yup.object({
      projectName: Yup.string().required('This cannot be empty'),
      review: Yup.string().required('This cannot be empty')
    }),

    //   validate,

    onSubmit: values => {
      //alert(JSON.stringify(values, null, 2));
      axios.post(baseURL + '/api/tool/review/add', values)
      .then((res) => {
        window.location.href = '/tool/'+props.id+'/?reviewAdded=true';
    });
    }
  });

  const handleRatingChange = (rating) => {
    formik.values.rating=rating;
  }
  
  return (
    <div>

      <Row className="mt-3">
        <Col sm={1} lg={1} />
        <Col sm={10} lg={10} >
          <Form onSubmit={formik.handleSubmit}>

            <Form.Label className="Gray800-14px">Your score</Form.Label>
            <Form.Group className="mb-2">
              <Rating 
              id="rating" 
              name="rating" 
              emptySymbol={<EmptyStarIconSvg />} 
              fullSymbol={<FullStarIconSvg />} 
               
              initialRating={formik.values.rating}
              onChange={handleRatingChange} />
            </Form.Group>

            <Form.Label className="Gray800-14px">Is this review related to a specific project?</Form.Label>
            <Form.Group className="mb-2 mt-2" style={{ display: "flex" }}>
              <Row>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Yes"
                    className="ml-5"
                    name="project"
                    id="true"
                  // checked={this.props.typeString === 'all' ? true: false}
                  // value="all"
                  // onChange={this.changeFilter}
                  />
                </Col>
                <Col className="ml-5">
                  <Form.Check
                    type="radio"
                    label="No"
                    className="ml-2"
                    name="project"
                    id="false"
                  // checked={this.props.typeString === 'all' ? true: false}
                  // value="all"
                  // onChange={this.changeFilter}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="pb-2">
                <Form.Label className="Gray800-14px">Project name</Form.Label>
                <Form.Control id="projectName" name="projectName" type="text" className={formik.touched.projectName && formik.errors.projectName ? "EmptyFormInput AddFormInput" : "AddFormInput" } value={formik.values.projectName} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
                {formik.touched.projectName && formik.errors.projectName ? <div className="ErrorMessages">{formik.errors.projectName}</div> : null}
            </Form.Group>

           
            <Form.Group className="pb-2">
              <Form.Label className="Gray800-14px">Your review</Form.Label>
              <Form.Text className="Gray700-13px">What worked or didn't work for you? What was the context? Is there anything you wish you knew before you tried it?</Form.Text>
              <Form.Control as="textarea" id="review" name="review" type="text" className={formik.touched.review && formik.errors.review ? "EmptyFormInput AddFormInput DescriptionInput" : "AddFormInput DescriptionInput"} value={formik.values.review} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.review && formik.errors.review ? <div className="ErrorMessages">{formik.errors.review}</div> : null}
            </Form.Group>

            <Row className="mt-3">
                <Col className="text-left">
                    <Button variant="medium" className="CancelButton" onClick={props.handleClose}>Cancel</Button>
                </Col>
                <Col className="text-right">
                <Button variant="primary" type="submit" className="AddButton">Add this review</Button>
                </Col>
            </Row>
          </Form>
        </Col>
        <Col sm={1} lg={1} />
      </Row>
    </div>
  );

}

export default Reviews;