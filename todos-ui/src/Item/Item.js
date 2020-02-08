import React from 'react';
import { Circle, Trash } from 'react-feather';
import './item.css';

export const Item = ({ item, priority }) => {
  return (
    <div className={`item-row ${priority}`}>
      <Circle />
      <span className={`item-container ${priority}`}>{item}</span>
      <Trash />
    </div>
  );
};
