import React from 'react';
import { Plus } from 'react-feather';
import './add-item-form.css';

export const AddItemForm = ({ setPriority, priorities, setDescription, description, handleSubmit }) => {
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input
        autoFocus
        type="text"
        placeholder="description"
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <select
        name="priority"
        onChange={e => setPriority(e.target.value)}
      >
        {priorities.map((priority, j) => {
          return (
            <option key={j} value={priority.value}>
              {priority.label}
            </option>
          );
        })}
      </select>
      <button className="submit-button" type="submit">
        <Plus className="plus-icon" />
      </button>
    </form>
  );
};
