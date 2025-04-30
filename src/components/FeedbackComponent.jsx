import React, { Fragment, memo, useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';

import { isAuthenticated, getUser } from "../firebase"; // Assuming these are your custom functions for Firebase auth

import Loader from "../components/ReactLoader";

const ReviewComponent = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const currentUser = getUser();
      setUserId(currentUser?.uid);
    } else {
      navigate(`/login`);
    }
  }, [navigate]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      userId,
      feedback,
      app: "web",
      rate: rating,
    };

    try {
      const response = await fetch('https://demo-api.aryzap.com/api/feedback/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        
        setIsLoading(false);
        throw new Error('Failed to submit feedback');
      }

      const result = await response.json();
        
      setIsLoading(false);
        
        toast.success('Feedback submitted!');
        console.log(result);
    } catch (error) {
        setIsLoading(false);
        console.error('Error:', error);      
        toast.error('Error submitting feedback!')
    }
  };

  return (
    <Fragment>
      <div className="streamit-reviews">
        <div className="review_form">
          <div className="comment-respond">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md="12">
                  <Form.Group className='form-group'>
                    <Form.Label>Your Rate <span className='text-danger'> *</span></Form.Label>
                    <Rating
                      count={5}
                      size={30}
                      activeColor="#e50914"
                      value={rating}
                      onChange={handleRatingChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group className='form-group'>
                    <Form.Label>Your Feedback <span className='text-danger'> *</span></Form.Label>
                    <textarea
                      className='form-control'
                      name='comment'
                      cols="5"
                      rows="8"
                      value={feedback}
                      onChange={handleFeedbackChange}
                    ></textarea>
                  </Form.Group>
                </Col>
                {isLoading ? (
                  <Loader/>
                ) : (
                  <>
                  <Col md="12">
                    <div className='form-submit mt-4'>
                      <div className="iq-button">
                        <Button name="submit" type="submit" id="submit" className="btn text-uppercase position-relative">
                          <span className="button-text">Submit</span>
                          <i className="fa-solid fa-play"></i>
                        </Button>
                      </div>
                    </div>
                  </Col>
                  </>
                )}
                
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default ReviewComponent;
