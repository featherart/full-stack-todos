import React from 'react';
import { Plus } from 'react-feather';
import './add-item-form.css';

export const AddItemForm = ({
  setPriority,
  priorities,
  setDescription,
  description,
  handleSubmit
}) => {
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input
        autoFocus
        name="description"
        placeholder="description"
        onChange={e => setDescription(e.target.value)}
        type="text"
        value={description}
      />
      <select
        name="priority"
        data-testid="priority"
        onChange={e => setPriority(e.target.value)}
      >
        <option value="" hidden>
          priority
        </option>
        {priorities.map((priority, j) => {
          return (
            <option key={j} value={priority.value}>
              {priority.label}
            </option>
          );
        })}
      </select>
      <button
        className="submit-button"
        type="submit"
        data-testid="submit-button"
      >
        <Plus className="plus-icon" />
      </button>
    </form>
  );
};
