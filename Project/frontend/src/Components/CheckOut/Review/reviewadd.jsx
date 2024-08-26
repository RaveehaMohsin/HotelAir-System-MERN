import React, { useState } from 'react';
import { FaStar} from 'react-icons/fa';
import '../../Room/All Rooms/modal.css';

const AddReviewDialog = ({ isOpen, onCancel, isSidebarOpen }) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredExperience, setEnteredExperience] = useState('None');
  const [enteredRating, setEnteredRating] = useState(5);
  const [enteredFeedback, setEnteredFeedback] = useState('None');
  const [enteredRecommendation, setEnteredRecommendation] = useState('Yes');
  const [enteredFutureIntent, setEnteredFutureIntent] = useState('Yes');
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      name: enteredName,
      experience: enteredExperience,
      rating: enteredRating,
      feedback: enteredFeedback,
      recommendation: enteredRecommendation,
      futureIntent: enteredFutureIntent,
    };

    try {
      const response = await fetch('https://lavender-iron-azimuth.glitch.me/reviewadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.status === 201 || response.status === 200) {
        setAlertMessage('Review Added Successfully!');
        setIsSuccess(true);
      } else {
        setAlertMessage('Failed to add review. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred while saving the review.');
      setIsSuccess(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>
      
      <dialog open className={`review-dialog ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} >
        <h2>
          Add Review <FaStar className="icon" />
        </h2>
        {alertMessage && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={enteredName}
              required
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </p>

          <p>
            <label htmlFor="experience">Your Experience</label>
            <textarea
              id="experience"
              name="experience"
              rows="3"
              onChange={(e) => setEnteredExperience(e.target.value)}
            ></textarea>
          </p>

          <p>
            <label htmlFor="rating">Rating (out of 5)</label>
            <input
              id="rating"
              name="rating"
              type="number"
              min="1"
              max="5"
              value={enteredRating}
              required
              onChange={(e) => setEnteredRating(e.target.value)}
            />
          </p>

          <p>
            <label htmlFor="feedback">Specific Feedback</label>
            <textarea
              id="feedback"
              name="feedback"            
              rows="3"
              onChange={(e) => setEnteredFeedback(e.target.value)}
            ></textarea>
          </p>

          <p>
            <label htmlFor="recommendation">Would You Recommend?</label>
            <select
              id="recommendation"
              name="recommendation"
              value={enteredRecommendation}
              required
              onChange={(e) => setEnteredRecommendation(e.target.value)}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </p>

          <p>
            <label htmlFor="futureIntent">Would You Return?</label>
            <select
              id="futureIntent"
              name="futureIntent"
              value={enteredFutureIntent}
              required
              onChange={(e) => setEnteredFutureIntent(e.target.value)}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </p>

          <p className="actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">Add Review</button>
          </p>
        </form>
      </dialog>
    </>
  );
};

export default AddReviewDialog;
