import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './modal.css';
import { HomeIcon } from '@heroicons/react/solid';

const AddRoomDialog = ({ isOpen ,  onCancel, isSidebarOpen }) => {
  const { id } = useParams(); // Get the id from the URL if it exists
  const location = useLocation(); // Get the current location object
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [enteredRoomType, setenteredRoomType] = useState('Single');
  const [enteredRoompriceperday, setenteredRoompriceperday] = useState('');
  const [enteredDescription, setenteredDescription] = useState('');
  const [enteredroomImage, setenteredroomImage] = useState('');
  const [enteredservantName, setenteredservantName] = useState('');
  const [enteredservantContact, setenteredservantContact] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);


  useEffect(() => {
    if (location.pathname.includes('/update/') && id) {
      setIsUpdateMode(true);
      // Fetch room details and set the form fields for update
      fetchRoomDetails(id);
    } else {
      setIsUpdateMode(false);

    }
  }, [location, id]);

  const fetchRoomDetails = async (roomId) => {
    try {
      const response = await fetch(`https://lavender-iron-azimuth.glitch.me/room/${roomId}`);      
      const roomData = await response.json();
      setenteredRoomType(roomData.roomType);
      setenteredRoompriceperday(roomData.roomPricePerDay.$numberDecimal);
      setenteredDescription(roomData.roomDescription);
      setenteredroomImage(roomData.roomImage);
      setenteredservantName(roomData.roomServantName);
      setenteredservantContact(roomData.servantContact);
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      roomtype: enteredRoomType,
      roompriceperday: enteredRoompriceperday,
      roomdescription: enteredDescription,
      roomimage: enteredroomImage,
      servantname: enteredservantName,
      servantcontact: enteredservantContact,
    };

    const url = isUpdateMode
      ? `https://lavender-iron-azimuth.glitch.me/room/update/${id}`
      : 'https://lavender-iron-azimuth.glitch.me/roomadd';
    const method = isUpdateMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (response.status === 201 || response.status === 200) {
        setAlertMessage(`Room ${isUpdateMode ? 'Updated' : 'Added'} Successfully!`);
        setIsSuccess(true);
      } else {
        setAlertMessage(`Failed to ${isUpdateMode ? 'update' : 'add'} room. Please try again.`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred while saving the room.');
      setIsSuccess(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>
      
      <dialog open className={`room-dialog ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <h2>
          {isUpdateMode ? 'Update Room' : 'Add Room'} <HomeIcon className="icon" />
        </h2>
        {alertMessage && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="roomtype">Room Type</label>
            <select
              id="roomtype"
              name="roomtype"
              value={enteredRoomType}
              required
              onChange={(e) => setenteredRoomType(e.target.value)}
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
            </select>
          </p>

          <p>
            <label htmlFor="roompriceperday">Room Price/Day</label>
            <input
              id="roompriceperday"
              name="roompriceperday"
              type="number"
              value={enteredRoompriceperday}
              required
              onChange={(e) => setenteredRoompriceperday(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="roomdescription">Room Description</label>
            <textarea
              id="roomdescription"
              name="roomdescription"
              required
              rows="4"
              value={enteredDescription}
              onChange={(e) => setenteredDescription(e.target.value)}
            ></textarea>
          </p>

          <p>
            <label htmlFor="roomimage">Room Image</label>
            <input
              type="text"
              id="roomimage"
              name="roomimage"
              required
              value={enteredroomImage}
              onChange={(e) => setenteredroomImage(e.target.value)}
            />
          </p>
          <img src={enteredroomImage} alt="RoomPic" width="100%" height="160px" />
          <p>
            <label htmlFor="servantname">Servant Name</label>
            <input
              type="text"
              id="servantname"
              name="servantname"
              required
              value={enteredservantName}
              onChange={(e) => setenteredservantName(e.target.value)}
            />
          </p>

          <p>
            <label htmlFor="servantcontact">Servant Contact</label>
            <input
              id="servantcontact"
              name="servantcontact"
              type="number"
              required
              value={enteredservantContact}
              onChange={(e) => setenteredservantContact(e.target.value)}
            />
          </p>

          <p className="actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">{isUpdateMode ? 'Update Room' : 'Add Room'}</button>
          </p>
        </form>
      </dialog>
    </>
  );
};

export default AddRoomDialog;
