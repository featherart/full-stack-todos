import React from 'react';
import { Circle, CheckCircle, Trash } from 'react-feather';
import './item.css';

export const Item = ({
  complete,
  description,
  id,
  handleDelete,
  priority,
  toggleComplete
}) => {
  return (
    <div className={`item-row ${priority}`}>
      {complete ? (
        <CheckCircle className="action-icon" onClick={() => toggleComplete(id, complete)} data-testid='checked-icon' />
      ) : (
        <Circle className="action-icon" onClick={() => toggleComplete(id, complete)} data-testid='circle-icon' />
      )}
      <span className={`item-container ${priority}`}>
        {description}
      </span>
      <Trash
        className="action-icon"
        onClick={() => handleDelete(id)}
        data-testid='trash-icon'
      />
    </div>
  );
};
