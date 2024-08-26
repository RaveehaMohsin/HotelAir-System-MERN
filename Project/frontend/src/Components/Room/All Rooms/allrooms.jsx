import React, { useState , useEffect } from 'react';
import './allrooms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import RoomTable from './allroomstable';
import AddRoomDialog from './addroommodal';
import { useLocation , useHistory  } from 'react-router-dom';

const AllRooms = ({ isSidebarOpen }) => {
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const location = useLocation();
  const history = useHistory ();

  useEffect(() => {   
    if (location.pathname.includes('/update') || location.pathname.includes('/id')) {
      setIsAddingRoom(true);
    }
  }, [location.pathname]);

  const handleAddRoomClick = () => {
    setIsAddingRoom(true);
  };

  const handleCloseDialog = () => {
    setIsAddingRoom(false);
    history.replace('/rooms/all');
  };

  return (
    <div>
      <div>
        <h5><span className="home-text">Home</span> / All Rooms</h5>
      </div>
      <div className='header'>
        <h3>Room List</h3>
        <button onClick={handleAddRoomClick}>
          <FontAwesomeIcon icon={faAdd} /> Add Room
        </button>
      </div>
      <RoomTable />
      {isAddingRoom && (
        <AddRoomDialog
          isOpen={isAddingRoom}
          onCancel={handleCloseDialog}
          isSidebarOpen={isSidebarOpen} 
        />
      )}
    </div>
  );
};

export default AllRooms;
