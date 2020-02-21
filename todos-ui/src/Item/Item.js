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
        <CheckCircle className="action-icon" onClick={() => toggleComplete(id, complete)} />
      ) : (
        <Circle className="action-icon" onClick={() => toggleComplete(id, complete)} />
      )}
      <span className={`item-container ${priority}`}>
        {description}
      </span>
      <Trash
        className="action-icon"
        onClick={() => handleDelete(id)}
      />
    </div>
  );
};
