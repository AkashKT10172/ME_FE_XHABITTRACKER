import { useEffect, useState } from 'react';
import './editHabitForm.css';

export default function EditHabitForm({ habitList, setHabitList, editId, setIsOpen }) {
  const [selectedOptions, setSelectedOptions] = useState({
    reading: false,
    exercise: false,
    meditation: false,
  });
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // Load habit data for editing if editId is provided
  useEffect(() => {
    if (editId) {
      const habitToEdit = habitList.find((habit) => habit.id === editId);
      if (habitToEdit) {
        setSelectedOptions(habitToEdit.selectedOptions);
        setDescription(habitToEdit.description);
        setDate(habitToEdit.date);  // Keep the original date when editing
      }
    }
  }, [editId, habitList]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedHabit = {
      id: editId, // We use the existing ID for the edit
      selectedOptions: { ...selectedOptions },
      description,
      date,  // Use the original date
      timestamp: Date.now(), // Updating the timestamp for edit
    };

    // Update the existing habit
    setHabitList((prev) =>
      prev.map((habit) => (habit.id === editId ? updatedHabit : habit))
    );

    console.log('Habit updated:', updatedHabit);

    // Close the modal after editing
    setIsOpen(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form-title">Edit Habit</h3>

      <div className="form-group">
        <p className="form-date">Date: {date}</p> {/* Retaining the original date */}
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

      <button className="form-button" type="submit">Update</button>
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
