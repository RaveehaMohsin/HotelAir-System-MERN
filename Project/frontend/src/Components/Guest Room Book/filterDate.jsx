import React, { useState } from 'react';
import { DatabaseIcon } from '@heroicons/react/solid';
import "../Room/All Rooms/modal.css";

export default function FilterDate({ isOpen, onCancel, isSidebarOpen }) {
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [error, setError] = useState('');

    const handleArrivalDateChange = (e) => {
        const newArrivalDate = e.target.value;
        setArrivalDate(newArrivalDate);
        validateDates(newArrivalDate, departureDate);
    };

    const handleDepartureDateChange = (e) => {
        const newDepartureDate = e.target.value;
        setDepartureDate(newDepartureDate);
        validateDates(arrivalDate, newDepartureDate);
    };

    const validateDates = (arrival, departure) => {
        if (arrival && departure && new Date(arrival) > new Date(departure)) {
            setError('Departure date must be later than arrival date.');
        } else {
            setError('');
        }
    };


    if (!isOpen) return null;

    return (
        <div>
            <div className="backdrop" onClick={onCancel}></div>
            
            <dialog open className={`room-dialog ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <h2>
                    Your Stay <DatabaseIcon className="icon" />
                </h2>
                <form >
                    <p>
                        <label htmlFor="arrivaldate">Arrival Date</label>
                        <input
                            id="arrivaldate"
                            name="arrivaldate"
                            type="date"
                            value={arrivalDate}
                            required
                            onChange={handleArrivalDateChange}
                        />
                    </p>

                    <p>
                        <label htmlFor="departuredate">Departure Date</label>
                        <input
                            id="departuredate"
                            name="departuredate"
                            type="date"
                            value={departureDate}
                            required
                            onChange={handleDepartureDateChange}
                        />
                    </p>

                    {error && <p style={{color:"white"}}>{error}</p>}

                    <p className="actions">
                        <button type="button" onClick={onCancel}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!!error}
                        >
                            Add Filter
                        </button>
                    </p>
                </form>
            </dialog>
        </div>
    );
}
