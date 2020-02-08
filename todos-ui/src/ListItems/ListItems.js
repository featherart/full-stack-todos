import React from 'react';
import { Item } from '../Item';
import { Plus } from 'react-feather';
import './list-items.css';

const priorities = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];
export const ListItems = () => {
  return (
    <div className="list-items-container">
      <div className="title">Todos</div>
      <div className="form">
        <form>
          <input type="text" placeholder="description" />
          <select name="priority">
            {priorities.map(priority => {
              return <option value={priority.value}>{priority.label}</option>;
            })}
          </select>
          <button className='submit-button' type='submit'><Plus className='plus-icon' /></button>
        </form>
      </div>
      <Item item={'yo milk'} priority={'high'} complete={true} />
      <Item item={'yo milk'} priority={'medium'} />
      <Item item={'yo milk'} priority={'low'} />
    </div>
  );
};
