import React from 'react';
import { Circle, CheckCircle, Trash } from 'react-feather';
import './item.css';

export const Item = ({ item, priority, complete }) => {
  return (
    <div className={`item-row ${priority}`}>
      {complete ? <CheckCircle className="action-icon" /> : <Circle className="action-icon" />}
      <span className={`item-container ${priority}`}>{item}</span>
      <Trash className="action-icon" />
    </div>
  );
};
