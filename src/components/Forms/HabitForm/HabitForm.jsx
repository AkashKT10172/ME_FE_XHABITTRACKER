import { useEffect, useState } from 'react';
import './habitForm.css';

export default function habitForm({ setIsOpen, habitList, setHabitList }) {
  const [selectedOptions, setSelectedOptions] = useState({
    reading: false,
    exercise: false,
    meditation: false,
  });
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const generateUniqueId = () => {
    // Combine timestamp with a random number for extra uniqueness
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value); // Update the date when selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newHabit = {
      id: generateUniqueId(), // Add unique ID here
      selectedOptions: { ...selectedOptions },
      description,
      date, // Use the user-selected date
      timestamp: Date.now(), // Adding timestamp for sorting/filtering
    };

    setHabitList((prev) => [...prev, newHabit]);
    console.log('Habit added:', newHabit);

    // Reset the form
    setSelectedOptions({
      reading: false,
      exercise: false,
      meditation: false,
    });
    setDescription('');
    setDate('');
    setIsOpen(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form-title">What Did You Do Today?</h3>

      <div className="form-group">
        <label className="form-label">
          Date:
          <input
            type="date"
            className="form-input"
            required
            value={date}
            onChange={handleDateChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          <input
            type="checkbox"
            name="reading"
            checked={selectedOptions.reading}
            onChange={handleCheckboxChange}
          />
          Reading
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          <input
            type="checkbox"
            name="exercise"
            checked={selectedOptions.exercise}
            onChange={handleCheckboxChange}
          />
          Exercise
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          <input
            type="checkbox"
            name="meditation"
            checked={selectedOptions.meditation}
            onChange={handleCheckboxChange}
          />
          Meditation
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Short Description:
          <input
            type="text"
            className="form-input"
            required
            placeholder="Enter a short description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
      </div>

      <button className="form-button" type="submit">Submit</button>
      <button
        type="button"
        className="cancel-button"
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </button>
    </form>
  );
}
