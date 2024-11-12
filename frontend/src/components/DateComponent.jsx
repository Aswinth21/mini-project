import React, { useState, useEffect } from 'react';

const DateComponent = ({ onDateChange }) => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);
    const yyyyMax = maxDate.getFullYear();
    const mmMax = String(maxDate.getMonth() + 1).padStart(2, '0');
    const ddMax = String(maxDate.getDate()).padStart(2, '0');
    setMaxDate(`${yyyyMax}-${mmMax}-${ddMax}`);
  }, []);
  
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    onDateChange(selectedDate);
  };

  return (
    <div>
      <label>Select a date:</label>
      <input 
        type="date" 
        min={minDate} 
        max={maxDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateComponent;
